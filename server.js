// server.js

// declare modules ***********************************
var express = require('express'),					// load express
	app = express(),								// create app using express framework
	mongoose = require('mongoose'),					// load mongoose
	port = process.env.PPORT || 9000,				// define port
	database = require('./config/database');		// use database.js from config folder	
	
// configuration  ***********************************
mongoose.connect(database.url);						// connect to url specfied in database.js

app.configure(function() {
	app.use(express.static(__dirname + '/public'));	// set the static files location
	app.use(express.logger('dev'));					// log every request to the console
	app.use(express.bodyParser());					// pull information from html in POST
	app.use(express.methodOverride());				// simulate DELETE and PUT
});

// load routes from app/routes.js (models are loaded here)
require('./app/routes')(app);

// open port and start app  ***********************************
app.listen(port);
console.log("App running on localhost:9000");
