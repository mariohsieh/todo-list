// js/controllers/main.js

angular.module('todoController', []) 

	// inject Todo service factory into controller by passing it as a parameter
	.controller('mainController', function($scope, $http, Todos) {
		$scope.formData = {};	//clear form data on initial run
		
		// show all todo list items on landing page
		Todos.get()
			// load all todo list items for display
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log(data);
			});
		/*$http.get('/api/todos')
			.success(function(data) {
				$scope.todos = data;
				console.log(data.length);
			})
			.error(function(data) {
				console.log(data);
			});
		*/
		
		// submit the add form, console log the text
		$scope.createTodo = function() {
			// validate form to confirm it's not empty
			//if (!$.isEmptyObject($scope.formData)) {	// this uses jQuery
				// call create function from service (returns a promise obj)
				Todos.create($scope.formData)
					// if successful list all todo list items
					.success(function(data) {
						$scope.formData = {};
						$scope.todos = data;
					});
					//.error(function(data) {
						//console.log(data);
					//});
			//}
		/*	
			$http.post('/api/todos', $scope.formData)
				.success(function(data) {
					$scope.formData = {};	// clear form data
					$scope.todos = data;
					console.log(data);
				})
				.error(function(data) {
					//console.log('Error: ' + data);
					console.log(data);
				});
		*/
		};

		// delete a todo list after checking it 'done'
		$scope.deleteTodo = function(id) {
			Todos.delete(id)
				.success(function(data) {
					$scope.todos = data;
				})
				.error(function(data) {
					console.log(data);
				});
			
		/*
			$http.delete('/api/todos/' + id)
				.success(function(data) {
					$scope.todos = data;
					console.log(data);
				})
				.error(function(data) {
				console.log(data);
		*/ 
		};
	});
		
		
