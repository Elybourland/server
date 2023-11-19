const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there'});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);

// localhost:5000

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