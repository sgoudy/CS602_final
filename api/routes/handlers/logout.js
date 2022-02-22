/**
 * Shelby Goudy
 * CS 602_ Group 3
 * Final Project
 */


module.exports = (async (req , res , next) => {
    
    // set session to null
    req.session.user = null;

    // destroys session
    delete req.session.user;

    // redirects to login page
    res.format({
        'application/json': function() {
            res.json({
                success:true,
                redirectUrl: '/login',
            })
        },

        'application/xml': function() {
            let resultXml = 
            '<?xml version="1.0"?>\n<data>\n' +
                '<redirectUrl>/login</redirectUrl>'+
                '<success>'+true+'</success>'+
                '</data>';
            res.type('application/xml');
            res.send(resultXml);
        }
    });
})