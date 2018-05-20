const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const darkSkyRoute = require('./api/routes/dark-sky');
const geocodeRoute = require('./api/routes/geocode');

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.use('/api/darkSky', darkSkyRoute);
app.use('/api/geocode', geocodeRoute);

// All remaining requests return the React app, so it can handle routing.
// app.get('*', (request, response) => {
// response.sendFile(path.resolve(__dirname, '../react-ui/build',
// 'index.html')); });

app.listen(PORT, () => {
  console.error(`Node server listening on port ${PORT}`);
});
