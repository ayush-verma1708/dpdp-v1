import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white pt-20">
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Company" />
        </ListItem>
        <ListItem button component={Link} to="/assets">
          <ListItemText primary="Asset" />
        </ListItem>
        <ListItem button component={Link} to="/coverages">
          <ListItemText primary="Coverage" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
