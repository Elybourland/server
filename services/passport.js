// For oauth, npm install --save passport passport-google-oauth20
// Require 'passport' and 'passport-google-oauth20
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Grabs user from record and pulls out an id as an identifier
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Takes user.id identifier, and puts it back as user
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
});

// TODO: Try adding FacebookStrategy
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
            done(null, existingUser);
          } else {
            // we don't have a user record with this is, make a new record
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user));
          }
        });
    }
  )
);