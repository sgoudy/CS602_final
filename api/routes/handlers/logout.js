/**
 * Shelby Goudy
 * CS 602_ Group 3
 * Final Project
 */


module.exports = (async (req , res , next) => {
    
    // destroys session
    delete req.session.user;

    // redirects to login page
    res.format({
        'application/json': function() {
            res.json({
                user: null,
                success:true,
                redirectUrl: '/login',
            })
        },

        'application/xml': function() {
            let resultXml = 
            '<?xml version="1.0"?>\n<data>\n' +
                '<user>'+null+'</user>' +
                '<redirectUrl>/login</redirectUrl>'+
                '<success>'+true+'</success>'+
                '</data>';
            res.type('application/xml');
            res.send(resultXml);
        }
    });
})