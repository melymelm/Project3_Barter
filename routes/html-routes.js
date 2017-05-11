// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {

    if (req.user) {

      res.redirect("/main");
    }
    res.sendFile(path.join(__dirname + "/../public/main.html"));
  });

  //login authentication for passport
  //  app.post("/api/login", passport.authenticate("local"), function(req, res) {
  //   // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  //   // So we're sending the user back the route to the members page because the redirect will happen on the front end
  //   // They won't get this or even be able to access this page if they aren't authed
  //   res.json("/search");
  // });

   // home route leading to main
  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  }); 


   // mainPage route loads mainPage.html
  app.get("/main", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });

  //join page
  app.get("/join", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/join.html"));
  });

  //reviews page
  app.get("/reviews", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/reviews.html"));
  });

  //login page
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/login.html"));
  });


  // searchPage route loads searchPage.html
  app.get("/search", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/search.html"));
  }); 


  // teamPage route loads teamPage.html)
  app.get("/team", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/team.html"));
  });  


    // yelp route 
  app.get("/yelp", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/yelp.html"));
  }); 

};

