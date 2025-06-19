import React from 'react';
import AllMedicines from './components/AllMedicines.jsx';
import Navbar from './components/Navbar.jsx';
import { Box } from '@mui/material';
import './App.css';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          py: 3,
          mt: 2, 
          width: '100%'
        }}
      >
        <AllMedicines />
      </Box>
    </Box>
  );
}

export default App;
