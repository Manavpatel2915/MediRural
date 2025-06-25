import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
import Checkout from './components/Checkout.jsx';
import UserLayout from './layout/userLayout.jsx'; 
import AdminLayout from './layout/adminLayout.jsx';
import Medicines from './components/adminComponents/Medicines.jsx';
import { useAuth } from './context/AuthContext';
import AddMedicine from './components/adminComponents/AddMedicine.jsx';
import UpdateMedicine from './components/adminComponents/UpdateMedicine.jsx';
import Orders from './components/adminComponents/Orders.jsx'
function App() {

  const { user, isAdmin } = useAuth();
  
  return (
    
      <CartProvider>
        <Router>

          <Routes>
            <Route path='/' element={<UserLayout />}>
              <Route path="/" element={<AllMedicines />} />
                    <Route path='/medicines' element={<AllMedicines />} />
                    <Route path="/medicine/:id" element={<SingleMedicine />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path='/admin' element={isAdmin ? <AdminLayout/> : <Login isAdmin={true}/>} >
              <Route path='/admin/medicines' element={<Medicines/>} />
              <Route path='/admin/medicines/add' element={<AddMedicine/>} />
              <Route path='/admin/medicines/edit/:id' element={<UpdateMedicine/>} />
              <Route path='/admin/orders' element={<Orders/>} />
            </Route>
          </Routes>
            
        </Router>

      </CartProvider>
  );
}

export default App;
