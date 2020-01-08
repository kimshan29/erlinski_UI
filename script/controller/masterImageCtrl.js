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

        $scope.renderList();
    }

    $scope.renderList = function () {
        $('.Loading').show();
        $('.page-form').hide();


        var apiUrl = "/api/image";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listImage = response.items;
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
        console.log(file);
        $('.Loading').show();
        $('.page-form').hide();
        if (file == undefined) {
            $scope.closeModal();
            console.log("1");
            $scope.renderList();
        } else {
            if ($scope.form.status == true) {
                $scope.form.status = "Aktive";
            } else {
                $scope.form.status = "Non Aktive";
            }
            file.upload = Upload.upload({
                url: 'http://api.canteencounting.com/api/image/addImage',
                // url: '',
                data: {
                    id: $scope.form.id,
                    keteranganImage: $scope.form.keteranganImage,
                    status: $scope.form.status,
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
                $scope.closeModal();
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



    }

    $scope.eventClickUpdate = function (file) {
        $('.Loading').show();
        $('.page-form').hide();
        if (file == undefined) {
            $scope.closeModal();
            console.log("1");
            $scope.renderList();
        } else {
            if ($scope.form.status == true) {
                $scope.form.status = "Aktive";
            } else {
                $scope.form.status = "Non Aktive";
            }
            file.upload = Upload.upload({
                url: 'http://api.canteencounting.com/api/image/updateImage',
                // url: '',
                data: {
                    id: $scope.form.id,
                    keteranganImage: $scope.form.keteranganImage,
                    status: $scope.form.status,
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
                $scope.closeModal();
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
    }
    $scope.eventClickEdit = function (id) {

        $scope.btnSave = false;
        $scope.btnUpdate = true;
        var apiUrl = "/api/image?id=" + id;
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
                    var apiUrl = "/api/image/deleteimage";
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


    $scope.clearForm = function () {
        $scope.form.id = '';
        $scope.form.keteranganImage = '';
        $scope.form.status = '';
        $scope.form.file = undefined;

    }

    $scope.closeModal = function () {
        $scope.clearForm();
        $('#myModal').modal('hide');
        $scope.renderList();
    }


    //Start of Application ===============================================================
    $scope.formLoad();
})