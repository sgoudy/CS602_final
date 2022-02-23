/**
 * Shelby Goudy
 * CS 602_ Group 3
 * Final Project
 */

var express = require('express');
var router = express.Router();

// DB queries
var login = require("./handlers/login")
var logout = require("./handlers/logout")

var displayWorkouts = require("./handlers/displayWorkouts");
var editUser = require("./handlers/editUserHistory");

var addWorkout = require("./handlers/addWorkout");
var deleteWorkout 	= require("./handlers/deleteWorkout");
var editWorkout = require("./handlers/editWorkout");

var searchWorkouts = require("./handlers/searchWorkouts")
var searchUsers = require("./handlers/searchUsers.js")

// Routes
router.post('/api/login', login);
router.get('/api/logout', logout);

// admin and user routes
router.get('/api/workouts', displayWorkouts); 
router.put('/api/user/edit/:id', editUser)

// admin only routes
router.post('/api/workouts/add', addWorkout);
router.delete('/api/workout/delete/:id', deleteWorkout)
router.put('/api/workout/edit/:id', editWorkout);

// search workouts 
router.get('/api/workouts/:name', searchWorkouts)

// search users
router.get('/api/users/:id', searchUsers)


module.exports = router;