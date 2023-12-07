import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import * as responses from '../controllers/response-handler.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = decoded;

      next();
    } catch (error) {

      console.log(error);
      res.status(401);
      responses.set401ErrorResponse(res, 'Not authorized');
    }
  }

  if (!token) {
    responses.set401ErrorResponse(res, 'Not authorized, no token')
  }
})
