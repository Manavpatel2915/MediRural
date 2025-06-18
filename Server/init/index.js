const mongoose = require('mongoose');
const User = require('../models/UserModel.js');
const Medicine = require('../models/MedicineModel.js');
const userData = require('./UserData');
const medicineData = require('./MedicineData');
require('dotenv').config();

// Use default MongoDB URI if not defined in environment
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/medirural';

const initializeDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB successfully');

        // Clear existing data
        console.log('Clearing existing data...');
        await mongoose.connection.collection('users').deleteMany({});
        await mongoose.connection.collection('medicines').deleteMany({});
        console.log('Existing data cleared');

        // Insert user data
        console.log('Inserting user data...');
        const users = await User.insertMany(userData);
        console.log(`Successfully inserted ${users.length} users`);

        // Insert medicine data
        console.log('Inserting medicine data...');
        const medicines = await Medicine.insertMany(medicineData);
        console.log(`Successfully inserted ${medicines.length} medicines`);

        console.log('Database initialization completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error initializing database:', error.message);
        if (error.name === 'MongoServerSelectionError') {
            console.error('Could not connect to MongoDB. Please make sure MongoDB is running.');
        }
        process.exit(1);
    }
};

// Run the initialization
initializeDatabase();
