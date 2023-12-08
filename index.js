const express = require('express');
const app = express();

let topTenHorrorMovies = [
    {
        title: 'Honeydew',
        director: 'Devereux Milburn'
    },
    {
        title: 'The Black Phone',
        director: 'Scott Derrickson'
    },
    {
        title: 'Get Out',
        director: 'Jordan Peele'
    },
    {
        title: 'Meander',
        director: 'Mathieu Turi'
    },
    {
        title: 'The Platform',
        director: 'Galder Gaztelu-Urrutia'
    },
    {
        title: 'Re-Cycle',
        director: 'The Pang Brothers'
    },
    {
        title: 'Queen of the Damned',
        director: 'Michael Rymer'
    },
    {
        title: '31',
        director: 'Rob Zombie'
    },
    {
        title: 'The Lost Boys',
        director: 'Joel Schumacher'
    },
    {
        title: 'The Texas Chainsaw Massacre (2003)',
        director: 'Marcus Nispel '
    },
  ];

  // GET requests
app.get('/', (req, res) => {
    res.send('default text response'); //sends a response of various types
  });
  
  //app.get('/documentation', (req, res) => {                  
    //res.sendFile('public/documentation.html', { root: __dirname }); //sends an HTML file to the browser
  //});
  
  app.get('/movies', (req, res) => {
    res.json(topTenHorrorMovies); //sends a JSON response
  });
  
  
  // listen for requests
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });