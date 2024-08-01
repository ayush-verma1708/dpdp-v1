import React, { useState, useEffect } from 'react';
import { fetchControlFamilies } from '../api/controlFamilyAPI';
import { fetchControls } from '../api/ControlAPI';
import { fetchActions } from '../api/actionAPI';
import './NewPage.css';

const NewPage = () => {
  const [controlFamilies, setControlFamilies] = useState([]);
  const [controls, setControls] = useState([]);
  const [selectedFamilyId, setSelectedFamilyId] = useState('');
  const [selectedControlId, setSelectedControlId] = useState('');
  const [actions, setActions] = useState([]);
  const [loadingFamilies, setLoadingFamilies] = useState(true);
  const [loadingControls, setLoadingControls] = useState(false);
  const [loadingActions, setLoadingActions] = useState(false);
  const [error, setError] = useState('');

  // Fetch control families on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const familyResponse = await fetchControlFamilies();
        setControlFamilies(familyResponse.data);
      } catch (err) {
        setError('Failed to fetch control families.');
      } finally {
        setLoadingFamilies(false);
      }
    };
    fetchData();
  }, []);

  // Fetch controls when selectedFamilyId changes
  useEffect(() => {
    const fetchControlData = async () => {
      if (selectedFamilyId) {
        setLoadingControls(true);
        try {
          const controlResponse = await fetchControls();
          setControls(controlResponse.data.filter(control => control.control_Family_Id._id === selectedFamilyId));
        } catch (err) {
          setError('Failed to fetch controls.');
        } finally {
          setLoadingControls(false);
        }
      } else {
        setControls([]);
      }
    };
    fetchControlData();
  }, [selectedFamilyId]);

  // Fetch actions when selectedControlId changes
  useEffect(() => {
    const fetchActionData = async () => {
      if (selectedControlId) {
        setLoadingActions(true);
        try {
          const actionResponse = await fetchActions();
          setActions(actionResponse.data.filter(action => action.control_Id._id === selectedControlId));
        } catch (err) {
          setError('Failed to fetch actions.');
        } finally {
          setLoadingActions(false);
        }
      } else {
        setActions([]);
      }
    };
    fetchActionData();
  }, [selectedControlId]);

  // Handle changes in selected family
  const handleFamilyChange = (event) => {
    setSelectedFamilyId(event.target.value);
    setSelectedControlId(''); // Reset control selection when family changes
  };

  // Handle changes in selected control
  const handleControlChange = (event) => {
    setSelectedControlId(event.target.value);
  };

  return (
    <div className="new-page-container">
      <div className="new-page-sidebar">
        <div className="logo">Logo</div>
        <div className="navbar">
          <h2>DPDP Software</h2>
        </div>
        <div className="control-families">
          <label>Control Families:</label>
          {controlFamilies.map(family => (
            <div key={family._id} className="family">
              <div>
                <input
                  type="radio"
                  id={family._id}
                  value={family._id}
                  checked={selectedFamilyId === family._id}
                  onChange={handleFamilyChange}
                />
                <label htmlFor={family._id}>{family.name}</label>
              </div>
              {selectedFamilyId === family._id && controls.map(control => (
                <div key={control._id} className="control">
                  <input
                    type="radio"
                    id={control._id}
                    value={control._id}
                    checked={selectedControlId === control._id}
                    onChange={handleControlChange}
                  />
                  <label htmlFor={control._id}>{control.name}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="new-page-main-content">
        <div className="new-page-top-bar">
          <div className="user-info">
            <span>User ID: M02E01</span>
            <span>Total Score: 17</span>
            <span>Total Risk: 83%</span>
          </div>
          <div className="company-info">
            <span>Company: A01S0C2</span>
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        {loadingFamilies && <p>Loading control families...</p>}
        {loadingControls && selectedFamilyId && <p>Loading controls...</p>}
        {loadingActions && selectedControlId && <p>Loading actions...</p>}
        {!loadingActions && selectedControlId && (
          <div className="new-page-action-table">
            <h3>List of Actions</h3>
            <table>
              <thead>
                <tr>
                  <th>Sno.</th>
                  <th>Actions</th>
                  <th>Criticality</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Evidence</th>
                </tr>
              </thead>
              <tbody>
                {actions.map((action, index) => (
                  <tr key={action._id}>
                    <td>{index + 1}</td>
                    <td>{action.name}</td>
                    <td>{action.criticality}</td>
                    <td>{action.dueDate}</td>
                    <td>
                      <select>
                        <option value="completed">Completed</option>
                        <option value="hold">Hold</option>
                        <option value="delegate">Delegate</option>
                        <option value="disable">Disable</option>
                      </select>
                    </td>
                    <td>
                      <button>Upload</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPage;

// import React, { useState, useEffect } from 'react';
// import { fetchControlFamilies } from '../api/controlFamilyAPI';
// import { fetchControls } from '../api/ControlAPI';
// import { fetchActions } from '../api/actionAPI';
// import './NewPage.css';

// const NewPage = () => {
//   const [controlFamilies, setControlFamilies] = useState([]);
//   const [controls, setControls] = useState([]);
//   const [selectedFamilyId, setSelectedFamilyId] = useState('');
//   const [selectedControlId, setSelectedControlId] = useState('');
//   const [actions, setActions] = useState([]);
//   const [loadingFamilies, setLoadingFamilies] = useState(true);
//   const [loadingControls, setLoadingControls] = useState(false);
//   const [loadingActions, setLoadingActions] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch control families on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const familyResponse = await fetchControlFamilies();
//         setControlFamilies(familyResponse.data);
//       } catch (err) {
//         setError('Failed to fetch control families.');
//       } finally {
//         setLoadingFamilies(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Fetch controls when selectedFamilyId changes
//   useEffect(() => {
//     const fetchControlData = async () => {
//       if (selectedFamilyId) {
//         setLoadingControls(true);
//         try {
//           const controlResponse = await fetchControls();
//           setControls(controlResponse.data.filter(control => control.control_Family_Id._id === selectedFamilyId));
//         } catch (err) {
//           setError('Failed to fetch controls.');
//         } finally {
//           setLoadingControls(false);
//         }
//       } else {
//         setControls([]);
//       }
//     };
//     fetchControlData();
//   }, [selectedFamilyId]);

//   // Fetch actions when selectedControlId changes
//   useEffect(() => {
//     const fetchActionData = async () => {
//       if (selectedControlId) {
//         setLoadingActions(true);
//         try {
//           const actionResponse = await fetchActions();
//           setActions(actionResponse.data.filter(action => action.control_Id._id === selectedControlId));
//         } catch (err) {
//           setError('Failed to fetch actions.');
//         } finally {
//           setLoadingActions(false);
//         }
//       } else {
//         setActions([]);
//       }
//     };
//     fetchActionData();
//   }, [selectedControlId]);

//   // Handle changes in selected family
//   const handleFamilyChange = (event) => {
//     setSelectedFamilyId(event.target.value);
//     setSelectedControlId(''); // Reset control selection when family changes
//   };

//   // Handle changes in selected control
//   const handleControlChange = (event) => {
//     setSelectedControlId(event.target.value);
//   };

//   return (
//     <div className="new-page">
//       <div className="sidebar">
//         <div className="logo">Logo</div>
//         <div className="navbar">
//           <h2>DPDP Software</h2>
//         </div>
//         <div className="control-families">
//           <label>Control Families:</label>
//           {controlFamilies.map(family => (
//             <div key={family._id} className="family">
//               <div>
//                 <input
//                   type="radio"
//                   id={family._id}
//                   value={family._id}
//                   checked={selectedFamilyId === family._id}
//                   onChange={handleFamilyChange}
//                 />
//                 <label htmlFor={family._id}>{family.name}</label>
//               </div>
//               {selectedFamilyId === family._id && controls.map(control => (
//                 <div key={control._id} className="control">
//                   <input
//                     type="radio"
//                     id={control._id}
//                     value={control._id}
//                     checked={selectedControlId === control._id}
//                     onChange={handleControlChange}
//                   />
//                   <label htmlFor={control._id}>{control.name}</label>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="main-content">
//         <div className="top-bar">
//           <div className="user-info">
//             <span>User ID: M02E01</span>
//             <span>Total Score: 17</span>
//             <span>Total Risk: 83%</span>
//           </div>
//           <div className="company-info">
//             <span>Company: A01S0C2</span>
//           </div>
//         </div>
//         {error && <p className="error">{error}</p>}
//         {loadingFamilies && <p>Loading control families...</p>}
//         {loadingControls && selectedFamilyId && <p>Loading controls...</p>}
//         {loadingActions && selectedControlId && <p>Loading actions...</p>}
//         {!loadingActions && selectedControlId && (
//           <div className="action-table">
//             <h3>List of Actions</h3>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Sno.</th>
//                   <th>Actions</th>
//                   <th>Criticality</th>
//                   <th>Due Date</th>
//                   <th>Status</th>
//                   <th>Evidence</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {actions.map((action, index) => (
//                   <tr key={action._id}>
//                     <td>{index + 1}</td>
//                     <td>{action.name}</td>
//                     <td>{action.criticality}</td>
//                     <td>{action.dueDate}</td>
//                     <td>
//                       <select>
//                         <option value="completed">Completed</option>
//                         <option value="hold">Hold</option>
//                         <option value="delegate">Delegate</option>
//                         <option value="disable">Disable</option>
//                       </select>
//                     </td>
//                     <td>
//                       <button>Upload</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NewPage;

// // import React, { useState, useEffect } from 'react';
// // import { fetchControlFamilies } from '../api/controlFamilyAPI';
// // import { fetchControls } from '../api/ControlAPI';
// // import { fetchActions } from '../api/actionAPI';
// // import './NewPage.css';

// // const NewPage = () => {
// //   const [controlFamilies, setControlFamilies] = useState([]);
// //   const [controls, setControls] = useState([]);
// //   const [selectedFamilyId, setSelectedFamilyId] = useState('');
// //   const [selectedControlId, setSelectedControlId] = useState('');
// //   const [actions, setActions] = useState([]);
// //   const [loadingFamilies, setLoadingFamilies] = useState(true);
// //   const [loadingControls, setLoadingControls] = useState(false);
// //   const [loadingActions, setLoadingActions] = useState(false);
// //   const [error, setError] = useState('');

// //   // Fetch control families on component mount
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const familyResponse = await fetchControlFamilies();
// //         // Assuming `familyResponse.data` contains the correct IDs
// //         setControlFamilies(familyResponse.data);
// //       } catch (err) {
// //         setError('Failed to fetch control families.');
// //       } finally {
// //         setLoadingFamilies(false);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   // Fetch controls when selectedFamilyId changes
// //   useEffect(() => {
// //     const fetchControlData = async () => {
// //       if (selectedFamilyId) {
// //         setLoadingControls(true);
// //         try {
// //           const controlResponse = await fetchControls();
// //           setControls(controlResponse.data.filter(control => control.control_Family_Id._id === selectedFamilyId));
// //         } catch (err) {
// //           // setError('Failed to fetch controls.');
// //         } finally {
// //           setLoadingControls(false);
// //         }
// //       } else {
// //         setControls([]);
// //       }
// //     };
// //     fetchControlData();
// //   }, [selectedFamilyId]);

// //   // Fetch actions when selectedControlId changes
// //   useEffect(() => {
// //     const fetchActionData = async () => {
// //       if (selectedControlId) {
// //         setLoadingActions(true);
// //         try {
// //           const actionResponse = await fetchActions();
// //           setActions(actionResponse.data.filter(action => action.control_Id._id === selectedControlId));
// //         } catch (err) {
// //           setError('Failed to fetch actions.');
// //         } finally {
// //           setLoadingActions(false);
// //         }
// //       } else {
// //         setActions([]);
// //       }
// //     };
// //     fetchActionData();
// //   }, [selectedControlId]);

// //   // Handle changes in selected family
// //   const handleFamilyChange = (event) => {
// //     setSelectedFamilyId(event.target.value);
// //     setSelectedControlId(''); // Reset control selection when family changes
// //   };

// //   // Handle changes in selected control
// //   const handleControlChange = (event) => {
// //     setSelectedControlId(event.target.value);
// //   };

// //   return (
// //     <div className="new-page">
// //       <h1>DPDP Software</h1>
// //       <div className="dropdowns">
// //         <div className="dropdown">
// //           <label htmlFor="controlFamily">Control Family:</label>
// //           <select id="controlFamily" value={selectedFamilyId} onChange={handleFamilyChange}>
// //             <option value="">Select a Control Family</option>
// //             {controlFamilies.map(family => (
// //               <option key={family._id} value={family._id}>
// //                 {family.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //         <div className="dropdown">
// //           <label htmlFor="control">Control:</label>
// //           <select id="control" value={selectedControlId} onChange={handleControlChange} disabled={!selectedFamilyId}>
// //             <option value="">Select a Control</option>
// //             {controls.map(control => (
// //               <option key={control._id} value={control._id}>
// //                 {control.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //       </div>
// //       {error && <p className="error">{error}</p>}
// //       {loadingFamilies && <p>Loading control families...</p>}
// //       {loadingControls && selectedFamilyId && <p>Loading controls...</p>}
// //       {loadingActions && selectedControlId && <p>Loading actions...</p>}
// //       {!loadingActions && selectedControlId && (
// //         <div className="action-table">
// //           {/* <h3>List of Actions</h3> */}
// //           <table>
// //             <thead>
// //               <tr>
// //                 <th>Action ID</th>
// //                 <th>Action Name</th>
// //                 <th>Status</th>
// //                 <th>Upload</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {actions.map(action => (
// //                 <tr key={action._id}>
// //                   <td>{action.action_Id}</td>
// //                   <td>{action.name}</td>
// //                   <td>
// //                     <select>
// //                       <option value="completed">Completed</option>
// //                       <option value="hold">Hold</option>
// //                       <option value="delegate">Delegate</option>
// //                       <option value="disable">Disable</option>
// //                     </select>
// //                   </td>
// //                   <td>
// //                     <button>Upload</button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default NewPage;
