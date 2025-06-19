const jwt = require('jsonwebtoken')

const auth = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        next();
    } catch (error) {
        res.status(500).json({success: false, message: "Unauthorized access detected"})
    }
}

module.exports = auth;