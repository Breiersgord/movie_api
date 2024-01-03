const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    MovieID: {type: Number, required: true},
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        DOB: String,
        DOD: String,
        BIO: String
    },
    ImageURL: String,
    Featured: Boolean
});

let userSchema = mongoose.Schema({
    UserID: {type: Number, required: true},
    Name: {type: String, required: true},
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

let movie = mongoose.model('movie', movieSchema);
let user = mongoose.model('user', userSchema);

module.exports.movie = movie;
module.exports.user = user;