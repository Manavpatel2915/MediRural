import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllMedicines from './components/AllMedicines.jsx';
import SingleMedicine from './components/singleMedicine.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { Box } from '@mui/material';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Footer from './components/Footer.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Cart from './components/Cart.jsx';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Box sx={{ minHeight: '100vh', backgroundColor: '#fafbfc' }}>
            <Navbar />
            <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
              <Routes>
                <Route path="/" element={<AllMedicines />} />
                <Route path='/medicines' element={<AllMedicines />} />
                <Route path="/medicine/:id" element={<SingleMedicine />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Box>
          </Box>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
