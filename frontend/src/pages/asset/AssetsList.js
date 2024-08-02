import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  IconButton 
  , Dialog, DialogActions, DialogContent, DialogTitle,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";

import { getAssets } from "../../api/assetApi";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [scoped, setScoped] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedScoped, setSelectedScoped] = useState('');
  const [coverageCount, setCoverageCount] = useState('');
  const [coverages, setCoverages] = useState([]);
  const [editCoverageId, setEditCoverageId] = useState(null);
  const [newAssetDialogOpen, setNewAssetDialogOpen] = useState(false);
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetType, setNewAssetType] = useState('');
  const [newAssetDesc, setNewAssetDesc] = useState('');
  const [newAssetIsScoped, setNewAssetIsScoped] = useState(false);
  const [isScopedAsset, setIsScopedAsset] = useState(false);
  const [criticality, setCriticality] = useState(false);
  const [businessOwnerName, setBusinessOwnerName] = useState('');
  const [businessOwnerEmail, setBusinessOwnerEmail] = useState('');
  const [itOwnerName, setItOwnerName] = useState('');
  const [itOwnerEmail, setItOwnerEmail] = useState('');
  
  useEffect(() => {
    const fetchAssets = async () => {
      const data = await getAssets();
      setAssets(data);
    };
    fetchAssets();
  }, []);

  useEffect(() => {
    const fetchCoverages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8021/api/v1/coverage/"
        );
        setCoverages(data);
      } catch (error) {
        console.error("Error fetching coverages:", error);
      }
    };

    fetchCoverages(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchCoverages(); // Fetch data every 30 seconds
    }, 30000); // 30000 milliseconds = 30 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const handleAssetChange = async (event) => {
    const assetId = event.target.value;
    setSelectedAsset(assetId);
    setSelectedScoped("");
    setCoverageCount("");

    try {
      const assetobj = assets.find((a) => a._id === assetId);
      if (assetobj) {
        setIsScopedAsset(assetobj.isScoped)
        setCriticality(assetobj.criticality);
        setBusinessOwnerName(assetobj.businessOwnerName || '');
        setBusinessOwnerEmail(assetobj.businessOwnerEmail || '');
        setItOwnerName(assetobj.itOwnerName || '');
        setItOwnerEmail(assetobj.itOwnerEmail || '');

      const { data } = await axios.get(
        `http://localhost:8021/api/v1/assets/${assetId}/scoped`
      );
      if (Array.isArray(data) && data.length > 0) {
        setScoped(data);
      } 
    }else {
        setScoped([]); // Set to empty array if no data is returned
      }
    } catch (error) {
      console.error("Error fetching scoped data:", error);
      setScoped([]);
    }
  
  };

  const handleScopedChange = (event) => {
    setSelectedScoped(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const newCoverage = {
      criticality,
      businessOwnerName,
      businessOwnerEmail,
      itOwnerName,
      itOwnerEmail,
      assetId: selectedAsset,
      scoped: selectedScoped || 'non-scoped',
      coverageCount: Number(coverageCount) || 0
    };
  
  
    try {
      if (editCoverageId) {
        await axios.put(`http://localhost:8021/api/v1/coverage/${editCoverageId}`, newCoverage);
      } else {
        await axios.post('http://localhost:8021/api/v1/coverage/add-coverage', newCoverage);
      }
      
      setSelectedScoped('');
      setCoverageCount('');
      setEditCoverageId(null);
      setSelectedAsset('');
      setCriticality(false);
      setBusinessOwnerName('');
      setBusinessOwnerEmail('');
      setItOwnerName('');
      setItOwnerEmail('');
      
      // Refresh coverage data after submission
      const { data } = await axios.get('http://localhost:8021/api/v1/coverage/');
      setCoverages(data);
    } catch (error) {
      console.error('Error submitting coverage data:', error);
    }
  };

  const handleEdit = (coverage) => {
    setEditCoverageId(coverage.id);
    setSelectedAsset(coverage.scoped.asset?._id || '');
    setSelectedScoped(coverage.scoped?._id || '');
    setCoverageCount(coverage.coverageCount);
    setCriticality(coverage.criticality);
    setBusinessOwnerName(coverage.businessOwnerName);
    setBusinessOwnerEmail(coverage.businessOwnerEmail);
    setItOwnerName(coverage.itOwnerName);
    setItOwnerEmail(coverage.itOwnerEmail);
  };

  const handleDelete = async (coverageId) => {
    try {
      await axios.delete(`http://localhost:8021/api/v1/coverage/${coverageId}`);
      setCoverages(coverages.filter((coverage) => coverage._id !== coverageId));
    } catch (error) {
      console.error('Error deleting coverage:', error);
    }
  };
  
  const handleOpenNewAssetDialog = () => {
    setNewAssetDialogOpen(true);
  };

  const handleCloseNewAssetDialog = () => {
    setNewAssetDialogOpen(false);
    setNewAssetName('');
    setNewAssetType('');
    setNewAssetDesc('');
    setNewAssetIsScoped(false); // Reset new asset isScoped
  };

  const handleAddAsset = async () => {
    try {
      await axios.post('http://localhost:8021/api/v1/assets/add-asset', {
        name: newAssetName,
        type: newAssetType,
        desc: newAssetDesc,
        isScoped: newAssetIsScoped, // Pass isScoped
      });

      // Refresh assets after adding a new one
      const { data } = await axios.get('http://localhost:8021/api/v1/assets/');
      setAssets(data);

      handleCloseNewAssetDialog();
    } catch (error) {
      console.error('Error adding new asset:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 230 },
    { field: 'assetName', headerName: 'Asset Name', width: 200 },
    { field: 'scopedName', headerName: 'Scoped Name', width: 280 },
    { field: 'coverageCount', headerName: 'Coverages', type: 'number', width: 120 },
    { field: 'criticality', headerName: 'Criticality', width: 150, renderCell: (params) => params.row.criticality ? 'Yes' : 'No' },
    { field: 'businessOwnerName', headerName: 'Business Owner Name', width: 200 },
    { field: 'businessOwnerEmail', headerName: 'Business Owner Email', width: 200 },
    { field: 'itOwnerName', headerName: 'IT Owner Name', width: 200 },
    { field: 'itOwnerEmail', headerName: 'IT Owner Email', width: 200 },
    { field: 'createdAt', headerName: 'Created Date', width: 170 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <div>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows = coverages.map((coverage) => ({
    id: coverage._id,
    assetName: coverage.scoped?.asset ? coverage.scoped.asset.name : 'non-scoped',
    scopedName: coverage.scoped ? coverage.scoped.name : 'N/A',
    coverageCount: coverage.coverageCount,
    businessOwnerName: coverage.businessOwnerName || 'N/A',
    businessOwnerEmail: coverage.businessOwnerEmail || 'N/A',
    itOwnerName: coverage.itOwnerName || 'N/A',
    itOwnerEmail: coverage.itOwnerEmail || 'N/A',
    createdAt: moment(coverage.createdAt).format('YYYY-MM-DD HH:mm'),
  }));

   // Define the initial sort model
   const sortModel = [
    {
      field: 'createdAt',
      sort: 'desc',
    },
  ];

  // useEffect(() => {
  //   const fetchScoped = async () => {
  //     if (selectedAssets) {
  //       setScopedLoading(true);
  //       const scope = await getScopedInAsset(selectedAssets);
  //       setScopeds(scope);
  //       setSelectedScoped([]); // Reset selected states when country changes
  //       setCoverages(0);
  //       setScopedLoading(false);
  //     }
  //   };
  //   fetchScoped();
  // }, [selectedAssets]);

  // const handleScopedChange = (event) => {
  //   const selected = event.target.value;
  //   setSelectedScoped(selected);
  //   // Initialize stateCities for newly selected states
  //   const updatedScopedCoverages = { ...scopedCoverages };
  //   selected.forEach((scopedId) => {
  //     if (!updatedScopedCoverages[scopedId]) {
  //       updatedScopedCoverages[scopedId] = "";
  //     }
  //   });
  //   setscopedCoverages(updatedScopedCoverages);
  // };

  // const handleCoveragesCountChange = (scopedId, value) => {
  //   setscopedCoverages({ ...scopedCoverages, [scopedId]: parseInt(value, 10) || 0 });
  // };

  // const handleSubmit = async () => {
  //  updateCoverageCount();

  //  const asset = assets.find((c) => c._id === selectedAssets);
  //  const assetdata = selectedScoped.map((scopedId) => {
  //    const scope = scopeds.find((s) => s._id === scopedId);
  //    return {
  //      assetName: asset.name,
  //      assetType: asset.type,
  //      scopedName: scope.name,
  //      coverageCount: scopedCoverages[scopedId] || 0,
  //    };
  //  });
  //  console.log(assetdata);
  //  try {
  //    const newAssets = await addAssetList(assetdata);
  //    setAssetList((prevReports) => [...prevReports, ...newAssets]);
  //    alert('Data added successfully!');
  //  } catch (error) {
  //    console.error('Error adding data:', error);
  //    alert('Failed to add data.');
  //  }
  // };

  // const updateCoverageCount = async () => {
  //   const scopedCoverageCount = selectedScoped.reduce((acc, scopedId) => {
  //     acc[scopedId] = scopedCoverages[scopedId] || 0;
  //     return acc;
  //   }, {});

  //   console.log(scopedCoverageCount);
  //   try {
  //     await addCoverageCount(scopedCoverageCount);
  //     alert('Total number Coverages added successfully!');
  //   } catch (error) {
  //     console.error('Error adding coverages:', error);
  //     alert('Failed to add coverages.');
  //   }
  // }
  // useEffect(() => {
  //   const fetchCoverage = async () => {
  //     if (selectedScoped.length > 0) {
  //       setCoverageLoading(true);
  //       const { coverageCount } = await getCoverageCount(selectedScoped)
  //       // const fetchCoverage = {};
  //       // await Promise.all(
  //       //   selectedScoped.map(async (scopedId) => {
  //       //     const data = await getCoverageInScoped(scopedId);
  //       //     fetchCoverage[scopedId] = data;
  //       //   })
  //       // );
  //       setCoverages(coverageCount);
  //       setCoverageLoading(false);
  //     } else {
  //       setCoverages(0);
  //     }
  //   };
  //   fetchCoverage();
  // }, [selectedScoped]);

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={3}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="asset-label">Asset</InputLabel>
              <Select
                labelId="asset-label"
                value={selectedAsset}
                onChange={handleAssetChange}
                label="Asset"
              >
                <MenuItem key="add-new-asset" value="">
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenNewAssetDialog}
                  >
                    Add New Asset
                  </Button>
                </MenuItem>
                {assets.map((asset) => (
                  <MenuItem key={asset._id} value={asset._id}>
                    {asset.name} - {asset.type} ({asset.isScoped ? 'Scoped' : 'Non-Scoped'})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </Grid>
            {selectedAsset && assets.find((a) => a._id === selectedAsset)?.isScoped && (
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Scoped</InputLabel>
                  <Select value={selectedScoped} onChange={handleScopedChange} label="Scoped">
                    {scoped.map((scope) => (
                      <MenuItem key={scope._id} value={scope._id}>
                        {scope.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {selectedScoped && (
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Coverage Count"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={coverageCount}
                  onChange={(e) => setCoverageCount(e.target.value)}
                />
              </Grid>
            )}
            {selectedAsset && (
               <>
               <Grid item xs={12} sm={3}>
                 <TextField
                   label="Business Owner Name"
                   fullWidth
                   margin="normal"
                   value={businessOwnerName}
                   onChange={(e) => setBusinessOwnerName(e.target.value)}
                 />
               </Grid>
               <Grid item xs={12} sm={3}>
                 <TextField
                   label="Business Owner Email"
                   fullWidth
                   margin="normal"
                   value={businessOwnerEmail}
                   onChange={(e) => setBusinessOwnerEmail(e.target.value)}
                 />
               </Grid>
               <Grid item xs={12} sm={3}>
                 <TextField
                   label="IT Owner Name"
                   fullWidth
                   margin="normal"
                   value={itOwnerName}
                   onChange={(e) => setItOwnerName(e.target.value)}
                 />
               </Grid>
               <Grid item xs={12} sm={3}>
                 <TextField
                   label="IT Owner Email"
                   fullWidth
                   margin="normal"
                   value={itOwnerEmail}
                   onChange={(e) => setItOwnerEmail(e.target.value)}
                 />
               </Grid>
               <Grid item xs={12} sm={3}>
                 <FormControlLabel
                   control={
                     <Checkbox
                       checked={criticality}
                       onChange={(e) => setCriticality(e.target.checked)}
                     />
                   }
                   label="Criticality"
                 />
               </Grid>
             </>
            )}
            <Grid item xs={12} sm={3}>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
          {editCoverageId ? 'Update' : 'Submit'}
        </Button>
            </Grid>
          </Grid>
        </form>

        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          style={{ marginTop: "1rem" }}
        >
          Asset Data
        </Typography>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} sortModel={sortModel} />
        </div>
        <Dialog open={newAssetDialogOpen} onClose={handleCloseNewAssetDialog}>
        <DialogTitle>Add New Asset</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newAssetName}
            onChange={(e) => setNewAssetName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Type"
            type="text"
            fullWidth
            value={newAssetType}
            onChange={(e) => setNewAssetType(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={newAssetDesc}
            onChange={(e) => setNewAssetDesc(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="is-scoped-label">Is Scoped</InputLabel>
            <Select
              labelId="is-scoped-label"
              value={newAssetIsScoped}
              onChange={(e) => setNewAssetIsScoped(e.target.value)}
              label="Is Scoped"
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewAssetDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddAsset} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
    </>
  );
};
export default AssetList;
