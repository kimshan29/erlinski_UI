mainApp.controller("formBooksCtrl", function ($scope, $routeParams, $http, $q, $cookies, Constant, HttpRequest, Model, Helper, Upload) {
    
	$scope.formLoad = function () {
		$scope.renderBook();
	}

	$scope.renderBook = function () {
		var api = "http://localhost:8080/books/?key=123";
		$http.get(api).then(function(response){
			$scope.dataBooks = response;
			console.log(JSON.stringify($scope.dataBooks));
		})
	}



    $scope.formLoad();
})