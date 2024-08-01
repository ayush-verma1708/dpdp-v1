import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ActionsPage.css';

const ActionsPage = () => {
  const [actions, setActions] = useState([]);
  const [controls, setControls] = useState([]);
  const [newAction, setNewAction] = useState({ action_Id: '', name: '', description: '', control_Id: '' });
  const [editingAction, setEditingAction] = useState(null);
  const [editAction, setEditAction] = useState({ action_Id: '', name: '', description: '', control_Id: '' });

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await axios.get('http://localhost:8021/api/v1/actions');
        setActions(response.data);
      } catch (error) {
        console.error('Error fetching actions:', error);
      }
    };

    const fetchControls = async () => {
      try {
        const response = await axios.get('http://localhost:8021/api/v1/controls');
        setControls(response.data);
      } catch (error) {
        console.error('Error fetching controls:', error);
      }
    };

    fetchActions();
    fetchControls();
  }, []);

  const handleAddAction = async () => {
    try {
      const response = await axios.post('http://localhost:8021/api/v1/actions', newAction);
      setActions([...actions, response.data]);
      setNewAction({ action_Id: '', name: '', description: '', control_Id: '' });
    } catch (error) {
      console.error('Error adding action:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditAction = async () => {
    try {
      await axios.put(`http://localhost:8021/api/v1/actions/${editingAction._id}`, editAction);
      setActions(actions.map(action =>
        action._id === editingAction._id ? { ...action, ...editAction } : action
      ));
      setEditingAction(null);
      setEditAction({ action_Id: '', name: '', description: '', control_Id: '' });
    } catch (error) {
      console.error('Error updating action:', error.response ? error.response.data : error.message);
    }
  };

  // const handleDeleteAction = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:8021/api/v1/actions/${id}`);
  //     setActions(actions.filter(action => action._id !== id));
  //   } catch (error) {
  //     console.error('Error deleting action:', error.response ? error.response.data : error.message);
  //   }
  // };

  return (
    <div className="actions-container">
      <h2>Actions</h2>
      
      <div className="action-form">
        <h3>{editingAction ? 'Edit Action' : 'Add New Action'}</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          editingAction ? handleEditAction() : handleAddAction();
        }}>
          <input
            type="text"
            value={editingAction ? editAction.action_Id : newAction.action_Id}
            onChange={(e) => editingAction ? setEditAction({ ...editAction, action_Id: e.target.value }) : setNewAction({ ...newAction, action_Id: e.target.value })}
            placeholder="Action ID"
            required
          />
          <input
            type="text"
            value={editingAction ? editAction.name : newAction.name}
            onChange={(e) => editingAction ? setEditAction({ ...editAction, name: e.target.value }) : setNewAction({ ...newAction, name: e.target.value })}
            placeholder="Name"
            required
          />
          <input
            type="text"
            value={editingAction ? editAction.description : newAction.description}
            onChange={(e) => editingAction ? setEditAction({ ...editAction, description: e.target.value }) : setNewAction({ ...newAction, description: e.target.value })}
            placeholder="Description"
          />
          <select
            value={editingAction ? editAction.control_Id : newAction.control_Id}
            onChange={(e) => editingAction ? setEditAction({ ...editAction, control_Id: e.target.value }) : setNewAction({ ...newAction, control_Id: e.target.value })}
            required
          >
            <option value="" disabled>Select Control</option>
            {controls.map((control) => (
              <option key={control._id} value={control._id}>{control.name}</option>
            ))}
          </select>
          <button type="submit" className="submit-button">{editingAction ? 'Save' : 'Add'}</button>
          {editingAction && <button type="button" className="cancel-button" onClick={() => { setEditingAction(null); setEditAction({ action_Id: '', name: '', description: '', control_Id: '' }); }}>Cancel</button>}
        </form>
      </div>
      <table className="actions-table">
        <thead>
          <tr>
            <th>Action ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Control</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((action) => (
            <tr key={action._id}>
              <td>{action.action_Id}</td>
              <td>{action.name}</td>
              <td>{action.description}</td>
              <td>{action.control_Id.name}</td>
              <td>
                <button className="edit-button" onClick={() => { setEditingAction(action); setEditAction(action); }}>Edit</button>
                {/* <button className="delete-button" onClick={() => handleDeleteAction(action._id)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActionsPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './ActionsPage.css';

// const ActionsPage = () => {
//   const [actions, setActions] = useState([]);
//   const [controls, setControls] = useState([]);
//   const [newAction, setNewAction] = useState({ action_Id: '', name: '', description: '', control_Id: '' });
//   const [editingAction, setEditingAction] = useState(null);
//   const [editAction, setEditAction] = useState({ action_Id: '', name: '', description: '', control_Id: '' });

//   useEffect(() => {
//     const fetchActions = async () => {
//       try {
//         const response = await axios.get('http://localhost:8021/api/v1/actions');
//         setActions(response.data);
//       } catch (error) {
//         console.error('Error fetching actions:', error);
//       }
//     };

//     const fetchControls = async () => {
//       try {
//         const response = await axios.get('http://localhost:8021/api/v1/controls');
//         setControls(response.data);
//       } catch (error) {
//         console.error('Error fetching controls:', error);
//       }
//     };

//     fetchActions();
//     fetchControls();
//   }, []);

//   const handleAddAction = async () => {
//     try {
//       const response = await axios.post('http://localhost:8021/api/v1/actions', newAction);
//       setActions([...actions, response.data]);
//       setNewAction({ action_Id: '', name: '', description: '', control_Id: '' });
//     } catch (error) {
//       console.error('Error adding action:', error.response ? error.response.data : error.message);
//     }
//   };

//   const handleEditAction = async () => {
//     try {
//       await axios.put(`http://localhost:8021/api/v1/actions/${editingAction._id}`, editAction);
//       setActions(actions.map(action =>
//         action._id === editingAction._id ? { ...action, ...editAction } : action
//       ));
//       setEditingAction(null);
//       setEditAction({ action_Id: '', name: '', description: '', control_Id: '' });
//     } catch (error) {
//       console.error('Error updating action:', error.response ? error.response.data : error.message);
//     }
//   };

//   // const handleDeleteAction = async (id) => {
//   //   try {
//   //     await axios.delete(`http://localhost:8021/api/v1/actions/${id}`);
//   //     setActions(actions.filter(action => action._id !== id));
//   //   } catch (error) {
//   //     console.error('Error deleting action:', error.response ? error.response.data : error.message);
//   //   }
//   // };

//   return (
//     <div className="actions-container">
//       <h2>Actions</h2>
      
//       <div className="action-form">
//         <h3>{editingAction ? 'Edit Action' : 'Add New Action'}</h3>
//         <form onSubmit={(e) => {
//           e.preventDefault();
//           editingAction ? handleEditAction() : handleAddAction();
//         }}>
//           <input
//             type="text"
//             value={editingAction ? editAction.action_Id : newAction.action_Id}
//             onChange={(e) => editingAction ? setEditAction({ ...editAction, action_Id: e.target.value }) : setNewAction({ ...newAction, action_Id: e.target.value })}
//             placeholder="Action ID"
//             required
//           />
//           <input
//             type="text"
//             value={editingAction ? editAction.name : newAction.name}
//             onChange={(e) => editingAction ? setEditAction({ ...editAction, name: e.target.value }) : setNewAction({ ...newAction, name: e.target.value })}
//             placeholder="Name"
//             required
//           />
//           <input
//             type="text"
//             value={editingAction ? editAction.description : newAction.description}
//             onChange={(e) => editingAction ? setEditAction({ ...editAction, description: e.target.value }) : setNewAction({ ...newAction, description: e.target.value })}
//             placeholder="Description"
//           />
//           <select
//             value={editingAction ? editAction.control_Id : newAction.control_Id}
//             onChange={(e) => editingAction ? setEditAction({ ...editAction, control_Id: e.target.value }) : setNewAction({ ...newAction, control_Id: e.target.value })}
//             required
//           >
//             <option value="" disabled>Select Control</option>
//             {controls.map((control) => (
//               <option key={control._id} value={control._id}>{control.name}</option>
//             ))}
//           </select>
//           <button type="submit" className="submit-button">{editingAction ? 'Save' : 'Add'}</button>
//           {editingAction && <button type="button" className="cancel-button" onClick={() => { setEditingAction(null); setEditAction({ action_Id: '', name: '', description: '', control_Id: '' }); }}>Cancel</button>}
//         </form>
//       </div>
//       <table className="actions-table">
//         <thead>
//           <tr>
//             <th>Action ID</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Control</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {actions.map((action) => (
//             <tr key={action._id}>
//               <td>{action.action_Id}</td>
//               <td>{action.name}</td>
//               <td>{action.description}</td>
//               <td>{action.control_Id.name}</td>
//               <td>
//                 <button className="edit-button" onClick={() => { setEditingAction(action); setEditAction(action); }}>Edit</button>
//                 {/* <button className="delete-button" onClick={() => handleDeleteAction(action._id)}>Delete</button> */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ActionsPage;
