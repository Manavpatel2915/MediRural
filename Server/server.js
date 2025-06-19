const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Medicine = require('./models/MedicineModel');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const medicineRoutes = require('./routes/medicineRoutes');

const auth = require('./middlewares/auth');
// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/medirural';
console.log('Attempting to connect to MongoDB at:', MONGODB_URI);

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB.');
        console.log('Database name:', mongoose.connection.name);
        
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    });


//routes definations
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Public route for getting all medicines
app.get('/api/medicines', async (req, res) => {
    try {
        const medicines = await Medicine.find({});
        res.json({
            success: true,
            medicines
        });
    } catch (error) {
        res.json({success: false, message: error.message});
    }
});
app.get('/api/medicines/:id', async (req, res)=>{
    try {
        const medicine = await Medicine.findById(req.params.id);    
        res.json({
            success: true,
            medicine
        });
    } catch (error) {
        res.json({success: false, message: error.message});
    }
})
// Protected medicine routes (for admin operations)
app.use('/api/medicines', auth, medicineRoutes);

// Home Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to MediRural API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});