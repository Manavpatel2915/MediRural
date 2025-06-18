const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Medicine name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    manufacturer: {
        type: String,
        required: [true, 'Manufacturer name is required'],
        trim: true
    },
    expiryDate: {
        type: Date,
        required: [true, 'Expiry date is required']
    },
    prescriptionRequired: {
        type: Boolean,
        default: false
    },
    imageUrl: {
        type: String,
        default: 'default-medicine.jpg'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // Order tracking
    orders: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        quantity: Number,
        orderDate: Date,
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
            default: 'pending'
        },
        isSubscription: {
            type: Boolean,
            default: false
        },
        subscriptionDetails: {
            frequency: {
                type: String,
                enum: ['15-day', 'monthly']
            },
            nextDeliveryDate: Date
        }
    }]
}, {
    timestamps: true
});

// Index for faster searches
medicineSchema.index({ name: 'text', category: 'text', manufacturer: 'text' });

// Method to check if medicine is in stock
medicineSchema.methods.isInStock = function() {
    return this.stock > 0;
};

// Method to check if medicine is expired
medicineSchema.methods.isExpired = function() {
    return new Date() > this.expiryDate;
};

// Method to add order
medicineSchema.methods.addOrder = async function(userId, quantity, isSubscription = false, subscriptionDetails = null) {
    if (this.stock < quantity) {
        throw new Error('Insufficient stock');
    }

    this.orders.push({
        user: userId,
        quantity,
        orderDate: new Date(),
        isSubscription,
        subscriptionDetails
    });

    this.stock -= quantity;
    return this.save();
};

// Method to cancel order
medicineSchema.methods.cancelOrder = async function(orderId) {
    const order = this.orders.id(orderId);
    if (!order) {
        throw new Error('Order not found');
    }

    if (order.status === 'delivered') {
        throw new Error('Cannot cancel delivered order');
    }

    order.status = 'cancelled';
    this.stock += order.quantity;
    return this.save();
};

// Static method to find medicines by category
medicineSchema.statics.findByCategory = function(category) {
    return this.find({ category, isActive: true });
};

// Static method to find medicines that need prescription
medicineSchema.statics.findPrescriptionRequired = function() {
    return this.find({ prescriptionRequired: true, isActive: true });
};

// Static method to find user's orders
medicineSchema.statics.findUserOrders = function(userId) {
    return this.find({
        'orders.user': userId
    }).select('name orders');
};

// Create and export the model
const Medicine = mongoose.model('Medicine', medicineSchema);

// Export the model directly
module.exports = Medicine; 

