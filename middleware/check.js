const jwt = require('jsonwebtoken');
require('dotenv').config();
const userController = require(`../controllers/userController`);

const readToken = (req, res, next) => {

   
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];
    
    if (!token) {
        return res.status(403).send("403 Forbidden : Token is Required For Authentication");
    }
    
    try {

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
        const accessRole = decoded.auth;
        console.log(accessRole)

       if(accessRole==="read"){
        console.log("READ ACCESS GRANTED");    
        }
        else if(accessRole==="write"){
           throw err
        }
    }
    catch(err){
        res.status(401).send("Unauthorized/Invalid Token......");
    }
    return next();

}

module.exports = readToken;