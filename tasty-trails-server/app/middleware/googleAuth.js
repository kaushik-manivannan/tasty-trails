
import GoogleStrategy from 'passport-google-oauth2';
import passport from 'passport';
import User from '../models/user.js';

console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET);


passport.use(new GoogleStrategy({
    clientID:  '667246635703-lem5b8on251scfb07rbdcr86tbnd48to.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback: true,
    scope:["profile","email"],
  },
  
  function(request, accessToken, refreshToken, profile, done) {
    console.log("in google user function");
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      console.log(profile);

      const user = {
        emailId: profile.email,
        fullName: profile.displayName,
        userName: profile.name.givenName, // You can adjust this based on your requirements
        image: profile.picture,
        // Add other fields as needed
      };
      
      return done(null, user);
    // });
  }
));


export default passport;