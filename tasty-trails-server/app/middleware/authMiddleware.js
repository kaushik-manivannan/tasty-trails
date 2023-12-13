import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import * as responses from '../controllers/response-handler.js';


/**
 * Middleware to protect routes by verifying the JWT token in the request header.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the request header contains the authorization token and starts with 'Bearer'
  if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //add the decoded token value to request
      req.user = decoded;

      next();
    } catch (error) {
      res.status(401);
      responses.set401ErrorResponse(res, 'Not authorized');
    }
  }

  if (!token) {
    responses.set401ErrorResponse(res, 'Not authorized, no token')
  }
})
