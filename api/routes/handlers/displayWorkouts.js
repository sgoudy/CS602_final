/**
 * Shelby Goudy
 * CS 602_ Group 3
 * Final Project
 */

const workoutsDB = require('../../models/workouts.js');
const Workout = workoutsDB.getModel();

// display workouts

module.exports = async (req , res , next) => {

    // GET ALL workouts
    let workouts = await Workout.find({});
    let user = req.session.user;

    // if no session data -- EXIT
    if (!user || user == null){
        res.format({
            'application/json': function() {
                res.status(401).json({
                    message: 'Please login.'
                });
            },
    
            'application/xml': function() {
                let resultXml = 
                    '<?xml version="1.0"?>\n<data>\n' +
                    '<status>401</status>\n' +
                    '<message>Please login.</message>\n' + 
                    '</data>';
                res.type('application/xml');
                res.send(resultXml);
            }
        });
        return
    }

    // if NO workouts in db -- EXIT
    if (!workouts){
        res.format({
            'application/json': function() {
                res.status(404).json({
                    message: 'No workouts found.'
                });
            },
    
            'application/xml': function() {
                let resultXml = 
                    '<?xml version="1.0"?>\n<data>\n' +
                    '<status>404</status>\n'+
                    '<message>No workouts found.</message>\n'+
                    '</data>';
                res.type('application/xml');
                res.send(resultXml);
            }
        });
        return
    } 

    // if session data exists, show workouts
    res.format({
        'application/json': function() {
            res.json({
                user_role: user.role,
                user_history: user.history,
                data: workouts
            });
        },

        'application/xml': function() {
            let resultXml = 
                '<?xml version="1.0"?>\n<data>\n' +
                '<role>'+user.role+'</role>'+
                user.history.map((workout)=>{
                    return (
                        '<history id="' + workout._id + '">\n' + 
                        '   <name>' + workout.name + '</name>\n' + 
                        '   <date>' + workout.date +'</date>\n' + 
                        '   <notes>' + workout.notes +'</notes>\n'
                        )}).join('\n')+'\n</history>\n'+
                workouts.map((workout)=>{
                    return (
                        '<workout id="' + workout._id + '">\n' + 
                        '   <name>' + workout.name + '</name>\n' + 
                        '   <description>' + workout.description +'</description>\n' + 
                        workout.users.map((user)=>{
                            return (
                                '<user>' + user + '</user>'
                            )
                        })+
                        '</workout>\n'
                )}).join('\n')+'\n</data>\n'
            res.type('application/xml');
            res.send(resultXml);
        }
    });
};