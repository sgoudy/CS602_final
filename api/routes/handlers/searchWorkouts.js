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
 
     // if no session data -- EXIT
     if (!user || user === null){
         res.format({
             'application/json': function() {
                 res.status(401).json({
                     message: 'Unauthorized user.'
                 })
             },
 
             'application/xml': function() {
                 let resultXml = 
                     '<?xml version="1.0"?>\n<data>\n' +
                     '<status>401</status>\n'+
                     '<message>Unauthorized User</message>\n'+
                     '</data>';
                 res.type('application/xml');
                 res.send(resultXml);
             }
         });
         return;
     }
 
     // if session data
     if (req.params.name){

        // convert query to lowercase and create regex for searching DB
        let val = req.params.name.toLowerCase();
        let regex = new RegExp(`${val}*`);

        // fetch all workouts
        workouts = await Workout.find({})

        // compare workout name to input query, create new array if matches found
        let foundWorkouts = []
        for (let i in workouts){
            let name = workouts[i].name.toLowerCase();
            if (regex.test(name) === true)
                foundWorkouts.push(workouts[i])
        }

        // if matches, reply
        if (foundWorkouts){
        res.format({
            'application/json': function() {
                res.json({data: foundWorkouts});
            },

            'application/xml': function() {
                let resultXml = 
                    '<?xml version="1.0"?>\n<data>\n' +
                    foundWorkouts.map((workout)=>{
                        return (
                            '<workout id="' + workout._id + '">\n' + 
                            '<name>' + workout.name + '</name>\n' + 
                            '<description>' + workout.description +'</description>\n' + 
                            workout.users.map((user)=>{
                                return (
                                    '<user>' + user + '</user>'
                                )
                            })+
                            '</workout>\n'
                    )}).join('\n')+'\n</data>\n';
                res.type('application/xml');
                res.send(resultXml);
            }
        });

        // no matches found -- EXIT
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
 