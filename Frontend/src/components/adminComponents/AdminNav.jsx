import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import UserMenu from '../UserMenu';
const AdminNav = () => {

  const navigate = useNavigate();
  return (
    <div>
      <nav className='flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 bg-blue-600 text-white shadow-md '>
        <div className='flex items-center '>
            {/* desktop links */}
            <div className='hidden md:flex items-center space-x-4 lg:space-x-6 ml-4'>
              <Link to={'/admin/medicines'} className='text-white font-medium hover:text-blue-100'>Medicines</Link>
              <Link to={'/admin/orders'} className='text-white font-medium hover:text-blue-100'>Orders</Link>
              <Link to={'/admin/users'} className='text-white font-medium hover:text-blue-100'>Users</Link>
            </div>
            
        </div>
        <div className='absolute left-1/2 -translate-x-1/2'>
              <span onClick={()=>navigate('/admin')} className='text-xl font-bold cursor-pointer'>AdminPanel</span>
        </div>

        <div className='flex items-center'>
          <UserMenu />
        </div>

      </nav>
      
      </div>
  )
}

export default AdminNav
