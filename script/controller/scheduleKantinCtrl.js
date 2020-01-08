mainApp.controller("scheduleKantinCtrl", function ($scope, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, Upload) {
    $scope.Helper = Helper;
    $scope.currentUser = {};
    $scope.currentUser = {};
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.master = {};

    $scope.formLoad = function () {

        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }
        $scope.renderList();
        $scope.renderVendor();
        $scope.renderShift();
    }

    $scope.renderVendor = function () {
        var apiUrl = "/api/vendor";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.vendor = response.items;
            console.log(JSON.stringify($scope.listVendor));
        })
    }

    $scope.renderShift = function () {
        var apiUrl = "/api/shift";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.shift = response.items;
            console.log(JSON.stringify($scope.master.shift));
        })
    }


    $scope.renderList = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/scheduleKantin";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listScheduleKantin = response.items;
            console.log(JSON.stringify($scope.listScheduleKantin));
            $('.Loading').hide();
            $('.page-form').show();

        })

    }

    $scope.eventClickSave = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/scheduleKantin/addScheduleKantin";
        $scope.form.createdBy = $scope.currentUser.email;

        HttpRequest.post(apiUrl, $scope.form).success(function (response) {
            console.log(JSON.stringify($scope.form));
            $('.Loading').hide();
            $('.page-form').show();
            $scope.renderList();
            $scope.closeModal();
            swal("Data Berhasil Disimpan", {
                icon: "success",
            });

        })


    }

    $scope.eventClickUpdate = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/scheduleKantin/updateScheduleKantin";
        $scope.form.createdBy = $scope.currentUser.email;

        HttpRequest.post(apiUrl, $scope.form).success(function (response) {
            $('.Loading').hide();
            $('.page-form').show();
            console.log(JSON.stringify($scope.form));
            $scope.renderList();
            $scope.closeModal();
            swal("Data Berhasil Diupdate", {
                icon: "success",
            });
        })
    }

    $scope.eventClickAdd = function () {
        $scope.btnSave = true;
        $scope.btnUpdate = false;
    }
    $scope.eventClickEdit = function (id) {
        $scope.btnSave = false;
        $scope.btnUpdate = true;

        var apiUrl = "/api/scheduleKantin?id=" + id;
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form = response.items;
            console.log(JSON.stringify($scope.form));
            $scope.form.startDate = $scope.form.startDate.toDate();
            $scope.form.endDate = $scope.form.endDate.toDate();

        })
    }

    $scope.eventClickDelete = function (id) {
        swal({
                title: "Delete!!!",
                text: "Yakin Ingin Menghapus Data ini?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                $('.Loading').show();
                $('.page-form').hide();
                if (willDelete) {
                    $scope.dataForm = {
                        id: id,
                        updateBy: $scope.currentUser.email
                    }
                    var apiUrl = "/api/scheduleKantin/deleteScheduleKantin";
                    HttpRequest.post(apiUrl, $scope.dataForm).success(function () {
                        $('.Loading').hide();
                        $('.page-form').show();
                        swal("Data Berhasil Dihapus!", {
                            icon: "success",
                        });
                        $scope.renderList();
                    })

                } else {
                    // swal("Data To");
                }
            });
    }

    $scope.closeModal = function () {
        $('#myModal').modal('hide');
        $scope.clearForm();
        console.log("clearForm");

    }

    $scope.clearForm = function () {
        $scope.form.id = "";
        $scope.form.vendor = "";
        $scope.form.shift = "";
        $scope.form.startDate = "";
        $scope.form.endDate = "";
    }

    $scope.formLoad();
})