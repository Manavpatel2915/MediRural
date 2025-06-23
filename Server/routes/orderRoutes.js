const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel')
const WrapAsync = require('../utility/WrapAsync')
const ExpressError = require('../utility/ExpressError')


router.get('/', WrapAsync(async (req, res)=>{
    try {
        const orders = await Order.find({})
        res.status(200).json({success: true, orders})        
    } catch (error) {
        next(new ExpressError(400, "Invalid request"))
    }
}))

router.post('/', WrapAsync(async (req, res)=>{
    try {
        const res = new Order(req.body)
        await res.save()
        res.status(201).json({success: true, message: "Order created successfully"})
    } catch (error) {
        next(new ExpressError(400, "Invalid request"))
    }
}))

router.put('/:id', WrapAsync(async (req, res)=>{
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json({
            success: true,
            message : "order updated successfully"
        })
    } catch (error) {
        next(new ExpressError(400, "Invalid request"))
    }
}))

router.delete('/:id', WrapAsync(async (req, res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message : "order deleted successfully"
        })
    } catch (error) {
        next(new ExpressError(400, "Invalid request"))
    }
}))

module.exports = router;