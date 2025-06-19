const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel')



router.get('/', async (req, res)=>{
    try {
        const orders = await Order.find({})
        res.status(200).json({success: true, orders})        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/', async (req, res)=>{
    try {
        const res = new Order(req.body)
        await res.save()
        res.status(201).json({success: true, message: "Order created successfully"})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
})

router.put('/:id', async (req, res)=>{
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json({
            success: true,
            message : "order updated successfully"
        })
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message : "order deleted successfully"
        })
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
})

module.exports = router;