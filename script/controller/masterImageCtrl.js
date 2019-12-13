mainApp.controller("masterImageCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers, Upload, $timeout) {
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

        $scope.renderImage();
    }

    $scope.renderImage = function () {
        // NProgress.start();
        // $('.Loading').show();
        // $('.page-form').hide();


        // var apiUrl = "/api/MasterImage";
        // HttpRequest.get(apiUrl).success(function (response) {
        //     $scope.listMasterImage = response;
        //     console.log(JSON.stringify($scope.listMasterImage));



        //     $('.Loading').hide();
        //     $('.page-form').show();
        //     NProgress.done();
        // });

    }

    $scope.eventClickSave = function () {

        var dataForm = $scope.form;
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/MasterImage";

        console.log(JSON.stringify(dataForm));
        HttpRequest.post(apiUrl, dataForm).success(function (response) {
            $scope.eventClickCloseModal();
            swal('', 'Data Berhasil Disimpan', 'success')
            $('.Loading').hide();
            $('.page-form').show();
        });
    }



    $scope.eventClickAdd = function () {
        $scope.modeEdit = false;
        $scope.modeAdd = true;
    }

    $scope.eventClickEdit = function (id) {

        console.log(id);

        $('#myModal').modal({
            show: true
        });

        var apiUrl = "/api/MasterImage/" + id;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form = response;

            console.log(JSON.stringify($scope.form));
        })

    }

    $scope.eventClickHapus = function (id) {
        var apiUrl = "/api/MasterImage/" + id;
        // console.log(apiUrl);
        var hapus = confirm("Are You Sure You Want to Delete This Item?");

        if (hapus) {
            // NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                    $scope.renderImage();
                })
                .error(function (response, code) {
                    // NProgress.done();

                    var data = {
                        title: "Master Running Text",
                        exception: response,
                        exceptionCode: code,
                        operation: "DELETE",
                        apiUrl: apiUrl
                    };

                    Helper.notifErrorHttp(data);
                });
        }
    }


    $scope.clearForm = function () {
        $scope.form.id = '';
        $scope.form.message = '';
        $scope.form.isActive = '';

    }

    $scope.eventClickCloseModal = function () {
        $scope.clearForm();
        $('#myModal').modal('hide');
        $scope.renderImage();
    }


    //Start of Application ===============================================================
    $scope.formLoad();
})