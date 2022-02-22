/* Shelby Goudy
** CS 602_ Group 3
** Final Project
*/

const workoutsDB = require('../../models/workouts.js');
const Workout = workoutsDB.getModel();

// Edit workout

module.exports = async (req , res , next) => {
  
    let id = req.params.id;

    // find workout in db
    Workout.findById(id,  (err, workout) => {
        if(err)
        console.log("Error Selecting : %s ", err); 
        
        if (!workout)
            
            res.format({
                'application/json': () => {
                    res.status(404).json({
                        message: 'Workout not found.'
                    });
                },

                'application/xml': () => {
                    let workoutXml = 
                    '<?xml version="1.0"?>\n<data>\n' +
                    '<status>404</status>\n' +
                    '<message>Workout not found.</message>\n'+
                    '</data>';
                    res.type('application/xml');
                    res.send(workoutXml);
                },
            });
        
        else{
            workout.name = req.body.name;
            workout.description = req.body.description;
        
            workout.save((err)=>{
                
                if (err){
                    res.format({
                        'application/json': () => {
                            res.status(500).json({
                                message: 'Error saving workout.'
                            });
                        },
        
                        'application/xml': () => {
                            let workoutXml = 
                            '<?xml version="1.0"?>\n<data>\n' +
                            '<status>500</status>\n'+
                            '<message>Error saving workout.</message>\n' +
                            '</data>';
                            res.type('application/xml');
                            res.send(workoutXml);
                        },
                    });
    
                } else {
                    res.format({
                        'application/json': () => {
                            res.json({
                                message: 'Changes saved!',
                                redirectUrl: '/admin/workouts'
                            });
                        },
        
                        'application/xml': () => {
                            let workoutXml = 
                            '<?xml version="1.0"?>\n<data>\n' +
                            '<message>Changes saved!</message>\n' +
                            '<redirectUrl>/admin/workouts</redirectUrl>\n'+
                            '</data>'
                            res.type('application/xml');
                            res.send(workoutXml);
                        },
                    });
                }
            })
        }
    });
}