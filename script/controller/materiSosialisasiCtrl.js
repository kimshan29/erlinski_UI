mainApp.controller("materiSosialisasiCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers, Upload, $timeout) {
    //Variable


    $scope.currentUser = {};

    //Form Load ======================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }
        // alert("testing");
        // $('#komitmenkepatuhan').attr('disabled', 'disabled').off('click');

        $scope.renderMateriSosialisasi();
    }

    $scope.renderMateriSosialisasi = function () {
        var apiUrl = "/api/MateriSosialisasi";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listMateriSosialisasi = response;
            console.log(JSON.stringify($scope.listMateriSosialisasi));

        })
    }

    $scope.eventClickSave = function (file) {
        $scope.form.username = $scope.currentUser.email;
        var dataForm = $scope.form;
        var apiUrl = "/api/MateriSosialisasi";

        console.log(JSON.stringify(dataForm));
        console.log(JSON.stringify(file));
        HttpRequest.post(apiUrl, dataForm).success(function (response) {
            $scope.idMateri = response;

            if (file == undefined) {
                $scope.eventClickCloseModal();
                console.log("1");
                $scope.renderMateriSosialisasi();
            } else {
                console.log("2");
                file.upload = Upload.upload({
                    url: 'http://192.168.100.185:2010/api/UploadMateriSosialisasi',
                    // url: '',
                    data: {
                        idMateri: $scope.idMateri,
                        file: file
                    },
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(JSON.stringify(response.data));
                    });

                    console.log(response.data);
                    $scope.eventClickCloseModal();
                    // Get List Upload File
                    $scope.renderMateriSosialisasi();
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
            $scope.editFile = false;
        });
    }

    $scope.eventClickGetFileUpload = function (id) {
        var apiUrl = "/api/DownloadMateriSosialisasi/" + id;
        document.location.href = webServiceBaseUrl + apiUrl;
    }

    $scope.eventClickAdd = function () {
        $scope.modeEdit = false;
        $scope.modeAdd = true;
    }

    $scope.eventClickEdit = function (id) {
        $scope.modeEdit = true;
        $scope.modeAdd = false;
        $('#myModal').modal({
            show: true
        });

        var apiUrl = "/api/MateriSosialisasi/" + id;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form = response;
            $scope.form.tanggalDokumen = response.tanggalDokumen.toDate();
            // console.log(JSON.stringify($scope.form));
        })

        var apiUrlFile = "/api/UploadMateriSosialisasi/" + id;
        console.log(apiUrlFile);
        HttpRequest.get(apiUrlFile).success(function (response) {
            $scope.listFileMateriSosialisasi = response;

            console.log("testing", $scope.listFileMateriSosialisasi.length);
            console.log($scope.listFileMateriSosialisasi);
            if ($scope.listFileMateriSosialisasi.length > 0) {
                $scope.modeAdd = false;
                $scope.modeEdit = true;
                console.log("1");
            } else {
                $scope.modeAdd = true;
                $scope.modeEdit = false;

                console.log("2");
            }
        })
    }

    $scope.eventClickHapus = function (id) {
        var apiUrl = "/api/MateriSosialisasi/" + id;
        // console.log(apiUrl);
        var hapus = confirm("Are You Sure You Want to Delete This Item?");

        if (hapus) {
            // NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                    $scope.renderMateriSosialisasi();
                })
                .error(function (response, code) {
                    // NProgress.done();

                    var data = {
                        title: "Announcement",
                        exception: response,
                        exceptionCode: code,
                        operation: "DELETE",
                        apiUrl: apiUrl
                    };

                    Helper.notifErrorHttp(data);
                });
        }
    }

    $scope.eventClickHapusFile = function (idKIP, idFile) {
        console.log(idKIP, idFile);
        var apiUrl = "/api/UploadMateriSosialisasi/" + idFile;
        var hapus = confirm("Are You Sure You Want to Delete This File?");

        if (hapus) {
            // NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                    console.log(JSON.stringify(response));
                    // Post Back Form Edit
                    var apiUrl = "/api/MateriSosialisasi/" + response;
                    HttpRequest.get(apiUrl).success(function (response) {
                        // $scope.form = response;
                        // console.log(JSON.stringify($scope.form));
                        $scope.form = response;
                        $scope.form.tanggalDokumen = response.tanggalDokumen.toDate();
                        // console.log(JSON.stringify($scope.form));
                    })

                    // Get List File
                    var apiUrlFile = "/api/UploadMateriSosialisasi/" + response;
                    HttpRequest.get(apiUrlFile).success(function (response) {
                        $scope.listFileMateriSosialisasi = response;
                    })
                })
                .error(function (response, code) {
                    // NProgress.done();

                    var data = {
                        title: "Materi Sosialisasi",
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
        $scope.form.judulDokumen = '',
            $scope.form.summary = '',
            $scope.form.kebijakanDireksi = '',
            $scope.form.nomorDokumen = '',
            $scope.form.tanggalDokumen = '',
            $scope.form.file = ''

    }
    $scope.eventClickCloseModal = function () {
        $scope.clearForm();
        $('#myModal').modal('hide');
        $scope.editFile = false;

    }

    $scope.showEditFile = function () {
        $scope.editFile = true;
    }
    //Start of Application ===============================================================
    $scope.formLoad();
})