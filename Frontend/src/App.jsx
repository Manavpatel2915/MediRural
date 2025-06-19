import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllMedicines from './components/AllMedicines.jsx';
import SingleMedicine from './components/singleMedicine.jsx';
import Navbar from './components/Navbar.jsx';
import { Box } from '@mui/material';
import './App.css';

function App() {

  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return (
    <Router>
      <Box sx={{ minHeight: '100vh', backgroundColor: '#fafbfc' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllMedicines />} />
          <Route path='/medicines' element={<AllMedicines />} />
          <Route path="/medicine/:id" element={<SingleMedicine />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
