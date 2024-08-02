import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <div className="main-sidebar">
      <div className="main-sidebar-content">
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            className={clsx({ 'active': activePath === '/' })}
            aria-label="Home"
          >
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/add-company"
            className={clsx({ 'active': activePath === '/add-company' })}
            aria-label="Add Company"
          >
            <ListItemText primary="Add Company" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/dashboard"
            className={clsx({ 'active': activePath === '/dashboard' })}
            aria-label="Dashboard"
          >
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/user-creation"
            className={clsx({ 'active': activePath === '/user-creation' })}
            aria-label="User Creation"
          >
            <ListItemText primary="User Creation" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/asset-management"
            className={clsx({ 'active': activePath === '/asset-management' })}
            aria-label="Asset Management"
          >
            <ListItemText primary="Asset Management" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/list-of-actions"
            className={clsx({ 'active': activePath === '/list-of-actions' })}
            aria-label="List of Actions"
          >
            <ListItemText primary="List of Actions" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/alert-management"
            className={clsx({ 'active': activePath === '/alert-management' })}
            aria-label="Alert and Recommendations"
          >
            <ListItemText primary="Alert and Recommendations" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/control-families"
            className={clsx({ 'active': activePath === '/control-families' })}
            aria-label="Control Families"
          >
            <ListItemText primary="Control Families" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/controls"
            className={clsx({ 'active': activePath === '/controls' })}
            aria-label="Controls"
          >
            <ListItemText primary="Controls" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/actions"
            className={clsx({ 'active': activePath === '/actions' })}
            aria-label="Actions"
          >
            <ListItemText primary="Actions" />
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default Sidebar;

// import React from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import { Link, useLocation } from 'react-router-dom';
// import clsx from 'clsx';
// import './Sidebar.css';

// const Sidebar = () => {
//   const location = useLocation();
//   const activePath = location.pathname;

//   return (
//     <div className="main-sidebar">
//       <List>
//         <ListItem
//           button
//           component={Link}
//           to="/"
//           className={clsx({ 'active': activePath === '/' })}
//           aria-label="Home"
//         >
//           <ListItemText primary="Home" />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/add-company"
//           className={clsx({ 'active': activePath === '/add-company' })}
//           aria-label="Add Company"
//         >
//           <ListItemText primary="Add Company" />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/dashboard"
//           className={clsx({ 'active': activePath === '/dashboard' })}
//           aria-label="Dashboard"
//         >
//           <ListItemText primary="Dashboard" />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/user-creation"
//           className={clsx({ 'active': activePath === '/user-creation' })}
//           aria-label="User Creation"
//         >
//           <ListItemText primary="User Creation" />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/asset-management"
//           className={clsx({ 'active': activePath === '/asset-management' })}
//           aria-label="Asset Management"
//         >
//           <ListItemText primary="Asset Management" />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/list-of-actions"
//           className={clsx({ 'active': activePath === '/list-of-actions' })}
//           aria-label="List of Actions"
//         >
//           <ListItemText primary="List of Actions" />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/alert-management"
//           className={clsx({ 'active': activePath === '/alert-management' })}
//           aria-label="Alert and Recommendations"
//         >
//           <ListItemText primary="Alert and Recommendations" />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/control-families"
//           className={clsx({ 'active': activePath === '/control-families' })}
//           aria-label="Control Families"
//         >
//           <ListItemText primary="Control Families" />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/controls"
//           className={clsx({ 'active': activePath === '/controls' })}
//           aria-label="Controls"
//         >
//           <ListItemText primary="Controls" />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/actions"
//           className={clsx({ 'active': activePath === '/actions' })}
//           aria-label="Actions"
//         >
//           <ListItemText primary="Actions" />
//         </ListItem>
     
//       </List>
//     </div>
//   );
// };

// export default Sidebar;