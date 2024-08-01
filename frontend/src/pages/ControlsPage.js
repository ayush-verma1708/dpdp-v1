import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ControlsPage.css';

const ControlsPage = () => {
  const [controls, setControls] = useState([]);
  const [controlFamilies, setControlFamilies] = useState([]);
  const [newControl, setNewControl] = useState({ control_Id: '', name: '', description: '', control_Family_Id: '' });
  const [editingControl, setEditingControl] = useState(null);
  const [editControl, setEditControl] = useState({ control_Id: '', name: '', description: '', control_Family_Id: '' });

  useEffect(() => {
    const fetchControls = async () => {
      try {
        const response = await axios.get('http://localhost:8021/api/v1/controls');
        setControls(response.data);
      } catch (error) {
        console.error('Error fetching controls:', error);
      }
    };

    const fetchControlFamilies = async () => {
      try {
        const response = await axios.get('http://localhost:8021/api/v1/control-families');
        setControlFamilies(response.data);
      } catch (error) {
        console.error('Error fetching control families:', error);
      }
    };

    fetchControls();
    fetchControlFamilies();
  }, []);

  const handleAddControl = async () => {
    try {
      const response = await axios.post('http://localhost:8021/api/v1/controls', newControl);
      setControls([...controls, response.data]);
      setNewControl({ control_Id: '', name: '', description: '', control_Family_Id: '' });
    } catch (error) {
      console.error('Error adding control:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditControl = async () => {
    try {
      await axios.put(`http://localhost:8021/api/v1/controls/${editingControl._id}`, editControl);
      setControls(controls.map(control =>
        control._id === editingControl._id ? { ...control, ...editControl } : control
      ));
      setEditingControl(null);
      setEditControl({ control_Id: '', name: '', description: '', control_Family_Id: '' });
    } catch (error) {
      console.error('Error updating control:', error.response ? error.response.data : error.message);
    }
  };


  // const handleDeleteControl = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:8021/api/v1/controls/${id}`);
  //     setControls(controls.filter(control => control._id !== id));
  //   } catch (error) {
  //     console.error('Error deleting control:', error.response ? error.response.data : error.message);
  //   }
  // };

  return (
    <div className="controls-container">
      <h2>Controls</h2>
      
      <div className="control-form">
        <h3>{editingControl ? 'Edit Control' : 'Add New Control'}</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          editingControl ? handleEditControl() : handleAddControl();
        }}>
          <input
            type="text"
            value={editingControl ? editControl.control_Id : newControl.control_Id}
            onChange={(e) => editingControl ? setEditControl({ ...editControl, control_Id: e.target.value }) : setNewControl({ ...newControl, control_Id: e.target.value })}
            placeholder="Control ID"
            required
          />
          <input
            type="text"
            value={editingControl ? editControl.name : newControl.name}
            onChange={(e) => editingControl ? setEditControl({ ...editControl, name: e.target.value }) : setNewControl({ ...newControl, name: e.target.value })}
            placeholder="Name"
            required
          />
          <input
            type="text"
            value={editingControl ? editControl.description : newControl.description}
            onChange={(e) => editingControl ? setEditControl({ ...editControl, description: e.target.value }) : setNewControl({ ...newControl, description: e.target.value })}
            placeholder="Description"
          />
          <select
            value={editingControl ? editControl.control_Family_Id : newControl.control_Family_Id}
            onChange={(e) => editingControl ? setEditControl({ ...editControl, control_Family_Id: e.target.value }) : setNewControl({ ...newControl, control_Family_Id: e.target.value })}
            required
          >
            <option value="" disabled>Select Control Family</option>
            {controlFamilies.map((cf) => (
              <option key={cf._id} value={cf._id}>{cf.name}</option>
            ))}
          </select>
          <button type="submit" className="submit-button">{editingControl ? 'Save' : 'Add'}</button>
          {editingControl && <button type="button" className="cancel-button" onClick={() => { setEditingControl(null); setEditControl({ control_Id: '', name: '', description: '', control_Family_Id: '' }); }}>Cancel</button>}
        </form>
      </div>
      <table className="controls-table">
        <thead>
          <tr>
            <th>Control ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Control Family</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {controls.map((control) => (
            <tr key={control._id}>
              <td>{control.control_Id}</td>
              <td>{control.name}</td>
              <td>{control.description}</td>
              <td>{control.control_Family_Id.name}</td>
              <td>
                <button className="edit-button" onClick={() => { setEditingControl(control); setEditControl(control); }}>Edit</button>
                {/* <button className="delete-button" onClick={() => handleDeleteControl(control._id)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ControlsPage;
