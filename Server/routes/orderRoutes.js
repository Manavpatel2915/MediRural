const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel')
const WrapAsync = require('../utility/WrapAsync')
const ExpressError = require('../utility/ExpressError')
const { body, validationResult } = require('express-validator');

router.get('/', WrapAsync(async (req, res)=>{
    try {
        const orders = await Order.find({})
        res.status(200).json({success: true, orders})        
    } catch (error) {
        next(new ExpressError(400, "Invalid request"))
    }
}))

router.post('/',
  // Validation middleware
  [
    body('shipping.name').notEmpty().withMessage('Name is required'),
    body('shipping.email').isEmail().withMessage('Valid email is required'),
    body('shipping.phone').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit phone is required'),
    body('shipping.address').notEmpty().withMessage('Address is required'),
    body('shipping.city').notEmpty().withMessage('City is required'),
    body('shipping.state').notEmpty().withMessage('State is required'),
    body('shipping.pincode').matches(/^[0-9]{6}$/).withMessage('Valid 6-digit pincode is required'),
    body('shipping.country').notEmpty().withMessage('Country is required'),
    // Add more validations as needed
  ],
  WrapAsync(async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      const order = new Order(req.body)
      await order.save()
      res.status(201).json({success: true, message: "Order created successfully"})
    } catch (error) {
      next(new ExpressError(400, "Invalid request"))
    }
  })
)

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