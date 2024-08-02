import React, { useState, useEffect } from 'react';
import { fetchControlFamilies } from '../api/controlFamilyAPI';
import { fetchControls } from '../api/ControlAPI';
import { fetchActions } from '../api/actionAPI';
import { uploadActionFile } from '../api/uploadAPI';
import './ListOfActions.css';

const ListOfActions = () => {
  const [controlFamilies, setControlFamilies] = useState([]);
  const [controls, setControls] = useState([]);
  const [actions, setActions] = useState([]);
  const [expandedFamilyId, setExpandedFamilyId] = useState('');
  const [selectedControlId, setSelectedControlId] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const familyResponse = await fetchControlFamilies();
        setControlFamilies(familyResponse.data);
      } catch (err) {
        setError('Failed to fetch control families.');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchControlData = async () => {
      try {
        const controlResponse = await fetchControls();
        setControls(controlResponse.data);
      } catch (err) {
        setError('Failed to fetch controls.');
      }
    };
    fetchControlData();
  }, [controlFamilies]);

  useEffect(() => {
    const fetchActionData = async () => {
      if (selectedControlId) {
        try {
          const actionResponse = await fetchActions();
          setActions(actionResponse.data.filter(action => action.control_Id._id === selectedControlId));
        } catch (err) {
          setError('Failed to fetch actions.');
        }
      } else {
        setActions([]);
      }
    };
    fetchActionData();
  }, [selectedControlId]);

  const handleFamilyClick = (familyId) => {
    setExpandedFamilyId(expandedFamilyId === familyId ? '' : familyId);
  };

  const handleControlClick = (controlId) => {
    setSelectedControlId(controlId);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setSubmitted(false);
  };

  const handleFileUpload = async (actionId) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('actionId', actionId);

      setUploading(true);
      try {
        const response = await uploadActionFile(formData);
        setPdfUrl(response.file.path);
        alert('File uploaded successfully');
        setSubmitted(true);
      } catch (err) {
        alert('Failed to upload file');
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="new-page">
      <div className="sidebar">
        {controlFamilies.map(family => (
          <div key={family._id} className="control-family">
            <div className="control-family-header" onClick={() => handleFamilyClick(family._id)}>
              {family.name}
            </div>
            {expandedFamilyId === family._id && (
              <div className="controls">
                {controls
                  .filter(control => control.control_Family_Id._id === family._id)
                  .map(control => (
                    <div key={control._id} className="control" onClick={() => handleControlClick(control._id)}>
                      {control.name}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="content">
        <h1>DPDP Software</h1>
        {error && <p className="error">{error}</p>}
        {selectedControlId && (
          <div className="action-table">
            <table>
              <thead>
                <tr>
                  <th>Action ID</th>
                  <th>Action Name</th>
                  <th>Status</th>
                  <th>Upload</th>
                  <th>Submit</th>
                  <th>View PDF</th>
                </tr>
              </thead>
              <tbody>
                {actions.map(action => (
                  <tr key={action._id}>
                    <td>{action.action_Id}</td>
                    <td>{action.name}</td>
                    <td>
                      <select>
                        <option value="completed">Completed</option>
                        <option value="hold">Hold</option>
                        <option value="delegate">Delegate</option>
                        <option value="disable">Disable</option>
                      </select>
                    </td>
                    <td>
                      <input type="file" accept="application/pdf" onChange={handleFileChange} />
                    </td>
                    <td>
                      <button onClick={() => handleFileUpload(action._id)} disabled={uploading || !file}>
                        {uploading ? 'Uploading...' : 'Upload'}
                      </button>
                    </td>
                    <td>
                      {submitted && pdfUrl && (
                        <a href={`/${pdfUrl}`} target="_blank" rel="noopener noreferrer">
                          View PDF
                        </a>
                      )}
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

export default ListOfActions;

// import React, { useState, useEffect } from 'react';
// import { fetchControlFamilies } from '../api/controlFamilyAPI';
// import { fetchControls } from '../api/ControlAPI';
// import { fetchActions } from '../api/actionAPI';
// import { uploadActionFile } from '../api/uploadAPI';
// import './ListOfActions.css';

// const ListOfActions = () => {
//   const [controlFamilies, setControlFamilies] = useState([]);
//   const [controls, setControls] = useState([]);
//   const [actions, setActions] = useState([]);
//   const [expandedFamilyId, setExpandedFamilyId] = useState('');
//   const [selectedControlId, setSelectedControlId] = useState('');
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState('');
//   const [pdfUrl, setPdfUrl] = useState('');

//   // Fetch control families on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const familyResponse = await fetchControlFamilies();
//         setControlFamilies(familyResponse.data);
//       } catch (err) {
//         setError('Failed to fetch control families.');
//       }
//     };
//     fetchData();
//   }, []);

//   // Fetch controls when control families are fetched
//   useEffect(() => {
//     const fetchControlData = async () => {
//       try {
//         const controlResponse = await fetchControls();
//         setControls(controlResponse.data);
//       } catch (err) {
//         setError('Failed to fetch controls.');
//       }
//     };
//     fetchControlData();
//   }, [controlFamilies]);

//   // Fetch actions when selectedControlId changes
//   useEffect(() => {
//     const fetchActionData = async () => {
//       if (selectedControlId) {
//         try {
//           const actionResponse = await fetchActions();
//           setActions(actionResponse.data.filter(action => action.control_Id._id === selectedControlId));
//         } catch (err) {
//           setError('Failed to fetch actions.');
//         }
//       } else {
//         setActions([]);
//       }
//     };
//     fetchActionData();
//   }, [selectedControlId]);

//   // Handle expanding/collapsing control family
//   const handleFamilyClick = (familyId) => {
//     setExpandedFamilyId(expandedFamilyId === familyId ? '' : familyId);
//   };

//   // Handle selecting control
//   const handleControlClick = (controlId) => {
//     setSelectedControlId(controlId);
//   };

//   // Handle file change
//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//     setSubmitted(false); // Reset submission status when a new file is selected
//   };

//   // Handle file upload
//   const handleFileUpload = async (actionId) => {
//     if (file) {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('actionId', actionId);

//       setUploading(true);
//       try {
//         const response = await uploadActionFile(formData);
//         setPdfUrl(response.file.path); // Assuming the server responds with the file path
//         alert('File uploaded successfully');
//         setSubmitted(true);
//       } catch (err) {
//         alert('Failed to upload file');
//       } finally {
//         setUploading(false);
//       }
//     }
//   };

//   return (
//     <div className="new-page">
//       <h1>DPDP Software</h1>
//       {controlFamilies.map(family => (
//         <div key={family._id} className="control-family">
//           <div className="control-family-header" onClick={() => handleFamilyClick(family._id)}>
//             {family.name}
//           </div>
//           {expandedFamilyId === family._id && (
//             <div className="controls">
//               {controls
//                 .filter(control => control.control_Family_Id._id === family._id)
//                 .map(control => (
//                   <div key={control._id} className="control" onClick={() => handleControlClick(control._id)}>
//                     {control.name}
//                   </div>
//                 ))}
//             </div>
//           )}
//         </div>
//       ))}
//       {error && <p className="error">{error}</p>}
//       {selectedControlId && (
//         <div className="action-table">
//           <table>
//             <thead>
//               <tr>
//                 <th>Action ID</th>
//                 <th>Action Name</th>
//                 <th>Status</th>
//                 <th>Upload</th>
//                 <th>Submit</th>
//                 <th>View PDF</th>
//               </tr>
//             </thead>
//             <tbody>
//               {actions.map(action => (
//                 <tr key={action._id}>
//                   <td>{action.action_Id}</td>
//                   <td>{action.name}</td>
//                   <td>
//                     <select>
//                       <option value="completed">Completed</option>
//                       <option value="hold">Hold</option>
//                       <option value="delegate">Delegate</option>
//                       <option value="disable">Disable</option>
//                     </select>
//                   </td>
//                   <td>
//                     <input
//                       type="file"
//                       accept="application/pdf"
//                       onChange={handleFileChange}
//                     />
//                   </td>
//                   <td>
//                     <button 
//                       onClick={() => handleFileUpload(action._id)}
//                       disabled={uploading || !file}
//                     >
//                       {uploading ? 'Uploading...' : 'Upload'}
//                     </button>
//                   </td>
//                   <td>
//                     {submitted && pdfUrl && (
//                       <a href={`/${pdfUrl}`} target="_blank" rel="noopener noreferrer">
//                         View PDF
//                       </a>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListOfActions;

// // import React, { useState, useEffect } from 'react';
// // import { fetchControlFamilies } from '../api/controlFamilyAPI';
// // import { fetchControls } from '../api/ControlAPI';
// // import { fetchActions } from '../api/actionAPI';
// // import { uploadActionFile } from '../api/uploadAPI';
// // import './NewPage.css';

// // const ListOfActions = () => {
// //   const [controlFamilies, setControlFamilies] = useState([]);
// //   const [controls, setControls] = useState([]);
// //   const [actions, setActions] = useState([]);
// //   const [selectedFamilyId, setSelectedFamilyId] = useState('');
// //   const [selectedControlId, setSelectedControlId] = useState('');
// //   const [selectedActionId, setSelectedActionId] = useState('');
// //   const [file, setFile] = useState(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [submitted, setSubmitted] = useState(false);
// //   const [error, setError] = useState('');
// //   const [pdfUrl, setPdfUrl] = useState('');

// //   // Fetch control families on component mount
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const familyResponse = await fetchControlFamilies();
// //         setControlFamilies(familyResponse.data);
// //       } catch (err) {
// //         setError('Failed to fetch control families.');
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   // Fetch controls when selectedFamilyId changes
// //   useEffect(() => {
// //     const fetchControlData = async () => {
// //       if (selectedFamilyId) {
// //         try {
// //           const controlResponse = await fetchControls();
// //           setControls(controlResponse.data.filter(control => control.control_Family_Id._id === selectedFamilyId));
// //         } catch (err) {
// //           setError('Failed to fetch controls.');
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
// //         try {
// //           const actionResponse = await fetchActions();
// //           setActions(actionResponse.data.filter(action => action.control_Id._id === selectedControlId));
// //         } catch (err) {
// //           setError('Failed to fetch actions.');
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

// //   // Handle file change
// //   const handleFileChange = (event) => {
// //     setFile(event.target.files[0]);
// //     setSubmitted(false); // Reset submission status when a new file is selected
// //   };

// //   // Handle file upload
// //   const handleFileUpload = async (actionId) => {
// //     if (file) {
// //       const formData = new FormData();
// //       formData.append('file', file);
// //       formData.append('actionId', actionId);

// //       setUploading(true);
// //       try {
// //         const response = await uploadActionFile(formData);
// //         setPdfUrl(response.file.path); // Assuming the server responds with the file path
// //         alert('File uploaded successfully');
// //         setSubmitted(true);
// //       } catch (err) {
// //         alert('Failed to upload file');
// //       } finally {
// //         setUploading(false);
// //       }
// //     }
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
// //       {selectedControlId && (
// //         <div className="action-table">
// //           <table>
// //             <thead>
// //               <tr>
// //                 <th>Action ID</th>
// //                 <th>Action Name</th>
// //                 <th>Status</th>
// //                 <th>Upload</th>
// //                 <th>Submit</th>
// //                 <th>View PDF</th>
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
// //                     <input
// //                       type="file"
// //                       accept="application/pdf"
// //                       onChange={handleFileChange}
// //                     />
// //                   </td>
// //                   <td>
// //                     <button 
// //                       onClick={() => handleFileUpload(action._id)}
// //                       disabled={uploading || !file}
// //                     >
// //                       {uploading ? 'Uploading...' : 'Upload'}
// //                     </button>
// //                   </td>
// //                   <td>
// //                     {submitted && pdfUrl && (
// //                       <a href={`/${pdfUrl}`} target="_blank" rel="noopener noreferrer">
// //                         View PDF
// //                       </a>
// //                     )}
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

// // export default ListOfActions;

// // // import React, { useState, useEffect } from 'react';
// // // import { fetchControlFamilies } from '../api/controlFamilyAPI';
// // // import { fetchControls } from '../api/ControlAPI';
// // // import { fetchActions } from '../api/actionAPI';
// // // import { uploadActionFile } from '../api/uploadAPI';
// // // import './NewPage.css';

// // // const NewPage = () => {
// // //   const [controlFamilies, setControlFamilies] = useState([]);
// // //   const [controls, setControls] = useState([]);
// // //   const [selectedFamilyId, setSelectedFamilyId] = useState('');
// // //   const [selectedControlId, setSelectedControlId] = useState('');
// // //   const [actions, setActions] = useState([]);
// // //   const [loadingFamilies, setLoadingFamilies] = useState(true);
// // //   const [loadingControls, setLoadingControls] = useState(false);
// // //   const [loadingActions, setLoadingActions] = useState(false);
// // //   const [error, setError] = useState('');

// // //   // Fetch control families on component mount
// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const familyResponse = await fetchControlFamilies();
// // //         setControlFamilies(familyResponse.data);
// // //       } catch (err) {
// // //         setError('Failed to fetch control families.');
// // //       } finally {
// // //         setLoadingFamilies(false);
// // //       }
// // //     };
// // //     fetchData();
// // //   }, []);

// // //   // Fetch controls when selectedFamilyId changes
// // //   useEffect(() => {
// // //     const fetchControlData = async () => {
// // //       if (selectedFamilyId) {
// // //         setLoadingControls(true);
// // //         try {
// // //           const controlResponse = await fetchControls();
// // //           setControls(controlResponse.data.filter(control => control.control_Family_Id._id === selectedFamilyId));
// // //         } catch (err) {
// // //           setError('Failed to fetch controls.');
// // //         } finally {
// // //           setLoadingControls(false);
// // //         }
// // //       } else {
// // //         setControls([]);
// // //       }
// // //     };
// // //     fetchControlData();
// // //   }, [selectedFamilyId]);

// // //   // Fetch actions when selectedControlId changes
// // //   useEffect(() => {
// // //     const fetchActionData = async () => {
// // //       if (selectedControlId) {
// // //         setLoadingActions(true);
// // //         try {
// // //           const actionResponse = await fetchActions();
// // //           setActions(actionResponse.data.filter(action => action.control_Id._id === selectedControlId));
// // //         } catch (err) {
// // //           setError('Failed to fetch actions.');
// // //         } finally {
// // //           setLoadingActions(false);
// // //         }
// // //       } else {
// // //         setActions([]);
// // //       }
// // //     };
// // //     fetchActionData();
// // //   }, [selectedControlId]);

// // //   // Handle changes in selected family
// // //   const handleFamilyChange = (event) => {
// // //     setSelectedFamilyId(event.target.value);
// // //     setSelectedControlId(''); // Reset control selection when family changes
// // //   };

// // //   // Handle changes in selected control
// // //   const handleControlChange = (event) => {
// // //     setSelectedControlId(event.target.value);
// // //   };

// // //   // Handle file upload
// // //   const handleFileUpload = async (event, actionId) => {
// // //     const file = event.target.files[0];
// // //     if (file) {
// // //       const formData = new FormData();
// // //       formData.append('file', file);
// // //       formData.append('actionId', actionId);

// // //       try {
// // //         await uploadActionFile(formData);
// // //         alert('File uploaded successfully');
// // //       } catch (err) {
// // //         alert('Failed to upload file');
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <div className="new-page">
// // //       <h1>DPDP Software</h1>
// // //       <div className="dropdowns">
// // //         <div className="dropdown">
// // //           <label htmlFor="controlFamily">Control Family:</label>
// // //           <select id="controlFamily" value={selectedFamilyId} onChange={handleFamilyChange}>
// // //             <option value="">Select a Control Family</option>
// // //             {controlFamilies.map(family => (
// // //               <option key={family._id} value={family._id}>
// // //                 {family.name}
// // //               </option>
// // //             ))}
// // //           </select>
// // //         </div>
// // //         <div className="dropdown">
// // //           <label htmlFor="control">Control:</label>
// // //           <select id="control" value={selectedControlId} onChange={handleControlChange} disabled={!selectedFamilyId}>
// // //             <option value="">Select a Control</option>
// // //             {controls.map(control => (
// // //               <option key={control._id} value={control._id}>
// // //                 {control.name}
// // //               </option>
// // //             ))}
// // //           </select>
// // //         </div>
// // //       </div>
// // //       {error && <p className="error">{error}</p>}
// // //       {loadingFamilies && <p>Loading control families...</p>}
// // //       {loadingControls && selectedFamilyId && <p>Loading controls...</p>}
// // //       {loadingActions && selectedControlId && <p>Loading actions...</p>}
// // //       {!loadingActions && selectedControlId && (
// // //         <div className="action-table">
// // //           <table>
// // //             <thead>
// // //               <tr>
// // //                 <th>Action ID</th>
// // //                 <th>Action Name</th>
// // //                 <th>Status</th>
// // //                 <th>Upload</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {actions.map(action => (
// // //                 <tr key={action._id}>
// // //                   <td>{action.action_Id}</td>
// // //                   <td>{action.name}</td>
// // //                   <td>
// // //                     <select>
// // //                       <option value="completed">Completed</option>
// // //                       <option value="hold">Hold</option>
// // //                       <option value="delegate">Delegate</option>
// // //                       <option value="disable">Disable</option>
// // //                     </select>
// // //                   </td>
// // //                   <td>
// // //                     <input
// // //                       type="file"
// // //                       accept="application/pdf"
// // //                       onChange={(event) => handleFileUpload(event, action._id)}
// // //                     />
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default NewPage;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { fetchControlFamilies } from '../api/controlFamilyAPI';
// // // // import { fetchControls } from '../api/ControlAPI';
// // // // import { fetchActions } from '../api/actionAPI';
// // // // import './NewPage.css';

// // // // const NewPage = () => {
// // // //   const [controlFamilies, setControlFamilies] = useState([]);
// // // //   const [controls, setControls] = useState([]);
// // // //   const [selectedFamilyId, setSelectedFamilyId] = useState('');
// // // //   const [selectedControlId, setSelectedControlId] = useState('');
// // // //   const [actions, setActions] = useState([]);
// // // //   const [loadingFamilies, setLoadingFamilies] = useState(true);
// // // //   const [loadingControls, setLoadingControls] = useState(false);
// // // //   const [loadingActions, setLoadingActions] = useState(false);
// // // //   const [error, setError] = useState('');

// // // //   // Fetch control families on component mount
// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         const familyResponse = await fetchControlFamilies();
// // // //         // Assuming `familyResponse.data` contains the correct IDs
// // // //         setControlFamilies(familyResponse.data);
// // // //       } catch (err) {
// // // //         setError('Failed to fetch control families.');
// // // //       } finally {
// // // //         setLoadingFamilies(false);
// // // //       }
// // // //     };
// // // //     fetchData();
// // // //   }, []);

// // // //   // Fetch controls when selectedFamilyId changes
// // // //   useEffect(() => {
// // // //     const fetchControlData = async () => {
// // // //       if (selectedFamilyId) {
// // // //         setLoadingControls(true);
// // // //         try {
// // // //           const controlResponse = await fetchControls();
// // // //           setControls(controlResponse.data.filter(control => control.control_Family_Id._id === selectedFamilyId));
// // // //         } catch (err) {
// // // //           // setError('Failed to fetch controls.');
// // // //         } finally {
// // // //           setLoadingControls(false);
// // // //         }
// // // //       } else {
// // // //         setControls([]);
// // // //       }
// // // //     };
// // // //     fetchControlData();
// // // //   }, [selectedFamilyId]);

// // // //   // Fetch actions when selectedControlId changes
// // // //   useEffect(() => {
// // // //     const fetchActionData = async () => {
// // // //       if (selectedControlId) {
// // // //         setLoadingActions(true);
// // // //         try {
// // // //           const actionResponse = await fetchActions();
// // // //           setActions(actionResponse.data.filter(action => action.control_Id._id === selectedControlId));
// // // //         } catch (err) {
// // // //           setError('Failed to fetch actions.');
// // // //         } finally {
// // // //           setLoadingActions(false);
// // // //         }
// // // //       } else {
// // // //         setActions([]);
// // // //       }
// // // //     };
// // // //     fetchActionData();
// // // //   }, [selectedControlId]);

// // // //   // Handle changes in selected family
// // // //   const handleFamilyChange = (event) => {
// // // //     setSelectedFamilyId(event.target.value);
// // // //     setSelectedControlId(''); // Reset control selection when family changes
// // // //   };

// // // //   // Handle changes in selected control
// // // //   const handleControlChange = (event) => {
// // // //     setSelectedControlId(event.target.value);
// // // //   };

// // // //   return (
// // // //     <div className="new-page">
// // // //       <h1>DPDP Software</h1>
// // // //       <div className="dropdowns">
// // // //         <div className="dropdown">
// // // //           <label htmlFor="controlFamily">Control Family:</label>
// // // //           <select id="controlFamily" value={selectedFamilyId} onChange={handleFamilyChange}>
// // // //             <option value="">Select a Control Family</option>
// // // //             {controlFamilies.map(family => (
// // // //               <option key={family._id} value={family._id}>
// // // //                 {family.name}
// // // //               </option>
// // // //             ))}
// // // //           </select>
// // // //         </div>
// // // //         <div className="dropdown">
// // // //           <label htmlFor="control">Control:</label>
// // // //           <select id="control" value={selectedControlId} onChange={handleControlChange} disabled={!selectedFamilyId}>
// // // //             <option value="">Select a Control</option>
// // // //             {controls.map(control => (
// // // //               <option key={control._id} value={control._id}>
// // // //                 {control.name}
// // // //               </option>
// // // //             ))}
// // // //           </select>
// // // //         </div>
// // // //       </div>
// // // //       {error && <p className="error">{error}</p>}
// // // //       {loadingFamilies && <p>Loading control families...</p>}
// // // //       {loadingControls && selectedFamilyId && <p>Loading controls...</p>}
// // // //       {loadingActions && selectedControlId && <p>Loading actions...</p>}
// // // //       {!loadingActions && selectedControlId && (
// // // //         <div className="action-table">
// // // //           {/* <h3>List of Actions</h3> */}
// // // //           <table>
// // // //             <thead>
// // // //               <tr>
// // // //                 <th>Action ID</th>
// // // //                 <th>Action Name</th>
// // // //                 <th>Status</th>
// // // //                 <th>Upload</th>
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {actions.map(action => (
// // // //                 <tr key={action._id}>
// // // //                   <td>{action.action_Id}</td>
// // // //                   <td>{action.name}</td>
// // // //                   <td>
// // // //                     <select>
// // // //                       <option value="completed">Completed</option>
// // // //                       <option value="hold">Hold</option>
// // // //                       <option value="delegate">Delegate</option>
// // // //                       <option value="disable">Disable</option>
// // // //                     </select>
// // // //                   </td>
// // // //                   <td>
// // // //                     <button>Upload</button>
// // // //                   </td>
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default NewPage;
