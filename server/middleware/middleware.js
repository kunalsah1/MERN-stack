require('dotenv').config()
const jwt = require("jsonwebtoken");

const userVerification = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Authorization header is missing');
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,  process.env.SECRET_KEY);
    console.log('Decoded Token:', decodedToken);
    req.userData = { userId: decodedToken.userId };  
    next();
  } catch (error) {
    console.error('Error in userVerification middleware:', error);
    return res.status(401).json({ error: 'Token verification failed' });
  }
};


module.exports = userVerification;
