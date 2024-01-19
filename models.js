//import library
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//mongodb schemas
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
    UserID: {type: Number},
    Name: {type: String, required: true},
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}] 
});

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) { //don't use (=>) when defining instance methods
    return bcrypt.compareSync(password, this.Password)
}

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

//define 'movie' & 'user' models
module.exports.Movie = Movie;
module.exports.User = User;