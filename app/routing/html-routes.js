var path = require('path');

// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      // res.redirect("/members");
      res.redirect("/mainPage");
    }
    res.sendFile(path.join(__dirname + "/../public/main.html"));
    // res.sendFile(path.join(__dirname, "../public/mainPage.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      // res.redirect("/members");
      res.redirect("/mainPage");
    }
    // res.sendFile(path.join(__dirname + "/../public/login.html"));
    res.sendFile(path.join(__dirname, "/../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/main", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/main.html"));
  });

  // searchPage route loads searchPage.html
  app.get("/search", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/search.html"));
  });

  // mainPage route loads mainPage.html
  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });

  // teamPage route loads teamPage.html)
  app.get("/team", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/team.html"));
  });  


  // neighborhoodPage route loads neighborhoodPage.html)
  // app.get("/neighborhoodPage", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/neighborhoodPage.html"));
  // });


  // mainPage route loads mainPage.html
  // app.get("/mainPage", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/mainPage.html"));
  // });

  // teamPage route loads teamPage.html)
  // app.get("/teamPage", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/teamPage.html"));
  // });  


  // neighborhoodPage route loads neighborhoodPage.html)
  // app.get("/neighborhoodPage", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/neighborhoodPage.html"));
  // });

  //results pages that redirects users to the search page they chose and loads results of query
    app.get("/breweries", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/breweryResults.html"));
  });

    app.get("/events", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/eventsResults.html"));
  });
// I added a line and then erased it - ML
    app.get("/grocery", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/groceryResults.html"));
  });


    app.get("/gyms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/gymResults.html"));
  });


    app.get("/restaurants", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/restaurantsResults.html"));
  });


    app.get("/parks", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/parksResults.html"));
  });


    app.get("/shopping", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/shoppingResults.html"));
  });


    app.get("/schools", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/schoolResults.html"));
  });
};
