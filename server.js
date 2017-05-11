
// Dependencies
var express = require("express");
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');
var mongoose = require('mongoose');
var path = require('path');
var passportLocalMongoose = require('passport-local-mongoose');
// TRIPP
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');


var routes = require('./routes/index');
var users = require('./routes/users');

// Initialize Express
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'barter',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});



app.use('/', routes);
app.use('/users', users);

// END TRIPP
// END TRIPP
// END TRIPP
// END TRIPP

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Require our userModel model
var Traders = require("./models/trader1.js");
// var Trader = mongoose.model('Trader');

require('./config/passport')(passport);

// Use morgan with our app
app.use(logger("dev"));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);

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

app.post("/api/signup", function(req, res) {
  console.log(req.body);

  var user = new Traders(req.body);
  console.log('new trader: ' + JSON.stringify(user));


/* OUR CUSTOM METHODS
 * (methods created in the userModel.js)
 * -/-/-/-/-/-/-/-/-/ */

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

  res.send(main.html);

  
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
app.get('/categories/:category', function (req, res) {

  console.log(req.params);
// var category =
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
// categories should be an array of the specialties offered in our db

// figure out how to send the info back to the front end

// might be best to go with handlebars



  // res.send("Hit categories route"); 

})

// here get the category the user clicks on, music, food, sports, coding, education, etc...in the request parameter. and then make the mongo call.
app.get('/api/categories', function (req, res) {

  console.log(req.params);
// var category =
// make the mongo query/call to fina all users that have that category that the user is searching for.
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
app.listen(process.env.PORT || 5000);