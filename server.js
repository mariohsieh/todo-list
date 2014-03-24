// declare modules ***********************************
var express = require('express'),
	app = express(),
	mongoose = require('mongoose');
	
// configuration  ***********************************
mongoose.connect('mongodb://localhost/scotch');	// if database doesn't exist, one will be created

app.configure(function() {
	app.use(express.static(__dirname + '/public'));	// set the static files location
	app.use(express.logger('dev'));					// log every request to the console
	app.use(express.bodyParser());					// pull information from html in POST
	app.use(express.methodOverride());				// simulate DELETE and PUT
});

// define model   ***********************************
var Todolist = mongoose.model('Todo', {
		text : String
});

// define RESTful api   ***********************************
// get all todo list items
app.get('/api/todos', function(req,res) {
	
	// use mongoose to grab all items from database
	Todolist.find(function(err,doc) {
		
		if (err) throw err;	// show error if it occurs
			//res.send(err);
		res.json(doc);		// returns the items in JSON format
		//console.log(doc);
	});
});

// create todo list and send back all todo list items after creation
app.post('/api/todos', function(req,res) {
	
	// create a todo list, information comes from AJAX request from Angular
	Todolist.create({
		text: req.body.text,
		done: false
	}, function(err,doc) {
		if (err) throw err;
		// get and return all the todo list items after you create another
		Todolist.find(function(err,doc) {
			if (err) throw err;
			res.json(doc);
		});
	});
});

// delete a todo list item
app.delete('/api/todos/:id', function(req,res) {
	
	// remove an item from list
	Todolist.remove({
		_id: req.params.id
	}, function(err,doc) {
		if (err) throw err;
		// get and return al the todo list items after you create another
		Todolist.find(function(err,doc) {
			if (err) throw err;
			res.json(doc);
		});
	});
});

// define routes  ***********************************
app.get('*', function(req,res) {
	//res.render('./public/index.html');	// load a single view file 
	res.sendfile('./public/index.html'); 
});

// open port and start app  ***********************************
app.listen(9000);
console.log("App running on localhost:9000");
