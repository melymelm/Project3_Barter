var express = require("express");
var router = express.Router();
var path = require("path");

var FacebookStrategy = require("passport-facebook").Strategy;
var passport = require("passport");

var User = require("../models/User");