/* Shelby Goudy
** CS 602_ Group 3
** Final Project
*/

const workoutsDB = require('../../models/workouts.js');
const Workout = workoutsDB.getModel();

const usersDB = require('../../models/users.js');
const User = usersDB.getModel();

// Edit workout

module.exports = async (req , res , next) => {
  
    let id = req.params.id;
    let user = req.session.user;

    // User session data found
    if (user !== null){

        // find workout in db
        Workout.findById(id,  (err, workout) => {
            
            // Unknown error -- EXIT
            if(err){
            console.log("Error Selecting : %s ", err); 
            return
            }

            // Workout not found -- EXIT
            if (!workout){
                res.format({
                    'application/json': () => {
                        res.status(201).json({
                            message: 'Workout not found.'
                        });
                    },

                    'application/xml': () => {
                        let workoutXml = 
                        '<?xml version="1.0"?>\n<data>\n' +
                            'Workout not found.</data>';
                        res.type('application/xml');
                        res.send(workoutXml);
                    },
                });
                return;

            // Workout found
            } else {
                User.findById(user._id, (err, user)=>{

                    // unknown error -- EXIT
                    if(err){
                    console.log("Error Selecting : %s ", err); 
                    return;
                    }

                    // User not found -- EXIT
                    if (!user){
                        res.format({
                            'application/json': () => {
                                res.status(201).json({
                                    message: 'User not found.'
                                });
                            },
            
                            'application/xml': () => {
                                let workoutXml = 
                                '<?xml version="1.0"?>\n<data>\n' +
                                    'User not found.</data>';
                                res.type('application/xml');
                                res.send(workoutXml);
                            },
                        });
                        return

                    // User found
                    } else {
                        // date time converter from 'https://www.toptal.com/software/definitive-guide-to-datetime-manipulation'
                        const currentDate = new Date();

                        const currentDayOfMonth = currentDate.getDate();
                        const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
                        const currentYear = currentDate.getFullYear();

                        const dateString = (currentMonth + 1) + "/" + currentDayOfMonth +  "/" + currentYear;
                        
                        // update User DB with workout info
                        let workoutData = {
                            'name': workout.name, 
                            'date': dateString,
                            'notes': req.body.notes // take from form data
                        };
                        
                        // update Workout DB with user info
                        let userData = {
                            'user_id': user._id,
                            'date': dateString
                        }

                        workout.users.push(userData)
                        user.history.push(workoutData)

                        // Save Workout
                        workout.save((err)=>{

                            // Unknown error -- EXIT
                            if (err){
                                console.log(err)
                                return

                            // Save User
                            } else {
                                user.save((err)=>{

                                    // Unknown error -- EXIT
                                    if (err){
                                        res.format({
                                            'application/json': () => {
                                                res.status(500).json({
                                                    message: 'Error saving user.'
                                                });
                                            },
                            
                                            'application/xml': () => {
                                                let workoutXml = 
                                                '<?xml version="1.0"?>\n<data>\n' +
                                                '<status>500</status>\n'+
                                                '<message>Error saving user.</message>\n' +
                                                '</data>';
                                                res.type('application/xml');
                                                res.send(workoutXml);
                                            },
                                        });
                                        return

                                    // Successful save of user and workout
                                    } else {
                                        res.format({
                                            'application/json': () => {
                                                res.json({
                                                    message: 'Changes saved!'
                                                });
                                            },
                            
                                            'application/xml': () => {
                                                let workoutXml = 
                                                '<?xml version="1.0"?>\n<data>\n' +
                                                '<message>Changes saved!</message>\n' +
                                                '</data>'
                                                res.type('application/xml');
                                                res.send(workoutXml);
                                            },
                                        });
                                    }
                                })
                            }
                        })
                    }
                })  
            }
        });

    // User information not found in session data -- EXIT
    } else {
        res.format({
            'application/json': () => {
                res.status(404).json({
                    message: 'Unknown Error',
                    redirectUrl: '/'
                });
            },

            'application/xml': () => {
                let workoutXml = 
                '<?xml version="1.0"?>\n<data>\n' +
                '<status>404</status>\n' +
                '<message>Unknown Error</message>\n' +
                '<redirectUrl>/</redirectUrl>\n'+
                '</data>'
                res.type('application/xml');
                res.send(workoutXml);
            },
        });
        return
    }
}