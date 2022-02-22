/**
 * Shelby Goudy
 * CS 602_ Group 3
 * Final Project
 */

 const usersDB = require('../../models/users.js');
 const User = usersDB.getModel();

 // Login
 module.exports = async (req , res , next) => {
    
    if (req.params.id){
        let user = await User.findOne({
            _id: req.params.id,
        })
        
        if (user){

            res.format({
                'application/json': function() {
                    res.json({
                        data: user
                    })
                },

                'application/xml': function() {
                    let resultXml = 
                    '<?xml version="1.0"?>\n<data>\n' +
                        '<user>'+user+'</user>\n'+
                        '</data>';
                    res.type('application/xml');
                    res.send(resultXml);
                }
            });
            
        } else {
            res.format({
                'application/json': function() {
                    res.status(404).json({
                        message: 'None Found'
                    })
                },
                'application/xml': function() {
                    let resultXml = 
                    '<?xml version="1.0"?>\n<data>\n' +
                        '<status>404</status>\n' +
                        '<user>None Found</user>\n'+
                        '</data>';
                    res.type('application/xml');
                    res.send(resultXml);
                }
            })
        }
    } else {
        res.format({
            'application/json': function() {
                res.status(500).json({
                    message: 'No ID entered'
                })
            },
            'application/xml': function() {
                let resultXml = 
                '<?xml version="1.0"?>\n<data>\n' +
                    '<status>500</status>\n' +
                    '<user>No ID entered</user>\n'+
                    '</data>';
                res.type('application/xml');
                res.send(resultXml);
            }
        })
        return
    }
 };
 