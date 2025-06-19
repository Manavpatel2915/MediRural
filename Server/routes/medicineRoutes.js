const express = require('express')
const router = express.Router()
const Medicine = require('../models/MedicineModel')


router.post('/', async (req, res)=>{
    try {
        if(req.user.role != 'admin'){
            return res.json({success:false, message:"Unauthorized access"})
        }
        const medicine = new Medicine(req.body)
        await medicine.save()
        res.json({success:true, message:"Medicine added successfully"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
})

router.put('/:id', async (req, res)=>{
    try {
        if(req.user.role != 'admin'){
            return res.json({success:false, message:"Unauthorized access"})
        }
        const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.json({success:true, message:"Medicine updated successfully", medicine})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        if(req.user.role != 'admin'){
            return res.json({success:false, message:"Unauthorized access"})
        }
        await Medicine.findByIdAndDelete(req.params.id)
    } catch (error) {
        res.json({success:false, message:error.message})        
    }
})

module.exports = router;