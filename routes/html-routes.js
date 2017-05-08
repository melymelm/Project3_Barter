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

  // login route loads login.html)
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });  

  //join page
  app.get("/join", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/join.html"));

  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/mainPage", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/mainPage.html"));
  });

  // searchPage route loads searchPage.html
  app.get("/search", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/search.html"));
  });

  // mainPage route loads mainPage.html
  app.get("/main", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });

  // login route loads login.html)
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });  

  // teamPage route loads teamPage.html)
  app.get("/team", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/team.html"));
  });  

};
