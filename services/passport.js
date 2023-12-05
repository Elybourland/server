// For oauth, npm install --save passport passport-google-oauth20
// Require 'passport' and 'passport-google-oauth20
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// GoogleStrategy is identified as 'google' - see get request below:
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            // we already have a record with the given profile id
          } else {
            // we don't have a user record with this is, make a new record
            new User({ googleId: profile.id }).save();
          }
        })
    }
  )
);