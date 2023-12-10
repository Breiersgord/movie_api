const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

let movies = [
    {
        'title':'Honeydew',
        'director': 'Devereux Milburn'
    },
    {
        'title':'The Black Phone',
        'director':'Scott Derrickson'
    },
    {
        'title':'Get Out',
        'director':'Jordan Peele'
    },
    {
        'title':'Meander',
        'director':'Mathieu Turi'
    },
    {
        'title':'The Platform',
        'director':'Galder Gaztelu-Urrutia'
    },
    {
        'title':'Re-Cycle',
        'director':'The Pang Brothers'
    },
    {
        'title':'Queen of the Damned',
        'director':'Michael Rymer'
    },
    {
        'title':'31',
        'director':'Rob Zombie'
    },
    {
        'title':'The Lost Boys',
        'director':'Joel Schumacher'
    },
    {
        'title':'The Texas Chainsaw Massacre (2003)',
        'director':'Marcus Nispel '
    },
  ];

app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public')); //routes all requests for static files to their corresponding files within the 'public' folder on a server

app.use(bodyParser.json());

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
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});
app.get('/movies/:title', (req, res) => {
    //const title = req.params.title; this is the old way to write this command
    const { title } = req.params; //this is the new way to write this command
    const movie = movies.find( movie => movie.title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie')
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  // listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});