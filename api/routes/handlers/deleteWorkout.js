/* Shelby Goudy
** CS 602_ Group 3
** Final Project
*/

const workoutsDB = require('../../models/workouts.js');
const Workout = workoutsDB.getModel();

// Delete workout

module.exports = async (req , res , next) => {
  
    let id = req.params.id
    let user = req.session.user;

    // verify session data and role = admin
    if (user !== null && user.role === 'admin'){

        // find workout in db
        Workout.findById(id,  (err, workout) => {

            // if error -- EXIT
            if(err){
                console.log("Error Selecting : %s ", err); 
                return;
            }

            // if NO workout found -- EXIT
            else if (!workout){
                res.format({

                'application/json': () => {
                    res.status(404).json({
                        message: 'No workout found with that ID'
                    });
                },

                'application/xml': () => {
                    let workoutXml = 
                    '<?xml version="1.0"?>\n<data>\n' +
                    '<status>404</status>\n'+
                    '<message>No workout found with that ID</message>\n' +
                    '</data>';
                    res.type('application/xml');
                    res.send(workoutXml);
                },
                });
                return;

            // workout found
            } else {
        
            workout.remove((err) => {
                
                // if error -- EXIT
                if (err){
                    console.log("Error deleting : %s ",err );
                    return;
                }

                // otherwise, send response
                res.format({

                    'application/json': () => {
                        res.status(200).json({
                            message: 'Workout Deleted'
                        });
                    },

                    'application/xml': () => {
                        let workoutXml = 
                        '<?xml version="1.0"?>\n<data>\n' +
                        '<status>200</status>\n'+
                        '<message>Workout Deleted</message>\n' +
                        '</data>';
                        res.type('application/xml');
                        res.send(workoutXml);
                    },
                    });
            });
        }})
    
    // no session data or wrong user 'role' -- EXIT
    } else {
        res.format({
            'application/json': () => {
                res.status(500).json({
                    message: 'Unknown Error'
                });
            },

            'application/xml': () => {
                let workoutXml = 
                '<?xml version="1.0"?>\n<data>\n'+
                '<status>500</status>\n'+
                '<message>Unknown Error</message>\n' +
                '</data>';
                res.type('application/xml');
                res.send(workoutXml);
            },
        })
        return;
    }
}