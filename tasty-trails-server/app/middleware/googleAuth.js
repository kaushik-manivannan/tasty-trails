
import GoogleStrategy from 'passport-google-oauth2';
import passport from 'passport';

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
      return done(null, profile);
    // });
  }
));


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;