const Joi = require('joi');

const medicineSchema = Joi.object({
    medicine: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required().min(0),
        quantity: Joi.number().required().min(0),
        description: Joi.string().required(),
        image: Joi.string().uri().required(),
        category: Joi.string().required(),
    }).required()
});

module.exports.medicineSchema = medicineSchema;
