import React, { useState, useEffect } from "react";
import { getCompanies } from "../api/companyApi";
import Button from "@mui/material/Button";
import Add from '@mui/icons-material/Add';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Grid, TableSortLabel } from "@mui/material";
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const fetchCompanies = async () => {
      const data = await getCompanies(page + 1, rowsPerPage, sortField, sortOrder);
      setCompanies(data.companies);
      setTotalCompanies(data.total);
    };
    fetchCompanies();
  }, [page, rowsPerPage, sortField, sortOrder]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAddCompanyButtonClick = () => {
    navigate('/add-company')
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  return (
<<<<<<< Updated upstream
    <div className="py-2">
      <Grid container paddingBottom={2} spacing={2} alignItems="center" justifyContent="center">
      
      <Grid item xs={6} className="text-start">
      <h6 className="font-bold text-3xl text-cyan-700" >List of Companies</h6>
      </Grid>
      <Grid item xs={6} className="text-end">
      <Button variant="contained" endIcon={<Add />} onClick={handleAddCompanyButtonClick}>
          Add Company
        </Button>
      </Grid>
    </Grid>
      <div>
        <TableContainer component={Paper} style={{ maxHeight: '500px' }}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'name'}
                  direction={sortField === 'name' ? sortOrder : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'email'}
                  direction={sortField === 'email' ? sortOrder : 'asc'}
                  onClick={() => handleSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'address'}
                  direction={sortField === 'address' ? sortOrder : 'asc'}
                  onClick={() => handleSort('address')}
                >
                  Address
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'industryType'}
                  direction={sortField === 'industryType' ? sortOrder : 'asc'}
                  onClick={() => handleSort('industryType')}
                >
                  Industry Type
                </TableSortLabel>
              </TableCell>
=======
    <div className="p-4">
      <TableContainer component={Paper} sx={{maxHeight:450}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Industry Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company._id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{company.address}</TableCell>
                <TableCell>{company.industryType}</TableCell>
>>>>>>> Stashed changes
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company._id}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.email}</TableCell>
                  <TableCell>{company.address}</TableCell>
                  <TableCell>{company.industryType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={totalCompanies}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default Home;
