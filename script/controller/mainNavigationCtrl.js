mainApp.controller("mainNavigationCtrl", function ($scope, $routeParams, $cookies, $interval, $sce, HttpRequest, Helper, Constant, Model) {

    $scope.currentUser = {};
    $scope.totalNotifications;
    $scope.data = [];
    $scope.navigationHtml = [];

    //Procedures =====================================================================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }

        $scope.renderMenu();
    };


    $scope.renderMenu = function () {
        var apiUrlMenu = "/api/user/GetHakAksesMenu?username=" + $scope.currentUser.username;
        console.log(apiUrlMenu);

        HttpRequest.get(apiUrlMenu).success(function (response) {
            $scope.dataMenu = response.items;
            console.log(JSON.stringify($scope.dataMenu));
        })
        console.log(JSON.stringify($scope.dataMenu));

    }



    //Start of Application =============================================================================================================
    $scope.formLoad();
});