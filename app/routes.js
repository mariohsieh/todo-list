// app/routes.js

// load todo list model 
var Todolist = require('./models/todo');

module.exports = function(app) {
	
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

	// send all routes to angular to be defined there ***********************************
	app.get('*', function(req,res) {
		//res.render('./public/index.html');	// load a single view file 
		res.sendfile('./public/index.html'); 
	});
};
