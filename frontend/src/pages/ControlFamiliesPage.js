import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ControlFamiliesPage.css';

const ControlFamiliesPage = () => {
    const [controlFamilies, setControlFamilies] = useState([]);
    const [newFamily, setNewFamily] = useState({ control_Family_Id: '', name: '', description: '' });
    const [editingFamily, setEditingFamily] = useState(null);
    const [editFamily, setEditFamily] = useState({ control_Family_Id: '', name: '', description: '' });

    useEffect(() => {
        const fetchControlFamilies = async () => {
            try {
                const response = await axios.get('http://localhost:8021/api/v1/control-families');
                setControlFamilies(response.data);
            } catch (error) {
                console.error('Error fetching control families:', error);
            }
        };

        fetchControlFamilies();
    }, []);

    const handleAddFamily = async () => {
        try {
            const response = await axios.post('http://localhost:8021/api/v1/control-families', newFamily);
            setControlFamilies([...controlFamilies, response.data]);
            setNewFamily({ control_Family_Id: '', name: '', description: '' });
        } catch (error) {
            console.error('Error adding control family:', error.response ? error.response.data : error.message);
        }
    };

    const handleEditFamily = async () => {
        try {
            await axios.put(`http://localhost:8021/api/v1/control-families/${editingFamily._id}`, editFamily);
            setControlFamilies(controlFamilies.map(family =>
                family._id === editingFamily._id ? { ...family, ...editFamily } : family
            ));
            setEditingFamily(null);
            setEditFamily({ control_Family_Id: '', name: '', description: '' });
        } catch (error) {
            console.error('Error updating control family:', error.response ? error.response.data : error.message);
        }
    };

    // const handleDeleteFamily = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:8021/api/v1/control-families/${id}`);
    //         setControlFamilies(controlFamilies.filter(family => family._id !== id));
    //     } catch (error) {
    //         console.error('Error deleting control family:', error.response ? error.response.data : error.message);
    //     }
    // };

    return (
        <div className="control-families-container">
            <h2>Control Families</h2>
           
            <div className="control-family-form">
                <h3>{editingFamily ? 'Edit Control Family' : 'Add New Control Family'}</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    editingFamily ? handleEditFamily() : handleAddFamily();
                }}>
                    <input
                        type="text"
                        value={editingFamily ? editFamily.control_Family_Id : newFamily.control_Family_Id}
                        onChange={(e) => editingFamily ? setEditFamily({ ...editFamily, control_Family_Id: e.target.value }) : setNewFamily({ ...newFamily, control_Family_Id: e.target.value })}
                        placeholder="Control Family ID"
                        required
                    />
                    <input
                        type="text"
                        value={editingFamily ? editFamily.name : newFamily.name}
                        onChange={(e) => editingFamily ? setEditFamily({ ...editFamily, name: e.target.value }) : setNewFamily({ ...newFamily, name: e.target.value })}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="text"
                        value={editingFamily ? editFamily.description : newFamily.description}
                        onChange={(e) => editingFamily ? setEditFamily({ ...editFamily, description: e.target.value }) : setNewFamily({ ...newFamily, description: e.target.value })}
                        placeholder="Description"
                        required
                    />
                    <button type="submit" className="submit-button">{editingFamily ? 'Save' : 'Add'}</button>
                    {editingFamily && <button type="button" className="cancel-button" onClick={() => { setEditingFamily(null); setEditFamily({ control_Family_Id: '', name: '', description: '' }); }}>Cancel</button>}
                </form>
            </div>
            <table className="control-families-table">
                <thead>
                    <tr>
                        <th>Control Family ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {controlFamilies.map((cf) => (
                        <tr key={cf._id}>
                            <td>{cf.control_Family_Id}</td>
                            <td>{cf.name}</td>
                            <td>{cf.description}</td>
                            <td>
                                <button className="edit-button" onClick={() => { setEditingFamily(cf); setEditFamily(cf); }}>Edit</button>
                                {/* <button className="delete-button" onClick={() => handleDeleteFamily(cf._id)}>Delete</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ControlFamiliesPage;
