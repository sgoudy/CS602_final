/**
 * Shelby Goudy
 * CS 602_ Group 3
 * Final Project
 */

 const mongoose = require('mongoose');
 const bcrypt = require('bcryptjs');

 const credentials = require("../.credentials.js");
 
 // Mongo Atlas
 const dbUrl = 'mongodb+srv://' + credentials.username +
     ':' + credentials.password + '@' + credentials.host + '/' + credentials.database;
 
 let connection = null;
 let model = null;
 
 let Schema = mongoose.Schema;
 
 // User Schema
 let userSchema = new Schema({
     username: String,
     password: String,
     history: [{
         name: String, 
         date: String,
         notes: String
     }],
     role: String
 }, {
     collection: 'users'
 });
 
// password encryption on DB init
 userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  // function to check password via bcrypt
  userSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };  


 module.exports = {	
     getModel: () => {
         if (connection == null) {
             console.log("Creating connection and user model...");
             connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
             model = connection.model("userModel", 
                             userSchema);
         };
         return model;
     }
 };