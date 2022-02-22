/**
 * Shelby Goudy
 * CS 602_ Group 3
 * Final Project
 */

const mongoose = require('mongoose');

const credentials = require("../.credentials.js");

// Modified for local machine
const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

// Step 1. Fill in the schema definition
let workoutsSchema = new Schema({
	name: String,
    description: String,
    users: [{
        'user_id': String,
        'date': String
    }]
}, {
// Step 2. For collection, replace lastName below with your lastName 
	collection: 'workouts'
});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and workout model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("workoutsModel", 
							workoutsSchema);
		};
		return model;
	}
};