const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
//register route 

router.post('/register', async (req, res)=>{
    try {
        const {email} = req.body ;
        const existingUser = User.find({email});

        
        if (existingUser) {
            return res.json({success:false , message:"User already exists, Try Logging in"})
        }
        const user = new User(req.body)
        await user.save()
        res.json({success:true , message:"User registered successfully"})
        
    } catch (error) {
        res.json({success:false, message:error.message})
    }
})

router.post('/login', async (req, res)=>{
    const {email , password} = req.body
    const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = user.comparePassword(password)

        if (!isMatch){
            return res.json({success:false, message:"Invalid credentials"})
        }
        const token = jwt.sign({id:user._id, email:user.email, role:user.role}, process.env.JWT_SECRET , {expiresIn: '7d'})
        res.json({
            success:true, 
            token,
            message:"Login successful",
        })
})











module.exports = router;