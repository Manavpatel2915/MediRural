import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import UserMenu from '../UserMenu';
import { useAuth } from '../../context/AuthContext';

const SupplierNavbar = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isSupplier = user?.role === 'supplier';
    if(!isSupplier) return null;
    return (
        <div>
            <nav className='flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 bg-blue-600 text-white shadow-md '>
                <div className='flex items-center '>
                    <div className='hidden md:flex items-center space-x-4 lg:space-x-6 ml-4'>
                        
                    
                        <Link to={'/supplier/inventory'} className='text-white font-medium hover:text-blue-100'>Inventory</Link>
                        <Link to={'/supplier/orders'} className='text-white font-medium hover:text-blue-100'>Orders</Link>
                        <Link to={'/supplier/revenue'} className='text-white font-medium hover:text-blue-100'>Revenue</Link>
                        <Link to= {'/supplier/stats'} className='text-white font-medium hover:text-blue-100'>stats</Link>
                    </div>
                </div>
                <div className='flex items-center'>
                    <UserMenu />
                </div>
            </nav>
        </div>
    )
}

export default SupplierNavbar;

