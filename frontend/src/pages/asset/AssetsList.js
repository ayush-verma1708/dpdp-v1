import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Paper, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody } from '@mui/material';
import Dropdown from '../../components/Dropdown';
import { getAssets } from '../../api/assetApi';
import { getScopedInAsset } from "../../api/scopedApi"
import { getCoverageInScoped } from '../../api/coverageApi';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [scoped, setScoped] = useState([]);
  const [coverages, setCoverages] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState('');
  const [selectedScoped, setSelectedScoped] = useState('');
  const [selectedCoverage, setSelectedCoverage] = useState('');
  const [assetLoading, setAssetLoading] = useState(false);
  const [scopedLoading, setScopedLoading] = useState(false);
  const [coverageLoading, setCoverageLoading] = useState(false);
  const [assetError, setAssetError] = useState('');
  const [scopedError, setScopedError] = useState('');
  const [coverageError, setCoverageError] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      setAssetLoading(true);
      try {
        const data = await getAssets();
        setAssets(data);
      } catch (error) {
        setAssetError('Error fetching countries');
      } finally {
        setAssetLoading(false);
      }
    };

    fetchAssets();
  }, []);

  const handleAssetChange = async (asset) => {
    setSelectedAssets(asset);
    setSelectedScoped('');
    setScopedLoading(true);
    setCoverageLoading(false);
    try {
      const data = await getScopedInAsset(asset);
   
      setScoped(data);

      setCoverages([]); // Clear cities when country changes
    } catch (error) {
      setScopedError('Error fetching states');
    } finally {
      setScopedLoading(false);
    }
  };

  const handleScopedChange = async (scope) => {
    setSelectedScoped(scope);
    setCoverageLoading(true);
    try {
      const data = await getCoverageInScoped(scope);
      setCoverages(data);
    } catch (error) {
      setCoverageError('Error fetching cities');
    } finally {
      setCoverageLoading(false);
    }
  };

  const handleCoverageChange = async (coverage) => {
    setSelectedCoverage(coverage);
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Asset Records
      </Typography>
      <Box my={2} >
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Dropdown
                label="Asset"
                options={assets}
                value={selectedAssets}
                onChange={handleAssetChange}
                loading={assetLoading}
                error={assetError}
                helperText={assetError}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Dropdown
                label="Scoped"
                options={scoped}
                value={selectedScoped}
                onChange={handleScopedChange}
                loading={scopedLoading}
                error={scopedError}
                helperText={scopedError}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Dropdown
                label="Coverages"
                options={coverages}
                value={selectedCoverage}
                onChange={handleCoverageChange}
                loading={coverageLoading}
                error={coverageError}
                helperText={coverageError}
              />
            </Grid>
            <Grid item xs={12} my={1}  sm={2}>
            <Button type="submit" variant="contained" color="primary">
          Add Record
        </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <box>
      <TableContainer component={Paper} style={{ maxHeight: '500px' }}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>
                <TableSortLabel
                >
                  Asset Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                >
                  Asset Type
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                >
                  IsScoped
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                >
                  Total Scopes
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                >
                  Total Coverages
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                >
                  Actions
                </TableSortLabel>
              </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                  <TableCell>AWS</TableCell>
                  <TableCell>Cloud</TableCell>
                  <TableCell>Scoped</TableCell>
                  <TableCell>17 &nbsp;
                    <RemoveRedEyeIcon />
                  </TableCell>
                  <TableCell>9
                  &nbsp;
                  <RemoveRedEyeIcon />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      View
                    </Button>
                    &nbsp;
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                    &nbsp;
                    <Button variant="contained" color="primary">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </box>
    </Container>
    
  );
};

export default AssetList;


// import React, { useState, useEffect } from 'react';
// import { getAssets } from '../../api/assetApi';
// import { getScopedInAsset } from "../../api/scopedApi";
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Box,
//   CircularProgress,
// } from '@mui/material';

// const AssetList = () => {
//     const [assets, setAssets] = useState([]);
//     const [scoped, setScoped] = useState([]);
//     // const [coverage, setCoverage] = useState([]);
//     const [selectedAsset, setSelectedAsset] = useState('');
//     const [selectedScoped, setSelectedScoped] = useState('');
//     // const [selectedCoverage, setSelectedCoverage] = useState('');
//     const [loadingAssets, setLoadingAssets] = useState(true);
//     const [loadingScoped, setLoadingScoped] = useState(false);


//     useEffect(() => {
//         const fetchAssets = async () => {
//           setLoadingAssets(true);
//           try {
//             const result = await getAssets();
//             setAssets(result.data);
//             setLoadingAssets(false);
//             console.log(selectedAsset);
//           } catch (error) {
//             console.error('Error fetching asset:', error);
//           }
           
//         };

//         fetchAssets();
//     }, []);

//     useEffect(() =>{
//       const fetchScoped = async () => {
//         if(selectedAsset){
//           setLoadingScoped(true);
//           try {
//             const res = await getScopedInAsset(selectedAsset);
//             setScoped(res)
//             setLoadingScoped(false);
//           } catch (error) {
//             console.error('Error fetching scoped:', error.message);
//             console.log((error.message));
//           }
//         }
//         else{
//           setScoped([])
//         }
//       }   
//       fetchScoped();
//     }, [selectedAsset]);

