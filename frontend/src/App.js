import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import AddCompany from './pages/AddCompany';
import Dashboard from './pages/Dashboard';
import UserCreation from './pages/UserCreation';
import Login from './pages/Login';
import AssetManagement from './pages/AssetManagement';
import ListOfActions from './pages/ListOfActions';
import AlertManagement from './pages/AlertManagement';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setAuthToken(token);
  }, []);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {authToken && <Sidebar />}
        <div className="flex flex-col flex-grow">
          {authToken && <Header handleLogout={handleLogout} />}
          <main className="flex-grow p-4">
            <Routes>
              <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/add-company" element={<PrivateRoute><AddCompany /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/user-creation" element={<PrivateRoute><UserCreation /></PrivateRoute>} />
              <Route path="/asset-management" element={<PrivateRoute><AssetManagement /></PrivateRoute>} />
              <Route path="/list-of-actions" element={<PrivateRoute><ListOfActions /></PrivateRoute>} />
              <Route path="/alert-management" element={<PrivateRoute><AlertManagement /></PrivateRoute>} />
            </Routes>
          </main>
          {authToken && <Footer />}
        </div>
      </div>
    </Router>
  );
};

export default App;

