/**
 * Shelby Goudy
 * CS 602_ Group 3
 * Final Project
 */

 const usersDB = require('../../models/users.js');
 const User = usersDB.getModel();

 // Login
 module.exports = async (req , res , next) => {
    
    let user = await User.findOne({
                    username: req.body.username
                })
                
    // check password against encrypted password in DB
    if (user){
        if (await user.isPasswordMatch(req.body.password)){
        
            // create a session and store user data
            let session = req.session;
            session.user = user;
            
            // only if role = 'admin', redirect to admin view
            if (session.user.role === 'admin'){
                res.format({
                    'application/json': function() {
                        res.json({
                            success:true,
                            redirectUrl: `/admin/workouts`,
                        })
                    },
            
                    'application/xml': function() {
                        let resultXml = 
                        '<?xml version="1.0"?>\n<data>\n' +
                            '<success>'+true+'</success>'+
                            '<redirectUrl>/admin/workouts</redirectUrl>'+
                            '</data>';
                        res.type('application/xml');
                        res.send(resultXml);
                    }
                });
               
            // if 'customer', redirect to customer layout
            } else {
                res.format({
                    'application/json': function() {
                        res.json({
                            success:true,
                            redirectUrl: '/workouts',
                        })
                    },
                    'application/xml': function() {
                        let resultXml = 
                        '<?xml version="1.0"?>\n<data>\n' +
                            '<redirectUrl>/workouts</redirectUrl>\n'+
                            '<success>'+true+'</success>\n'+
                            '</data>';
                        res.type('application/xml');
                        res.send(resultXml);
                    }
                })
            }
    }
    
    // user not authenticated
        else {
            res.format({
                'application/json': function() {
                    res.status(401).json({
                        message: 'Invalid Credentials',
                    })
                },
                'application/xml': function() {
                    let resultXml = 
                    '<?xml version="1.0"?>\n<data>\n' +
                    '<status>401</status>\n' +
                    '<message>Invalid Credentials</message>\n' +
                    '</data>';
                    res.type('application/xml');
                    res.send(resultXml);
                }
            })
            return;
        }
    } else {
        res.format({
            'application/json': function() {
                res.status(401).json({
                    message: 'Invalid Credentials.',
                })
            },
            'application/xml': function() {
                let resultXml = 
                '<?xml version="1.0"?>\n<data>\n' +
                '<status>401</status>\n' +
                '<message>Invalid Credentials</message>\n' +
                '</data>';
                res.type('application/xml');
                res.send(resultXml);
            }
        })
        return;
    }
    
 };
 