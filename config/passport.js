
var LocalStrategy = require('passport-local').Strategy;
var Traders = require("../models/trader1.js");
var bcrypt = require('bcryptjs');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        Traders.findOne({_id: id}, function(error, dbUser) {
          done(error, dbUser);
        });
    });

    // Login
    passport.use(new LocalStrategy({
        usernameField: "email"
        }, function ( email, password, done) {

//         // Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
    // When a user tries to sign in this code runs
        Traders.findOne({email: email}, function(error, dbUser) {
          // Log any errors if the server encounters one
          if (error || !dbUser) {
            console.log(error);
            return done(null, false, {
              message: "Incorrect email."
            });
          }
          // Otherwise, send the result of this query to the browser
            // Need to validate password   
            console.log(dbUser);

            if (!dbUser.validPassword(password)) {
              return done(null, false, {
                message: "Incorrect password."
              });
            }

            return done(null, dbUser);
        });

    }));

    // Register
    // passport.use('local-register', new LocalStrategy({
    //     passReqToCallback: true
    // }, function (req, username, password, done) {
    //     findOrCreateUser = function () {
    //         // Find a user with this username
    //         User.findOne({username: username}, function (err, user) {
    //             if (err) {
    //                 console.log('Error: '+err);
    //                 return done(err);
    //             }
    //             // Check if user exists
    //             if (user) {
    //                 console.log('That user already exists');
    //                 return done(null, false, req.flash('message', 'User already exists'));
    //             } else {
    //                 var newUser = new User();

    //                 newUser.username = username;
    //                 newUser.password = createHash(password);
    //                 newUser.name = req.param('name');
    //                 newUser.email = req.param('email');
    //                 newUser.join_date = new Date();

    //                 // Add User
    //                 User.addUser(newUser, function (err, user) {
    //                     if (err) {
    //                         console.log('Error: '+err);
    //                         throw err;
    //                     } else {
    //                         req.flash('success', 'You are now registered and logged in');
    //                         return done(null, newUser);
    //                     }
    //                 });
    //             }
    //         });
    //     };
    //     process.nextTick(findOrCreateUser);
    // }));

    // var isValidPassword = function (user, password) {
    //     return bcrypt.compareSync(password, user.password);
    // }

    // var createHash = function (password) {
    //     return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    // }
}