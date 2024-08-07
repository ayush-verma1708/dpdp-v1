import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Container,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import { getAssets } from "../../api/assetApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [scoped, setScoped] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [selectedScoped, setSelectedScoped] = useState("");
  const [coverageCount, setCoverageCount] = useState("");
  const [assetDetails, setAssetDetails] = useState([]);
  const [editCoverageId, setEditCoverageId] = useState(null);
  const [newAssetDialogOpen, setNewAssetDialogOpen] = useState(false);
  const [newScopedDialogOpen, setNewScopedDialogOpen] = useState(false);
  const [newAssetName, setNewAssetName] = useState("");
  const [newAssetType, setNewAssetType] = useState("");
  const [newAssetDesc, setNewAssetDesc] = useState("");
  const [newAssetIsScoped, setNewAssetIsScoped] = useState(false);
  const [newScopedName, setNewScopedName] = useState("");
  const [newScopedDesc, setNewScopedDesc] = useState("");
  const [criticality, setCriticality] = useState(false);
  const [businessOwnerName, setBusinessOwnerName] = useState("");
  const [businessOwnerEmail, setBusinessOwnerEmail] = useState("");
  const [itOwnerName, setItOwnerName] = useState("");
  const [itOwnerEmail, setItOwnerEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      const data = await getAssets();
      setAssets(data);
    };
    fetchAssets();
  }, []);

  const fetchAssetDetailData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8021/api/v1/assetDetails/"
      );

      if (Array.isArray(response.data)) {
        setAssetDetails(response.data);
      } else {
        setAssetDetails([]); // Handle cases where the data isn't an array
      }
    } catch (error) {
      console.error("Error fetching asset details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchAssetDetailData();
  }, []);

  const handleAssetChange = async (event) => {
    const assetId = event.target.value;
    setSelectedAsset(assetId);
    setSelectedScoped("");
    setCoverageCount("");

    try {
      const assetobj = assets.find((a) => a._id === assetId);
      console.log(assetobj);
      
      if (assetobj) {
        const { data } = await axios.get(
          `http://localhost:8021/api/v1/assets/${assetId}/scoped`
        );
        if (Array.isArray(data) && data.length > 0) {
          setScoped(data);
        }
      } else {
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

    const newAssetDetails = {
      criticality,
      businessOwnerName,
      businessOwnerEmail,
      itOwnerName,
      itOwnerEmail,
      asset: selectedAsset,
      scoped: selectedScoped || "non-scoped",
      coverages: coverageCount,
    };

    try {
      if (editCoverageId) {
        await axios.put(
          `http://localhost:8021/api/v1/assetDetailss/${editCoverageId}`,
          newAssetDetails
        );
      } else {
        await axios.post(
          "http://localhost:8021/api/v1/assetDetails/add",
          newAssetDetails
        );
      }

      setSelectedScoped("");
      setCoverageCount("");
      setEditCoverageId(null);
      setSelectedAsset("");
      setCriticality("");
      setBusinessOwnerName("");
      setBusinessOwnerEmail("");
      setItOwnerName("");
      setItOwnerEmail("");

      // Refresh coverage data after submission
      const data = await axios.get(
        "http://localhost:8021/api/v1/assetDetails/"
      );
      fetchAssetDetailData();
      setAssetDetails(data);
    } catch (error) {
      console.error("Error submitting coverage data:", error);
    }
  };

  const handleEdit = (assetDet) => {
    setEditCoverageId(assetDet.id);
    setSelectedAsset(assetDet.scoped.asset?._id || "");
    setSelectedScoped(assetDet.scoped?._id || "");
    setCoverageCount(assetDet.coverageCount);
    setCriticality(assetDet.criticality);
    setBusinessOwnerName(assetDet.businessOwnerName);
    setBusinessOwnerEmail(assetDet.businessOwnerEmail);
    setItOwnerName(assetDet.itOwnerName);
    setItOwnerEmail(assetDet.itOwnerEmail);
  };

  const handleDelete = async (assetDetId) => {
    try {
      await axios.delete(
        `http://localhost:8021/api/v1/assetDetails/${assetDetId}`
      );
      setAssetDetails(assetDetails.filter((ad) => ad._id !== assetDetId));
    } catch (error) {
      console.error("Error deleting coverage:", error);
    }
  };

  const handleOpenNewAssetDialog = () => {
    setNewAssetDialogOpen(true);
  };

  const handleOpenNewScopedDialog = () => {
    setNewScopedDialogOpen(true);
  };

  const handleCriticalityChange = (event) => {
    setCriticality(event.target.value);
  };

  const handleCloseNewAssetDialog = () => {
    setNewAssetDialogOpen(false);
    setNewAssetName("");
    setNewAssetType("");
    setNewAssetDesc("");
    setNewAssetIsScoped(false); // Reset new asset isScoped
  };

  const handleCloseNewScopedDialog = () => {
    setNewScopedDialogOpen(false);
    setNewScopedName("");
    setNewScopedDesc("");
  };

  const handleAddAsset = async () => {
    try {
      await axios.post("http://localhost:8021/api/v1/assets/add-asset", {
        name: newAssetName,
        type: newAssetType,
        desc: newAssetDesc,
        isScoped: newAssetIsScoped, // Pass isScoped
      });

      // Refresh assets after adding a new one
      const { data } = await axios.get("http://localhost:8021/api/v1/assets/");
      setAssets(data);

      handleCloseNewAssetDialog();
    } catch (error) {
      console.error("Error adding new asset:", error);
    }
  };

  const handleAddScoped = async () => {
    try {
      await axios.post("http://localhost:8021/api/v1/scoped/add", {
        name: newScopedName,
        desc: newScopedDesc,
        asset: selectedAsset, // Pass isScoped
      });

      // Refresh assets after adding a new one
      const { data } = await axios.get(
        `http://localhost:8021/api/v1/assets/${selectedAsset}/scoped`
      );
      console.log(data);

      setScoped(data);

      handleCloseNewScopedDialog();
    } catch (error) {
      console.error("Error adding new asset:", error);
    }
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 230 },
    { field: "asset", headerName: "Asset", width: 150 },
    { field: "scoped", headerName: "Scoped", width: 150 },
    { field: "criticality", headerName: "Criticality", width: 150 },
    {
      field: "businessOwnerName",
      headerName: "Business Owner Name",
      width: 200,
    },
    {
      field: "businessOwnerEmail",
      headerName: "Business Owner Email",
      width: 250,
    },
    { field: "itOwnerName", headerName: "IT Owner Name", width: 200 },
    { field: "itOwnerEmail", headerName: "IT Owner Email", width: 250 },
    { field: "coverages", headerName: "Coverages", width: 150 },
    { field: "createdAt", headerName: "Created Date", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
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

  const rows = Array.isArray(assetDetails)
    ? assetDetails.map((detail, index) => {
        try {
          return {
            id: detail._id || "", // Assign the MongoDB ObjectId as the unique id for DataGrid
            asset: detail.asset ? detail.asset.name : "Unknown Asset",
            scoped: detail.scoped ? detail.scoped.name : "non-scoped",
            criticality: detail.criticality || "N/A",
            businessOwnerName: detail.businessOwnerName || "N/A",
            businessOwnerEmail: detail.businessOwnerEmail || "N/A",
            itOwnerName: detail.itOwnerName || "N/A",
            itOwnerEmail: detail.itOwnerEmail || "N/A",
            coverages: detail.coverages || 0,
            createdAt: moment(detail.createdAt).format("YYYY-MM-DD HH:mm"),
          };
        } catch (error) {
          console.error("Error processing detail at index", index, ":", error);
          return {
            id: "",
            asset: "Error",
            scoped: "Error",
            criticality: "Error",
            coverages: 0,
          };
        }
      })
    : [];

  const sortModel = [
    {
      field: "createdAt",
      sort: "desc",
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",            
            gap: "15px",
          }}
        >
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
                  {asset.name} - {asset.type} (
                  {asset.isScoped ? "Scoped" : "Non-Scoped"})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedAsset &&
            assets.find((a) => a._id === selectedAsset)?.isScoped && (
              <FormControl fullWidth margin="normal">
                <InputLabel>Scoped</InputLabel>
                <Select
                  value={selectedScoped}
                  onChange={handleScopedChange}
                  label="Scoped"
                >
                  <MenuItem key="add-new-asset" value="">
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={handleOpenNewScopedDialog}
                    >
                      Add New Scoped
                    </Button>
                  </MenuItem>
                  {scoped.map((scope) => (
                    <MenuItem key={scope._id} value={scope._id}>
                      {scope.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          {selectedScoped && (
            <TextField
              label="Coverage Count"
              type="number"
              fullWidth
              margin="normal"
              value={coverageCount}
              onChange={(e) => setCoverageCount(e.target.value)}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {selectedAsset && (
            <>
              <TextField
                label="Business Owner Name"
                fullWidth
                margin="normal"
                value={businessOwnerName}
                onChange={(e) => setBusinessOwnerName(e.target.value)}
              />
              <TextField
                label="Business Owner Email"
                fullWidth
                margin="normal"
                value={businessOwnerEmail}
                onChange={(e) => setBusinessOwnerEmail(e.target.value)}
              />
              <TextField
                label="IT Owner Name"
                fullWidth
                margin="normal"
                value={itOwnerName}
                onChange={(e) => setItOwnerName(e.target.value)}
              />
              <TextField
                label="IT Owner Email"
                fullWidth
                margin="normal"
                value={itOwnerEmail}
                onChange={(e) => setItOwnerEmail(e.target.value)}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="criticality-label">Criticality</InputLabel>
                <Select
                  labelId="criticality-label"
                  id="criticality"
                  value={criticality}
                  onChange={handleCriticalityChange}
                  label="Criticality"
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  height: "50px",
                }}
                color="primary"
                style={{ marginTop: "5px" }}
              >
                {editCoverageId ? "Update" : "Submit"}
              </Button>
            </>
          )}
        </Box>
      </form>
      <Container>
        <div style={{ height: 400, width: "100%", marginTop: "10px" }}>
          {loading ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              sortModel={sortModel}
              rowsPerPageOptions={[10]}
            />
          )}
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
        <Dialog open={newScopedDialogOpen} onClose={handleCloseNewScopedDialog}>
          <DialogTitle>Add New Scoped</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              value={newScopedName}
              onChange={(e) => setNewScopedName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              value={newScopedDesc}
              onChange={(e) => setNewScopedDesc(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNewScopedDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddScoped} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};
export default AssetList;
