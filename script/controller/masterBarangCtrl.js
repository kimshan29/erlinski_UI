mainApp.controller("masterBarangCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers, Upload, $timeout) {
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

    $scope.eventClickSave = function () {

        $('.Loading').show();
        $('.page-form').hide();
        $scope.form.username = $scope.currentUser.email;
        var dataForm = $scope.form;
        var apiUrl = "/barang/create";

        console.log(JSON.stringify(dataForm));
        HttpRequest.post(apiUrl, dataForm).success(function (response) {
            $scope.idBarang = response.data.id;
            console.log(response.data.id);


            if (file == undefined) {
                $scope.eventClickeventClickCloseModal();
                console.log("1");
                $scope.renderList();
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
                    $scope.renderList();
                    $scope.eventClickeventClickCloseModal();
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

            console.log(JSON.stringify($scope.form));
        });
    }

    $scope.eventClickUpdate = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/barang/updateBarang";
        $scope.form.createdBy = $scope.currentUser.username;

        HttpRequest.post(apiUrl, $scope.form).success(function (response) {

            console.log(JSON.stringify($scope.form));
            var idMakanan = $scope.form.id;
            console.log("idMakanan:" + idMakanan);

            $scope.renderList();
            $scope.eventClickCloseModal();
            if (file == undefined) {
                $scope.eventClickCloseModal();
                console.log("1");
                $scope.renderList();
            } else {
                file.upload = Upload.upload({
                    url: 'https://api.myerlinski.com/barang/uploadBarang',
                    // url: '',
                    data: {
                        id: idMakanan,
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
                    $scope.renderList();
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
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form = response.data;

            console.log(JSON.stringify($scope.form));

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
                    var apiUrl = "/barang/deleteBarang";
                    HttpRequest.post(apiUrl, $scope.dataForm).success(function () {
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

    }

    $scope.eventClickeventClickeventClickCloseModal = function () {
        $scope.clearForm();
        $('#myModal').modal('hide');
        $scope.renderListData();
    }


    //Start of Application ===============================================================
    $scope.formLoad();
})