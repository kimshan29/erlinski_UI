mainApp.controller("whistleBlowingSystemCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, markers, Upload, $timeout) {
    //Variable

    $scope.currentUser = {};
    $scope.nonInvestigasi = false;
    $scope.investigasi = false;
    $scope.dugaanPelanggaranLainnya_ = false;

    $scope.form = {};
    $scope.listWbs = {};

    //Form Load ======================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }
        // alert("testing");
        // $('#komitmenkepatuhan').attr('disabled', 'disabled').off('click');
        $scope.renderWBS();

    }
    $scope.renderWBS = function () {
        var apiUrl = "/api/WBS";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listWbs.data = response;
            console.log(JSON.stringify($scope.listWbs.data));
        })
    }
    $scope.clearTidakPerluInvestigasi = function () {
        $scope.form.tglInvestigasiAwal = '';
        $scope.form.tglInvestigasiAkhir = '';
        $scope.form.tindakLanjutInvestigasi = '';
        $scope.form.statusInvestigasi = '';
        $scope.form.sanksi = '';
    }
    $scope.eventClickTidakPerluInvestigasi = function () {
        $scope.nonInvestigasi = true;
        $scope.investigasi = false;
        $scope.clearTidakPerluInvestigasi();
    }

    $scope.eventClickPerluInvestigasi = function () {
        $scope.investigasi = true;
        $scope.nonInvestigasi = false;
        $scope.form.nomorBeritaAcara = '';
    }

    $scope.eventClickDugaanPelanggaranLainnya = function () {
        $scope.dugaanPelanggaranLainnya_ = true;
        $scope.form.dugaanPelanggaran = '';
    }

    $scope.eventClickDugaanPelanggaran = function () {
        $scope.dugaanPelanggaranLainnya_ = false;
    }

    $scope.eventClickEdit = function (id) {
        $scope.modeEdit = true;
        $scope.modeAdd = false;
        $scope.modeAddButton = false;
        $scope.modeEditButton = true;
        $('#myModal').modal({
            show: true
        });

        var apiUrl = "/api/WBS/" + id;
        HttpRequest.get(apiUrl).success(function (response) {
            // $scope.form = response;
            console.log(JSON.stringify(response));
            $scope.form = response;
            $scope.form.tglInvestigasiAkhir = response.tglInvestigasiAkhir.toDate();
            $scope.form.tglInvestigasiAwal = response.tglInvestigasiAwal.toDate();
            $scope.form.tglLaporan = response.tglLaporan.toDate();



            if ($scope.form.perluInvestigasi == "Ya") {
                $scope.investigasi = true;
            } else {
                $scope.investigasi = false;
            }
        })

        var apiUrlFile = "/api/UploadWBS/" + id;
        console.log(apiUrlFile);
        HttpRequest.get(apiUrlFile).success(function (response) {
            $scope.listFile = response;
            // console.log("mulai jalan");
            // console.log("testing", $scope.listFile.length);
            if ($scope.listFile.length > 0) {
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
    $scope.eventClickSave = function (files) {

        console.log(JSON.stringify($scope.form));
        $scope.form.username = $scope.currentUser.email;
        var dataForm = $scope.form;
        var apiUrl = "/api/WBS";

        console.log(JSON.stringify(dataForm));
        HttpRequest.post(apiUrl, dataForm).success(function (response) {

            $scope.idWBS = response;

            if (files == undefined) {
                $scope.eventClickCloseModalEdit();
                console.log("Post Upload");
                $scope.renderWBS();
            } else {
                console.log("Post Upload");
                $scope.files = files;
                if (files && files.length) {
                    Upload.upload({
                        url: 'http://192.168.100.185:2010/api/UploadWBS',
                        data: {
                            idWBS: $scope.idWBS,
                            files: files
                        }
                    }).then(function (response) {
                        $timeout(function () {
                            $scope.result = response.data;
                            // console.log(JSON.stringify($scope.result));
                        });
                        // console.log("1");
                        console.log(JSON.stringify(response.data));
                        $scope.eventClickCloseModalEdit();
                        $scope.clearForm();
                        $scope.renderWBS();
                    }, function (response) {
                        if (response.status > 0) {
                            $scope.errorMsg = response.status + ': ' + response.data;
                        }
                        // console.log("2");
                    }, function (evt) {
                        $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                        // console.log("3");
                    });
                }
            }


        });

    }

    $scope.eventClickHapus = function (id) {
        var apiUrl = "/api/WBS/" + id;
        var hapus = confirm("Are You Sure You Want to Delete This Item?");

        if (hapus) {
            // NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                    $scope.renderWBS();
                })
                .error(function (response, code) {
                    // NProgress.done();

                    var data = {
                        title: "WBS",
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
        var apiUrl = "/api/UploadWBS/" + idFile;
        var hapus = confirm("Are You Sure You Want to Delete This File?");

        if (hapus) {
            // NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                    console.log(JSON.stringify(response));
                    // Post Back Form Edit
                    var apiUrl = "/api/WBS/" + response;
                    HttpRequest.get(apiUrl).success(function (response) {
                        // $scope.form = response;
                        // console.log(JSON.stringify($scope.form));
                        $scope.form = response;
                        $scope.form.tglInvestigasiAkhir = response.tglInvestigasiAkhir.toDate();
                        $scope.form.tglInvestigasiAwal = response.tglInvestigasiAwal.toDate();
                        $scope.form.tglLaporan = response.tglLaporan.toDate();



                        if ($scope.form.perluInvestigasi == "Ya") {
                            $scope.investigasi = true;
                        } else {
                            $scope.nonInvestigasi = false;
                        }
                    })

                    // Get List File
                    var apiUrlFile = "/api/UploadWBS/" + response;
                    HttpRequest.get(apiUrlFile).success(function (response) {
                        $scope.listFile = response;
                    })
                })
                .error(function (response, code) {
                    // NProgress.done();

                    var data = {
                        title: "WBS",
                        exception: response,
                        exceptionCode: code,
                        operation: "DELETE",
                        apiUrl: apiUrl
                    };

                    Helper.notifErrorHttp(data);
                });
        }


    }

    $scope.eventClickAdd = function () {
        $scope.form.unit = $scope.currentUser.siteGroup;
        $scope.modeEdit = false;
        $scope.modeAdd = true;

        $scope.modeAddButton = true;
        $scope.modeEditButton = false;
        $scope.investigasi = false;

        var apiUrl = "/api/CreateWBS/" + $scope.currentUser.email + "/";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form.id = response.id;
            $scope.form.noLaporan = response.noLaporan;
            // console.log($scope.form);
        })
    }

    $scope.clearForm = function () {
        $scope.form.unit = '',
            $scope.form.identitasPelapor = '',
            $scope.form.namaPelapor = '',
            $scope.form.tglLaporan = '',
            $scope.form.mediaLaporan = '',
            $scope.form.dugaanPelanggaran = '',
            $scope.form.dugaanPelanggaranLainnya = '',
            $scope.form.deskripsiPelanggaran = '',
            $scope.form.tindakLanjut = '',
            $scope.form.statusTindakLanjut = '',
            $scope.form.perluInvestigasi = '',
            $scope.form.nomorBeritaAcara = '',
            $scope.form.tglInvestigasiAwal = '',
            $scope.form.tglInvestigasiAkhir = '',
            $scope.form.tindakLanjutInvestigasi = '',
            $scope.form.statusInvestigasi = '',
            $scope.form.sanksi = '',
            $scope.form.file = ''
    }
    $scope.eventClickCloseModalEdit = function () {

        $scope.clearForm();

        $('#myModal').modal('hide');
        $scope.editFile = false;
        $scope.renderWBS();
    }

    $scope.eventClickCloseModalAdd = function (id) {
        $scope.clearForm();
        console.log(id);

        $('#myModal').modal('hide');
        $scope.editFile = false;

        var apiUrl = "/api/WBS/" + id;

        HttpRequest.del(apiUrl).success(function (response) {
                $scope.renderWBS();
            })
            .error(function (response, code) {
                // NProgress.done();

                var data = {
                    title: "WBS",
                    exception: response,
                    exceptionCode: code,
                    operation: "DELETE",
                    apiUrl: apiUrl
                };

                Helper.notifErrorHttp(data);
            });

    }

    $scope.eventClickGetFileUpload = function (id) {
        var apiUrl = "/api/DownloadWBS/" + id;
        document.location.href = webServiceBaseUrl + apiUrl;
    }

    $scope.showEditFile = function () {
        $scope.editFile = true;
    }
    //Start of Application ===============================================================
    $scope.formLoad();
})