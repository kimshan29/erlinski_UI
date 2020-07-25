mainApp.controller("masterBarangCtrl", function ($route, $scope, $http, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers, Upload, $timeout) {
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

        $scope.renderListData();
    }

    $scope.renderListData = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/barang";
        HttpRequest.get(apiUrl).success(function (response) {
            // response.header("Access-Control-Allow-Origin", "*");
            // response.header("Access-Control-Allow-Headers", "X-Requested-With");
            $scope.listData = response;
            console.log(JSON.stringify($scope.listData));

            $('.Loading').hide();
            $('.page-form').show();

        });

    }

    $scope.eventClickSave = function (file) {

        $('.Loading').show();
        $('.page-form').hide();
        // $scope.form.email = $scope.currentUser.email;
        $scope.form.createdBy = $scope.currentUser.email;

        var dataForm = $scope.form;
        var apiUrl = "/barang/create";

        console.log(JSON.stringify(dataForm));
        HttpRequest.post(apiUrl, dataForm).success(function (response) {
            $scope.idBarang = response.data.id;
            // console.log(response.data.id);


            if (file == undefined) {
                $scope.eventClickCloseModal();
                console.log("1");
                $scope.renderListData();
            } else {
                file.upload = Upload.upload({
                    url: 'https://api.myerlinski.com/barang/uploadBarang',
                    // url: '',
                    data: {
                        id: $scope.idBarang,
                        file: file
                    },
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(JSON.stringify(response.data));
                    });
                    $('.Loading').hide();
                    $('.page-form').show();
                    // Get List Upload File
                    swal("Data Berhasil Disimpan", {
                        icon: "success",
                    });
                    console.log(response.data);
                    $scope.renderListData();
                    $scope.eventClickCloseModal();
                    $scope.clearForm();

                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    console.log(response.data);

                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });
            }

            // console.log(JSON.stringify($scope.form));
        });
    }

    $scope.eventClickUpdate = function (file) {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/barang/" + $scope.form.id;
        $scope.form.updateBy = $scope.currentUser.email;
        // console.log(JSON.stringify($scope.form));

        console.log(file);

        HttpRequest.put(apiUrl, $scope.form).success(function (response) {

            console.log(JSON.stringify($scope.form));
            var idBarang = $scope.form.id;
            console.log("idBarang:" + idBarang);

            if (file == undefined || file == "") {
                $scope.eventClickCloseModal();
                // console.log("1");
                $scope.renderListData();
            } else {
                file.upload = Upload.upload({
                    url: 'https://api.myerlinski.com/barang/uploadBarang',
                    // url: '',
                    data: {
                        id: idBarang,
                        file: file
                    },
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(JSON.stringify(response.data));
                    });

                    // Get List Upload File
                    swal("Data Berhasil Diupdate", {
                        icon: "success",
                    });
                    console.log(response.data);
                    $scope.renderListData();
                    $scope.eventClickCloseModal();
                    $scope.clearForm();

                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    console.log(response.data);

                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });
            }

        })
    }

    $scope.eventClickAdd = function () {
        $scope.btnSave = true;
        $scope.btnUpdate = false;
    }

    $scope.eventClickEdit = function (id) {

        $scope.btnSave = false;
        $scope.btnUpdate = true;
        var apiUrl = "/barang/" + id;
        // console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form = response.data;

            // console.log(JSON.stringify($scope.form));

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
                    // $scope.dataForm = {
                    //     id: id,
                    //     updateBy: $scope.currentUser.email
                    // }
                    var apiUrl = "/barang/" + id;
                    HttpRequest.del(apiUrl).success(function () {
                        $('.Loading').hide();
                        $('.page-form').show();
                        swal("Data Berhasil Dihapus!", {
                            icon: "success",
                        });
                        $scope.renderListData();
                    })

                } else {
                    // swal("Data To");
                }
            });
    }


    $scope.clearForm = function () {
        $scope.form = {};

        console.log("clear data");

    }

    $scope.eventClickCloseModal = function () {
        $scope.clearForm();
        $('#myModal').modal('hide');
        $scope.renderListData();
    }


    //Start of Application ===============================================================
    $scope.formLoad();
})