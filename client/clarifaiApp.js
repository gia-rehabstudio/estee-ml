const Clarifai = require('clarifai');

// const myApiKey = require('../secrets')

// instantiates a new Clarifai app using API key
const clarifaiApp = new Clarifai.App({
  apiKey: 'f7ca76c0a1c2401ea7168971e71c12eb'
});

module.exports = clarifaiApp;
