const bcrypt = require('bcryptjs');

// Create admin user with hashed password
const adminPassword = bcrypt.hashSync("lambu@123", 10);

const userData = [
    // Admin user
    {
        name: "prince patel",
        email: "princepatel@medirural.com",
        password: adminPassword,
        phone: "9876543210",
        address: {
            street: "Admin Office",
            city: "surat",
            state: "gujarat",
            pincode: "395001"
        },
        role: "admin"
    }
];

module.exports = userData; 