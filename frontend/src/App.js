import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import AddCompany from './pages/AddCompany';
import Home from './pages/Home';

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
              <Route path="/" element={<Home />} />
              <Route path="/add-company" element={<AddCompany />} />
            </Routes>
          </main>
          {authToken && <Footer />}
        </div>
      </div>
    </Router>
  );
};

export default App;

