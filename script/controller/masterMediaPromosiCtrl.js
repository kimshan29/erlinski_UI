mainApp.controller("masterMediaPromosiCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers, Upload, $timeout) {
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

        $scope.renderList();
    }

    $scope.renderList = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/promosi";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listImage = response.data;
            console.log(JSON.stringify($scope.listImage));

            $('.Loading').hide();
            $('.page-form').show();
        });

    }

    $scope.eventClickAdd = function () {
        $scope.modeEdit = false;
        $scope.modeAdd = true;

        $scope.btnSave = true;
        $scope.btnUpdate = false;
    }
    $scope.eventClickSave = function (file) {
        // console.log(file);
        $('.Loading').show();
        $('.page-form').hide();
        $scope.form.createdBy = $scope.currentUser.email;

        var dataForm = $scope.form;
        var apiUrl = "/promosi/create";

        console.log(JSON.stringify(dataForm));
        HttpRequest.post(apiUrl, dataForm).success(function (response) {
            $scope.idBarang = response.data.id;
            // console.log(response.data.id);


            if (file == undefined) {
                $scope.eventClickCloseModal();
                console.log("1");
                $scope.renderList();
            } else {
                file.upload = Upload.upload({
                    url: 'https://api.myerlinski.com/promosi/uploadPromosi',
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
        var apiUrl = "/promosi/" + $scope.form.id;
        $scope.form.updatedBy = $scope.currentUser.email;
        // console.log(JSON.stringify($scope.form));

        // console.log(file);

        HttpRequest.put(apiUrl, $scope.form).success(function (response) {

            console.log(JSON.stringify($scope.form));
            var idBarang = $scope.form.id;
            // console.log("idBarang:" + idBarang);

            if (file == undefined || file == "") {
                $scope.eventClickCloseModal();
                // console.log("1");
                $scope.renderList();
            } else {
                file.upload = Upload.upload({
                    url: 'https://api.myerlinski.com/promosi/uploadpromosi',
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


    $scope.eventClickEdit = function (id) {

        $scope.btnSave = false;
        $scope.btnUpdate = true;
        var apiUrl = "/promosi/" + id;
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
                    var apiUrl = "/promosi/" + id;
                    HttpRequest.del(apiUrl).success(function () {
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


    $scope.clearForm = function () {
        $scope.form = {};
        $scope.form.file = undefined;

    }

    $scope.eventClickCloseModal = function () {
        $scope.clearForm();
        $('#myModal').modal('hide');
        $scope.renderList();
    }


    //Start of Application ===============================================================
    $scope.formLoad();
})