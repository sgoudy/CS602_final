/**
 * Shelby Goudy
 * CS 602_ Group 3
 * Final Project
 */

const workoutsDB = require('../../models/workouts.js');
const Workout = workoutsDB.getModel();

// display workout in detail

module.exports = async (req , res , next) => {

    // GET ONE Workout
    let workout;
    let user = req.session.user;

    // if no session data exists -- EXIT
    if (!user || user == null){
        res.format({
            'application/json': function() {
                res.status(401).json({
                    message: 'Please login.'
                })
            },

            'application/xml': function() {
                let resultXml = 
                    '<?xml version="1.0"?>\n<data>\n' +
                    '<status>401</status>\n'+
                    '<message>Please login.</message>\n'+
                    '</data>';
                res.type('application/xml');
                res.send(resultXml);
            }
        });
        return;
    }

    // if session data verified, find workout
    if (req.params.id){
        workout = await Workout.findOne({_id: req.params.id})

        // if workout found, send workout data
        if (workout){
        res.format({
            'application/json': function() {
                res.json(workout);
            },

            'application/xml': function() {
                let resultXml = 
                    '<?xml version="1.0"?>\n<data>\n' +
                        '<workout id="' + workout._id + '">\n' + 
                        '   <name>' + workout.name + '</name>\n' + 
                        '   <description>' + workout.description + '</description>\n' +
                        workout.users.map((user)=>{
                            return ( '<user>' + user + '</user>')})+
                            '</workout>\n' +'\n</data>\n'
                res.type('application/xml');
                res.send(resultXml);
            }
        });

        // if NO workout found, send reply -- EXIT
        } else {
            res.format({
                'application/json': function() {
                    res.status(404).json({
                        message: 'No workout found'
                    });
                },
        
                'application/xml': function() {
                    let resultXml = 
                        '<?xml version="1.0"?>\n<data>\n' +
                        '<status>404</status>\n'+
                        '<message>No workout found</message>\n'+
                        '</data>';
                    res.type('application/xml');
                    res.send(resultXml);
                }
            });
            return
        }
    }
};
