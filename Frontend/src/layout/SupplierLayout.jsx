import React from 'react'
import { Outlet } from 'react-router-dom'
import SupplierNavbar from '../components/supplierComponets/supplierNavbar'
import { Box } from '@mui/material'
import Footer from '../components/Footer'

const SupplierLayout = () => {
    return (
        <div>
            <SupplierNavbar />
            
                <Outlet />
           
            <Footer />
        </div>
    )
}

export default SupplierLayout;