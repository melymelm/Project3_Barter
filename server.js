
// Dependencies
var express = require("express");
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require("express-session");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var mongoose = require('mongoose');
var path = require('path');
var isAuthenticated = require("./config/middleware/isAuthenticated");


// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Require our userModel model
var Traders = require("./models/trader1.js");

require('./config/passport')(passport);


// Initialize Express
var app = express();

// Use morgan with our app
app.use(logger("dev"));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport init
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Routes
require("./routes/html-routes.js")(app);

// Set up a static folder (public) for our web app
app.use(express.static("public"));

//MongoDB Config
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/barter');
var db = mongoose.connection;

// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "barter";
var collections = ["traders"];

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.")
});

// Routes
// ======

app.post('/api/login', 
  passport.authenticate('local'), //, { failureRedirect: '/api/login' }),
  function(req, res) {
    console.log('logged in');
    res.json({'message': 'login successful'})
    //res.redirect('/search');
  });

app.post("/api/signup", function(req, res) {
  console.log(req.body);

  var user = new Traders(req.body);
  console.log('new trader: ' + JSON.stringify(user));

  // Custom Methods
  // Call the "getFullName" method from the user Model
  user.getFullName();

  // Call the "lastUpdatedDate" method from the user Model
  user.lastUpdatedDate();

// END OF CUSTOM METHODS
// =====================
// NORMAL METHOD BELOW

  // save a user to our mongoDB
  user.save(function(error, doc) {
    // send an error to the browser
    if (error) {
      console.log('user save error: ' + error);
      res.send(error);
    }
    // or send the doc to our browser
    else {
      res.send(doc);
    }
  });
});


// Routes
// 1. At the root path, send a simple hello world message to the browser
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/main.html"));
});

// 2. At the "/all" path, display every entry in the barter collection
app.get("/all", function(req, res) {
  // Query: In our database, go to the barter collection, then "find" everything
  Traders.find({}, function(error, dataFound) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(dataFound);
    }
  });
});


// here get the category the user clicks on, music, food, sports, coding, education, etc...in the request parameter. and then make the mongo call.
app.get('/categories/:category', isAuthenticated, function (req, res) {

  console.log(req.params);
  console.log(req.user)
// make the mongo query/call to fina all users that have that category that the user is searching for.
  Traders.find(req.params, function(error, dataFound) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(dataFound);
    }
  }); 
})

// here get the category the user clicks on, music, food, sports, coding, education, etc...in the request parameter. and then make the mongo call.
app.get('/api/categories', function (req, res) {

  console.log(req.params);

// make the mongo query/call to find all users that have that category that the user is searching for.
  var dataFound = [{
        name: "music",
        title: "Music Lessons (EX: Guitar, Piano)"
      },
      {
        name: "landscaping",
        title: "Gardening"
      },
      {  
        name: "cooking",
        title: "Baking / Cooking"
      },
      {
        name: "computers",
        title: "Coding / UI Design" 
      },
      {
        name: "repairs",
        title: "Build / Constructing"
      },
      {
       name: "sports",
       title: "Sports Lessons (EX: Tennis, Golf)"
      }
      ];
  res.json(dataFound); 

});

// Grab a trader by it's ObjectId
app.get("/traders/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Traders.findOne({ "_id": req.params.id })
  // ..and populate all of the notes associated with it
  .populate("note")
  // now, execute our query
  .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

// Set the app to listen on port 5000
app.listen(process.env.PORT || 5000)

