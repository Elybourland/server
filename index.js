const express = require('express');
// For oauth, npm install --save passport passport-google-oauth20
// Require 'passport' and 'passport-google-oauth20
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

// GoogleStrategy is identified as 'google' - see get request below:
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile', profile);
    }
  )
);

app.get(
  '/auth/google', 
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/', (req, res) => {
  res.send({
    hi: 'there'
  })
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// localhost:5000
// Using render.com:
// Reference: https://www.udemy.com/course/node-with-react-fullstack-web-development/learn/lecture/39244222#overview
// https://express-server-9v0a.onrender.com

// Setting up deployment:

// 1. Dynamically figure out which port to use:
// const PORT = process.env.PORT || 5000;
// app.listen(PORT);

// 2. Specify which node and npm version is package.json
// Add this line after "main" (Use your current version: node -v and npm -v)
// "engines": {
//   "node": "17.3.0",
//   "npm": "8.3.0"
// },

// 3. Specify start script in package.json
// "scripts": {
//   "start": "node index.js"
// },

// 4. Create .gitignore file:
// In command line: type nul > .gitignore (or touch .gitignore for MAC)