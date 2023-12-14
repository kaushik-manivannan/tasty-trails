
import GoogleStrategy from 'passport-google-oauth2';
import passport from 'passport';

// Configuring Passport to use Google OAuth2.0 strategy
passport.use(new GoogleStrategy({
    clientID:  '667246635703-lem5b8on251scfb07rbdcr86tbnd48to.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback: true,
    scope:["profile","email"],
  },
  
  // Callback function when Google authentication is successful
  function(request, accessToken, refreshToken, profile, done) {
    
      // Creating a simplified user object from Google profile data
      const user = {
        emailId: profile.email,
        fullName: profile.displayName,
        userName: profile.name.givenName, 
       
      };
      
    return done(null, user);
  }
));

// Exporting the configured Passport instance
export default passport;