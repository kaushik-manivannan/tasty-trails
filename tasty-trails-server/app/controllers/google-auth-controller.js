import passport from 'passport';
import * as responses from "./response-handler.js";
import { generateAuthToken, createUser } from '../services/user-service.js';

// export const googleCallback = passport.authenticate('google', {
//     successRedirect: 'http://localhost:3000/',
//     failureRedirect: '/users/login/failed',
// });


export const googleCallback = (req, res, next) => {
    passport.authenticate('google', async (err, user) => {
      if (err || !user) {
        return res.redirect('/users/login/failed');
      }

      console.log('inside google callback');
      console.log(user);
      
      const result = await createUser(user);
      let token ;

      if(result.error) {
        token = generateAuthToken(result.user);
      }
      else {
        token = result.token;
      }
  
      res.cookie('userId', result.user._id, { httpOnly: true });
      res.cookie('authToken', token, { httpOnly: true });
      console.log('response'+res);
      res.redirect(`http://localhost:3000/google/oauth/success?userId=${result.user._id}&val=${token}`);
    })(req, res, next);
  };


export const initiateGoogleAuth = (req, res, next) => {

    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);

};