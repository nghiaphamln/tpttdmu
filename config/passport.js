var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.model');
var configAuth = require('../config/auth');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({

            // pull in our app id and secret from our auth.js file
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL

        },

        // facebook will send back the token and profile
        (token, refreshToken, profile, done) => {
            // asynchronous
            process.nextTick(() => {
                // find the user in the database based on their facebook id
                User.findOne({
                    'facebook.id': profile.id
                }, (err, user) => {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser = new User();

                        // set all of the facebook information in our user model
                        newUser.facebook.id = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.name = profile.displayName; // look at the passport user profile to see how names are returned

                        // save our user to the database
                        newUser.save((err) => {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            });

        }));




    // SIGNUP LOCAL    
    passport.use('local-signup', new LocalStrategy({
            fullnameField: 'name',
            emailField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        

        function (req, email, password, done) {
            process.nextTick(function () {
                User.findOne({'local.email': email}, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        var newUser = new User();
                        newUser.local.fullname = req.body.name;
                        newUser.local.email = req.body.email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));

}