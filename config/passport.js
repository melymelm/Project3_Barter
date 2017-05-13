
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

        // Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
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
            console.log(dbUser);

            if (!dbUser.validPassword(password)) {
              return done(null, false, {
                message: "Incorrect password."
              });
            }

            return done(null, dbUser);
        });

    }));
}