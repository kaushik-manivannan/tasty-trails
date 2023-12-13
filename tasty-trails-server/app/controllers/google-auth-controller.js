import passport from 'passport';
import { generateAuthToken, createUser } from '../services/user-service.js';


/**
 * Callback function for Google authentication.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
export const googleCallback = (req, res, next) => {
    passport.authenticate('google', async (err, user) => {
    
      // Handle authentication errors or if the user is not present
      if (err || !user) {
        return res.redirect('/users/login/failed');
      }

      
      // Create a user or retrieve existing user and get the result
      const result = await createUser(user);
      let token ;

      //if the user is an existing user generate token
      if(result.error) {
        token = generateAuthToken(result.user);
      }
      else {
        token = result.token;
      }
  
      res.redirect(`http://localhost:3000/google/oauth/success?userId=${result.user._id}&val=${token}`);
    })(req, res, next);
  };


export const initiateGoogleAuth = (req, res, next) => {

    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);

};