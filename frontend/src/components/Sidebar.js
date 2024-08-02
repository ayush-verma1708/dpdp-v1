import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/add-company">
          <ListItemText primary="Add Company" />
        </ListItem>
        <ListItem button component={Link} to="/asset">
          <ListItemText primary="Asset" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
