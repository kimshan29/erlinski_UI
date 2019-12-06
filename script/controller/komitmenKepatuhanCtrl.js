mainApp.controller("komitmenKepatuhanCtrl", function ($scope, $http, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, Upload) {
    $scope.Helper = Helper;
    $scope.currentUser = {};
    $scope.komitmenKepatuhan = {};
    $scope.komitmenKepatuhan.isEditMode = false;
    // $scope.lanjutkan = true;
    $scope.formLoad = function () {
        // $("#ck").prop("disabled", false);
        $("#ck").attr('disabled', 'disabled');
        $('#btn').attr('disabled', 'disabled');

        // $scope.enabledBtn();
    }

    $scope.enabledBtn = function () {
        // alert("test");
        if ($('#ck').is(':checked')) {
            // console.log("1");
            $('#btn').removeAttr('disabled');
        } else {
            // console.log("2");
            $('#btn').attr('disabled', 'disabled');
        }
    }

    $scope.eventClickAdd = function () {
        $scope.komitmenKepatuhan.isEditMode = true;
    }

    $scope.eventClickCancel = function () {
        $scope.komitmenKepatuhan.isEditMode = false;
    }

    $scope.formLoad()
})