//     //       useEffect(() => {
//     //         if (selectedScoped) {
//     //           const fetchCoverages = async () => {
//     //             const response = await axios.get(`http://localhost:8021/api/v1/coverages/getCoverageInScoped/${selectedScoped}`);
//     //             setCoverage(response.data);
//     //             setSelectedCoverage('');
//     //           };
//     //           fetchCoverages();
//     //         }
//     //       }, [selectedScoped]);

//     //       const handleChangeAsset =(e) =>{
//     //         setSelectedAsset(e.target.value)
//     //       }
//     // const handleChange = (event) => {
//     //     setSelectedAsset(event.target.value);
//     // };

//     return (

//     //   <div className='p-4'>
//     //     <div style={{ display: 'flex', gap: '16px' }}>
//     //     <FormControl variant="outlined" className='w-60'>
//     //         <InputLabel id="assets-label">Assets</InputLabel>
//     //         <Select
//     //             labelId="assets-label"
//     //             value={selectedAsset}
//     //             onChange={handleChange}
//     //             label="Assets"
//     //         >
//     //             {assets.map(asset => (
//     //                 <MenuItem key={asset._id} value={asset.name}>
//     //                     {asset.name}
//     //                 </MenuItem>
//     //             ))}
//     //         </Select>
//     //     </FormControl>
//     //     <FormControl variant="outlined" className='w-60'>
//     //         <InputLabel id="assets-label">Assets</InputLabel>
//     //         <Select
//     //             labelId="assets-label"
//     //             value={selectedAsset}
//     //             onChange={handleChange}
//     //             label="Assets"
//     //         >
//     //             {assets.map(asset => (
//     //                 <MenuItem key={asset._id} value={asset.name}>
//     //                     {asset.name}
//     //                 </MenuItem>
//     //             ))}
//     //         </Select>
//     //     </FormControl> 
//     //     </div>
        
//     //     <Container>
//     //   <Typography variant="h4" gutterBottom>Select Asset</Typography>
//     //   <FormControl fullWidth margin="normal">
//     //     <InputLabel>Asset</InputLabel>
//     //     <Select
//     //       value={selectedAsset}
//     //       onChange={handleChangeAsset}
//     //     >
//     //       {assets.map((asset) => (
//     //         <MenuItem key={asset._id} value={asset._id}>
//     //           {asset.name}
//     //         </MenuItem>
//     //       ))}
//     //     </Select>
//     //   </FormControl>
//     //   <FormControl fullWidth margin="normal" disabled={!selectedAsset}>
//     //     <InputLabel>Scoped</InputLabel>
//     //     <Select
//     //       value={selectedScoped}
//     //       onChange={(e) => setSelectedScoped(e.target.value)}
//     //     >
//     //       {scoped.map((scope) => (
//     //         <MenuItem key={scope._id} value={scope._id}>
//     //           {scope.name}
//     //         </MenuItem>
//     //       ))}
//     //     </Select>
//     //   </FormControl>
//     //   <FormControl fullWidth margin="normal" disabled={!selectedScoped}>
//     //     <InputLabel>Coverages</InputLabel>
//     //     <Select
//     //       value={selectedCoverage}
//     //       onChange={(e) => setSelectedCoverage(e.target.value)}
//     //     >
//     //       {coverage.map((cov) => (
//     //         <MenuItem key={cov._id} value={cov._id}>
//     //           {cov.name}
//     //         </MenuItem>
//     //       ))}
//     //     </Select>
//     //   </FormControl>
//     // </Container>
//     //   </div>       
       
//     <Box sx={{ minWidth: 120, maxWidth: 300, margin: 'auto', mt: 5 }}>
//     <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
//       <InputLabel>Asset</InputLabel>
//       <Select
//         value={selectedAsset}
//         onChange={(e) => setSelectedAsset(e.target.value)}
//         label="Asset"
//       >
//         {loadingAssets ? (
//           <MenuItem disabled>
//             <CircularProgress size={24} />
//           </MenuItem>
//         ) : (
//           assets.map((asset) => (
//             <MenuItem key={asset._id} value={asset._id}>
//               {asset.name}
//             </MenuItem>
//           ))
//         )}
//       </Select>
//     </FormControl>

//     <FormControl fullWidth variant="outlined" disabled={!selectedAsset}>
//       <InputLabel>Scoped</InputLabel>
//       <Select
//         value={selectedScoped}
//         onChange={(e) => setSelectedScoped(e.target.value)}
//         label="Scoped"
//       >
//         {loadingScoped ? (
//           <MenuItem disabled>
//             <CircularProgress size={24} />
//           </MenuItem>
//         ) : (
//           scoped.map((scope) => (
//             <MenuItem key={scope._id} value={scope._id}>
//               {scope.name}
//             </MenuItem>
//           ))
//         )}
//       </Select>
//     </FormControl>
//   </Box>

//     );
// };

// export default AssetList;
