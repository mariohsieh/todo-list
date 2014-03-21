var Todolist = angular.module('Todolist', []);

function mainController($scope, $http) {
	$scope.formData = {};	clear form data on initial run
	
	// show all todo list items on landing page
	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
		
	// submit the add form, console log the text
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {};	// clear form data
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: + ' + data);
			});
	};

	// delete a todo list after checking it 'done'
	$scope.deleteTodo = function() {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}
