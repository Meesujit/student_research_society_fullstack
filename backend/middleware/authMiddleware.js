// const jwt = require('jsonwebtoken');
// require('dotenv').config();



// // Middleware to protect routes

// const protect = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1]; // Bearer token
//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token,process.env.JWT_SECRET);
//     req.user = decoded; // Attach the user info (id, role) to req.user
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// module.exports = { protect };



// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
//     req.user = decoded; // Attach decoded payload to req.user
//     next(); // Proceed to the next middleware or route
//   } catch (err) {
//     console.error('Token verification failed:', err.message);
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header (Bearer token)
  const token = req.header('Authorization')?.split(' ')[1]; // Token after "Bearer "
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user info to the request object (req.user)
    req.user = decoded; // For example, decoded contains { id, role }

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(401).json({ message: 'Token is not valid or expired' });
  }
};

module.exports = authMiddleware;
