// import React from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {
//   return (
//     <div className="w-64 h-full bg-gray-800 text-white">
//       <List>
//         <ListItem button component={Link} to="/">
//           <ListItemText primary="Home" />
//         </ListItem>
//         <ListItem button component={Link} to="/add-company">
//           <ListItemText primary="Add Company" />
//         </ListItem>
//       </List>
//     </div>
//   );
// };

// export default Sidebar;
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
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/user-creation">
          <ListItemText primary="User Creation" />
        </ListItem>
        <ListItem button component={Link} to="/asset-management">
          <ListItemText primary="Asset Management" />
        </ListItem>
        <ListItem button component={Link} to="/list-of-actions">
          <ListItemText primary="List of Actions" />
        </ListItem>
        <ListItem button component={Link} to="/alert-management">
          <ListItemText primary="Alert And Recommendations" />
        </ListItem>
        <ListItem button component={Link} to="/asset">
          <ListItemText primary="Asset" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
