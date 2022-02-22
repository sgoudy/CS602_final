/**
 * Shelby Goudy
 * CS 602_ Group 3
 * Final Project
 */

 const workoutsDB = require('../../models/workouts.js');
 const Workout = workoutsDB.getModel();
 
 // display workouts
 
 module.exports = async (req , res , next) => {
 
    // verify session data && role = admin
    let user = req.session.user;

    if (user !== null && user.role === 'admin'){

        // pass in name and description
        let name = req.body.name;
        let description = req.body.description;
        
        // create workout
        let newWorkout = new Workout({
            name: name,
            description: description,
            users: []
        })

        // save workout to DB
        newWorkout.save((err)=>{

            // if error -- EXIT
            if(err){
                console.log("Error : %s ",err);
                return;
            }
        })
        
        // send response
        res.format({
            'application/json': function() {
                res.status(201).json({
                    message: 'Workout added'});
            },
    
            'application/xml': function() {
                let resultXml = 
                    '<?xml version="1.0"?>\n<data>\n' +
                    '<status>201</status>\n'+
                    '<message>Workout added</message></data>\n';
                res.type('application/xml');
                res.send(resultXml);
            }
        })
           
    // if customer or no session data, send response -- EXIT
    } else {
        res.format({
            'application/json': function() {
                res.status(500).json({
                    message: 'Sorry, an error occurred.'});
            },
            'application/xml': function() {
                let resultXml = 
                '<?xml version="1.0"?>\n<data>\n' +
                    '<status>500</status>\n' +
                    '<message>Sorry, an error occurred</message>\n'+
                    '</data>\n';
                res.type('application/xml');
                res.send(resultXml);
            }
        });
        return;
    }
 };
