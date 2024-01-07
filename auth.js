const jwtSECRET = 'your_jwt_secret'; //this has to be the same key used in the JWTStrategy

const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport'); //your local passport file

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, //this is the username you're encoding in the JWT
        expiresIn: '7d', //this specifies that the token will expire in 7 days
        algorithm: 'HS256' //this is the algorithm used to  'sign' or encode the values of the JWT
    });
}

/*POST login. */
module.exports = (router) =>{
    router.post('/login', (req, res) => {
        passport.authenticate('local', {session: false},
        (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'something is not right',
                    user: user
                });
            }
            req.login(user, {session: false}, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({user,token});
            });
        })(req, res);
    })
}

/* Notes */
/*
module.exports: whatever you assign module.exports to is what's exported from your module (in this case: 'router').
router: a map and all logic required to map '/login' (along with right callbacks, etc).
'local': LocalStrategy that checks that the UN and PW in the request exist in the DB
19-24: if login authentication fails b/c there is an error or bad user, error message 400 'something is not right' will throw. 
||: logical OR operator - returns the boolean value true if EITHER/OR both operands is true and returns false otherwise.
!: 'bang' the logical NOT operator - in front of a boolean value it will reverse the value, returning the OPPOSITE.
27-32: if there is an error logging in, throw error, otherwise a token will generate that allows the user to stay logged in per the generate.JWTToken requirements

({user,token}) is shorthand for ({user: user, token: token}) b/c the keys and values have the same name
*/