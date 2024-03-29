const express = require('express');
const mongoose = require('mongoose');
// TODO: Try using express-session instead of cookie-session
const cookieSession = require('cookie-session');
const passport = require('passport');

// npm install --save body-parser, and require it
const bodyParser = require('body-parser');
const keys = require('./config/keys');
// Need to declare models first before using passport
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
// Make use of cookies with passport and cookie-session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

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