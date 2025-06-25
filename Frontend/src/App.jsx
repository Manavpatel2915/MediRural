import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllMedicines from './components/AllMedicines.jsx';
import SingleMedicine from './components/singleMedicine.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import './App.css';
import { CartProvider } from './context/CartContext';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import UserLayout from './layout/UserLayout.jsx'; 
import AdminLayout from './layout/AdminLayout.jsx';
import SupplierLayout from './layout/SupplierLayout.jsx';
import Medicines from './components/adminComponents/Medicines.jsx';
import { useAuth } from './context/AuthContext';
import AddMedicine from './components/adminComponents/AddMedicine.jsx';
import UpdateMedicine from './components/adminComponents/UpdateMedicine.jsx';
import Inventory from './components/supplierComponets/Inventory.jsx';
import Orders from './components/supplierComponets/Orders.jsx';

// Placeholder components for supplier routes 


const Revenue = () => <div>Revenue Analytics - Coming Soon</div>;
const Stats = () => <div>Statistics Dashboard - Coming Soon</div>;

function App() {
  const { user, isAdmin, isSupplier } = useAuth();
  
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path='/' element={<UserLayout />}>
            <Route index element={<AllMedicines />} />
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
          </Route>
          
          <Route path='/supplier' element={isSupplier ? <SupplierLayout/> : <Login isSupplier={true}/>} >
            <Route index element={<div style={{padding: '2rem', textAlign: 'center'}}><h2>Welcome Supplier!</h2><p>Select an option from the menu.</p></div>} />
            <Route path='/supplier/inventory' element={<Inventory/>} />
            <Route path='/supplier/orders' element={<Orders />} />
            <Route path='/supplier/revenue' element={<Revenue/>} />
            <Route path='/supplier/stats' element={<Stats/>} />
          </Route> 
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
