const jwt = require('jsonwebtoken')

const auth = (req, res, next)=>{
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({success: false, message: "Unauthorized access detected"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next();
    } catch (error) {
        res.status(500).json({success: false, message: "Unauthorized access detected"})
    }
}

module.exports = auth;