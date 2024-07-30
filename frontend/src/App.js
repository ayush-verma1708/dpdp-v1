import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import AddCompany from './pages/AddCompany';
import AssetList from './pages/asset/AssetsList';
import AddAsset from './pages/asset/AddAsset';
import CoverageList from './pages/coverage/CoverageList';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Header />
          <main className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-company" element={<AddCompany />} />
              <Route path='/assets' element={<AssetList />} />
              <Route path='/add-asset' element={<AddAsset />} />
              <Route path='/coverages' element={<CoverageList />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
