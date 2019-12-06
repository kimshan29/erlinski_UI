mainApp.controller("kebijakanCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers) {
    //Variable


    $scope.currentUser = {};

    //Form Load ======================================================================
    $scope.formLoad = function () {
        // try {
        //     $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        // } catch (err) {
        //     $scope.currentUser = {};
        // }
        // alert("testing");
        // $('#komitmenkepatuhan').attr('disabled', 'disabled').off('click');


    }


    $scope.createForm = function () {

    }

    //Start of Application ===============================================================
    $scope.formLoad();
})