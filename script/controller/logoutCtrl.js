mainApp.controller("logoutCtrl", function ($scope, $routeParams, $location, $cookies, HttpRequest, Helper, Constant, Model) {

    try {
        $scope.currentUser = JSON.parse($cookies.get('currentUser'));
    } catch (err) {
        $scope.currentUser = {};
    }

    $scope.logout = function () {
        // var apiUrl = "/api/user/logout";
        // console.log($scope.currentUser.username);
        // HttpRequest.post(apiUrl, $scope.currentUser.username).success(function (response) {
        try {
            $cookies.remove('currentUser');
        } catch (err) {}

        try {
            $cookies.remove('currentRoute');
        } catch (err) {}

        document.location.href = '/login.html';
        // });
    }
});