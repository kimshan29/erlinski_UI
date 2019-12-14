mainApp.controller("masterRunningTextCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers, Upload, $timeout) {
    //Variable


    $scope.currentUser = {};
    $scope.form = {};

    $scope.pageSize = 10;
    $scope.currentPage = 1;
    //Form Load ======================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }
        // alert("testing");
        // $('#komitmenkepatuhan').attr('disabled', 'disabled').off('click');

        $scope.renderRunningText();
    }

    $scope.renderRunningText = function () {
        $('.Loading').show();
        $('.page-form').hide();


        var apiUrl = "/api/RunningText";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listMasterRunningText = response.items;
            console.log(JSON.stringify($scope.listMasterRunningText));

            $('.Loading').hide();
            $('.page-form').show();

        });

    }

    $scope.eventClickSave = function () {

        var dataForm = $scope.form;
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/RunningText/addRunningText";

        if ($scope.form.status == true) {
            $scope.form.status = "Aktive";
        } else {
            $scope.form.status = "Non Aktive";
        }
        console.log(JSON.stringify(dataForm));
        HttpRequest.post(apiUrl, dataForm).success(function (response) {
            $scope.eventClickCloseModal();
            swal('', 'Data Berhasil Disimpan', 'success')
            $('.Loading').hide();
            $('.page-form').show();
        });
    }

    $scope.eventClickUpdate = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/RunningText/updateRunningText";
        $scope.form.createdBy = $scope.currentUser.email;
        if ($scope.form.status == false) {
            $scope.form.status = "Non Aktive";
        } else {
            $scope.form.status = "Aktive";
        }

        console.log(JSON.stringify($scope.form));


        HttpRequest.post(apiUrl, $scope.form).success(function (response) {
            $('.Loading').hide();
            $('.page-form').show();
            console.log(JSON.stringify($scope.form));
            $scope.renderRunningText();
            $scope.eventClickCloseModal();
            swal("Data Berhasil Disimpan", {
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
        var apiUrl = "/api/RunningText?id=" + id;
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form = response.items;
            if ($scope.form.status == "Non Aktive") {
                $scope.form.status = false;
            } else {
                $scope.form.status = true;
            }
            console.log(JSON.stringify($scope.form));

        })
        // $scope.form = {
        //     "id": "7",
        //     "message": "Launcing Aplikasi",
        //     "status": true,
        //     "delete": "0",
        //     "createdBy": null,
        //     "createdDate": null,
        //     "updatedBy": null,
        //     "updatedDate": null
        // }

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
                    var apiUrl = "/api/RunningText/deleteRunningText";
                    HttpRequest.post(apiUrl, $scope.dataForm).success(function () {
                        $('.Loading').hide();
                        $('.page-form').show();
                        swal("Data Berhasil Dihapus!", {
                            icon: "success",
                        });
                        $scope.renderRunningText();
                    })

                } else {
                    // swal("Data To");
                }
            });
    }


    $scope.clearForm = function () {
        $scope.form.id = '';
        $scope.form.message = '';
        $scope.form.isActive = '';

    }

    $scope.eventClickCloseModal = function () {
        $scope.clearForm();
        $('#myModal').modal('hide');
        $scope.renderRunningText();
    }


    //Start of Application ===============================================================
    $scope.formLoad();
})