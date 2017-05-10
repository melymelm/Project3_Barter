// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    // res.json("/members");
    // res.json("/main");
    res.json("/search");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/join", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      res.json(err);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    // Add sequelize code to find all posts, and return them to the user with res.json
    db.Post.findAll({})
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    // Add sequelize code to find a single post where the id is equal to req.params.id,
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    })

  // return the result to the user with res.json
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
//     // Add sequelize code for creating a post using req.body,
      console.log(req.body);
    db.Post.create({
      firstName: req.body.name,
      lastName: req.body.address,
      businessName: req.body.business,
      zipCode: req.body.zip,
      phoneNumber: req.body.phone,
      email: req.body.email,
      password: req.body.password
    })
    // then return the result using res.json
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

//   // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    // Add sequelize code to delete a post where the id is equal to req.params.id, 
        db.Post.destroy({
      where: {
        id: req.params.id
      }
    })
//     // then return the result to the user using res.json
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

//   // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
//     // Add code here to update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
        db.Post.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

};