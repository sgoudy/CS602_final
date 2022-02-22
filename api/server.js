var express = require('express');
var app = express();

// static resources
app.use(express.static(__dirname + '/public'));

// to parse request body
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// to communicate with client
var cors = require('cors')
app.use(cors())

// for signed cookies
const credentials = require('./cookieCredentials.js');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

// cookie-parser first
const oneDay = 1000 * 60 * 60 * 24;
app.use(cookieParser());
app.use(expressSession({
        secret: credentials.cookieSecret, 
        resave: false, 
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
    }));


// Routing
var routes = require('./routes/index');
app.use('/', routes);


app.listen(5000, function(){
  console.log('http://localhost:5000');
});