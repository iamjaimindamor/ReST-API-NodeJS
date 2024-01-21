const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyToken = (req, res, next) => {

    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("403 Forbidden : Token is Required For Authentication");
    }
    try {

        const privatekey = process.env.ACCESS_TOKEN;
        const decoded = jwt.verify(token, privatekey);
        req.user = decoded;
        
    } catch (err) {
        res.status(401).send("Unauthorized/Invalid Token......");
    }
    return next();

}

module.exports = verifyToken;