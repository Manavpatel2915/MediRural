const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel');
const WrapAsync = require('../utility/WrapAsync');
const ExpressError = require('../utility/ExpressError');
const { body, validationResult } = require('express-validator');

//getting all the orders 
router.get('/', WrapAsync(async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json({ success: true, orders });
}));


//adding the order
router.post(
  '/',
  [
    body('shipping.name').notEmpty().withMessage('Name is required'),
    body('shipping.email').isEmail().withMessage('Valid email is required'),
    body('shipping.phone').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit phone is required'),
    body('shipping.address').notEmpty().withMessage('Address is required'),
    body('shipping.city').notEmpty().withMessage('City is required'),
    body('shipping.state').notEmpty().withMessage('State is required'),
    body('shipping.pincode').matches(/^[0-9]{6}$/).withMessage('Valid 6-digit pincode is required'),
    body('shipping.country').notEmpty().withMessage('Country is required'),
  ],
  WrapAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const order = new Order(req.body);
    await order.save();

    res.status(201).json({ success: true, message: "Order created successfully" });
  })
);

//updating the order
router.put('/:id', WrapAsync(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json({
    success: true,
    message: "order updated successfully",
  });
}));


//deleting the order
router.delete('/:id', WrapAsync(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "order deleted successfully",
  });
}));

module.exports = router;
