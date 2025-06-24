const express = require('express');
const router = express.Router();
const Medicine = require('../models/MedicineModel');
const WrapAsync = require('../utility/WrapAsync');
const ExpressError = require('../utility/ExpressError');
const validate = require('../middlewares/validate');
const { medicineSchema } = require('../schema');

// Middleware to validate the medicine schema
const validateMedicine = (req, res, next) => {
  const { error } = medicineSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    return next(new ExpressError(400, msg));
  }
  next();
};

router.post(
  '/',
  validate(medicineSchema),
  WrapAsync(async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.json({ success: false, message: 'Unauthorized access' });
    }

    const medicine = new Medicine(req.body.medicine);
    await medicine.save();

    res.status(200).json({
      success: true,
      message: 'Medicine added successfully',
      medicine,
    });
  })
);

router.put(
  '/:id',
  validate(medicineSchema),
  WrapAsync(async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.json({ success: false, message: 'Unauthorized access' });
    }

    const { id } = req.params;
    const updatedMedicine = await Medicine.findByIdAndUpdate(id, req.body.medicine, { new: true });

    res.json({
      success: true,
      message: 'Medicine updated successfully',
      medicine: updatedMedicine,
    });
  })
);

router.delete(
  '/:id',
  WrapAsync(async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.json({ success: false, message: 'Unauthorized access' });
    }

    const { id } = req.params;
    await Medicine.findByIdAndDelete(id);

    res.json({ success: true, message: 'Medicine deleted successfully' });
  })
);

module.exports = router;
