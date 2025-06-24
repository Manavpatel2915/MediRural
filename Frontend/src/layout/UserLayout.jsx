import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Box } from '@mui/material'
const UserLayout = () => {
  return (
    <div>
      <Box sx={{ minHeight: '100vh', backgroundColor: '#fafbfc' }}>
        <Navbar />
        <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
            <Outlet />
        </Box>
        <Footer />
      </Box>
    </div>
  )
}

export default UserLayout
