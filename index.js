const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

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

app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public')); //routes all requests for static files to their corresponding files within the 'public' folder on a server

  // GET requests
  
//app.get('/documentation.html', (req, res)=>{
    //res.sendFile('public/documentation.html', {root: __dirname});
//});

app.get('/', (req, res) => {
    res.send('default text response'); //sends a response of various types
});
  
app.get('/movies', (req, res) => {
    res.json(topTenHorrorMovies); //sends a JSON response
});
  
  // listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});