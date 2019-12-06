mainApp.controller("pelayananKipCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, markers, Upload, $timeout) {
    //Variable

    $scope.currentUser = {};
    $scope.alasanTidakMemberikanData = false;

    $scope.form = {};
    $scope.listKip = {};
    $scope.listInstansi = [{
            id: "1",
            instansi: "LSM"
        },
        {
            id: "2",
            instansi: "Pendidikan"
        }, {
            id: "2",
            instansi: "Pendidikan 1"
        }, {
            id: "2",
            instansi: "Pendidikan 2"
        }, {
            id: "2",
            instansi: "Pendidikan 3"
        }, {
            id: "2",
            instansi: "Pendidikan 4"
        }
    ];

    $scope.listDataYangDiminta = [{
            id: "1",
            keterangan: "Surat"
        },
        {
            id: "2",
            keterangan: "Fax"
        },
        {
            id: "3",
            keterangan: "Email"
        },
        {
            id: "3",
            keterangan: "Email 1"
        },
        {
            id: "3",
            keterangan: "Email 2"
        }
    ];

    $scope.listAlasan = [{
            id: "",
            alasan: "Data Tidak Ada"
        },
        {
            id: "",
            alasan: "Rahasia"
        }
    ]

    // console.log(JSON.stringify($scope.listKip.data));
    //Form Load ======================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }
        // alert("testing");
        // $('#komitmenkepatuhan').attr('disabled', 'disabled').off('click');
        $scope.renderListKip();

    }

    $scope.renderListKip = function () {
        var apiUrl = "/api/KIP";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listKip.data = response;
            console.log(JSON.stringify($scope.listKip));
            // console.log("1");
        })
    }
    $scope.evenClickMemberikanData = function () {
        $scope.alasanTidakMemberikanData = false;
        $scope.form.alasanTidakMemberikanData = '';
    }

    $scope.evenClickTidakMemberikanData = function () {
        $scope.alasanTidakMemberikanData = true;
    }

    $scope.eventClickAdd = function () {
        $scope.form.unit = $scope.currentUser.siteGroup;
        $scope.modeEdit = false;
        $scope.modeAdd = true;
        $('#uploadFileEdit').hide();
        // console.log($scope.currentUser);
    }


    $scope.eventClickEdit = function (id) {
        $scope.modeEdit = true;
        $scope.modeAdd = false;
        $('#uploadFileEdit').hide();

        $('#myModal').modal({
            show: true
        });

        var apiUrl = "/api/KIP/" + id;
        HttpRequest.get(apiUrl).success(function (response) {
            // $scope.form = response;
            console.log(JSON.stringify(response));
            $scope.form = {
                id: response.id,
                unit: response.unit,
                instansi: response.instansi,
                nomorSurat: response.nomorSurat,
                tglSurat: response.tglSurat.toDate(),
                dataYangDiminta: response.dataYangDiminta,
                deskripsi: response.deskripsi,
                statusPermintaan: response.statusPermintaan,
                tglPemberianData: response.tglPemberianData.toDate(),
                alasanTidakMemberikanData: response.alasanTidakMemberikanData,
                keterangan: response.keterangan
            }
            // console.log(JSON.stringify($scope.form));
            if ($scope.form.statusPermintaan == "Tidak Diberikan") {
                $scope.alasanTidakMemberikanData = true;
            } else {
                $scope.alasanTidakMemberikanData = false;
            }
        })

        //var f = $('#fileEdit_').html().length;


        var apiUrlFile = "/api/UploadKIP/" + id;
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


    $scope.eventClickHapus = function (id) {
        var apiUrl = "/api/KIP/" + id;
        var hapus = confirm("Are You Sure You Want to Delete This Item?");

        if (hapus) {
            // NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                    $scope.renderListKip();
                })
                .error(function (response, code) {
                    // NProgress.done();

                    var data = {
                        title: "KIP",
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
        var apiUrl = "/api/UploadKIP/" + idFile;
        var hapus = confirm("Are You Sure You Want to Delete This File?");

        if (hapus) {
            // NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                    console.log(JSON.stringify(response));
                    // Post Back Form Edit
                    var apiUrl = "/api/KIP/" + response;
                    HttpRequest.get(apiUrl).success(function (response) {
                        // $scope.form = response;
                        // console.log(JSON.stringify($scope.form));
                        $scope.form = {
                            id: response.id,
                            unit: response.unit,
                            instansi: response.instansi,
                            nomorSurat: response.nomorSurat,
                            tglSurat: response.tglSurat.toDate(),
                            dataYangDiminta: response.dataYangDiminta,
                            deskripsi: response.deskripsi,
                            statusPermintaan: response.statusPermintaan,
                            tglPemberianData: response.tglPemberianData.toDate(),
                            alasanTidakMemberikanData: response.alasanTidakMemberikanData,
                            keterangan: response.keterangan
                        }
                        // console.log(JSON.stringify($scope.form));
                        if ($scope.form.statusPermintaan == "Tidak Diberikan") {
                            $scope.alasanTidakMemberikanData = true;
                        } else {
                            $scope.alasanTidakMemberikanData = false;
                        }
                    })

                    // Get List File
                    var apiUrlFile = "/api/UploadKIP/" + response;
                    HttpRequest.get(apiUrlFile).success(function (response) {
                        $scope.listFile = response;
                    })
                })
                .error(function (response, code) {
                    // NProgress.done();

                    var data = {
                        title: "KIP",
                        exception: response,
                        exceptionCode: code,
                        operation: "DELETE",
                        apiUrl: apiUrl
                    };

                    Helper.notifErrorHttp(data);
                });
        }


    }
    $scope.eventClickSave = function (file) {
        $scope.form.username = $scope.currentUser.email;
        var dataForm = $scope.form;
        var apiUrl = "/api/KIP";

        console.log(JSON.stringify(dataForm));
        console.log(JSON.stringify(file));
        HttpRequest.post(apiUrl, dataForm).success(function (response) {
            $scope.idKIP = response;

            if (file == undefined) {
                $scope.eventClickCloseModal();
                console.log("1");
                $scope.renderListKip();
            } else {
                console.log("2");
                file.upload = Upload.upload({
                    url: 'http://192.168.100.185:2010/api/UploadKIP',
                    // url: '',
                    data: {
                        // id: $scope.id,
                        idKIP: $scope.idKIP,
                        file: file
                    },
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(JSON.stringify(response.data));
                    });

                    // Get List Upload File
                    // var apiUrl = "/api/KIP";
                    // HttpRequest.get(apiUrl).success(function (response) {
                    //     $scope.listKip.data = response;

                    // })

                    console.log(response.data);
                    $scope.eventClickCloseModal();
                    $scope.renderListKip();
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    console.log(response.data);

                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });
            }
            $scope.editFile = false;
        });



    }

    $scope.selectInstansi = function (i) {
        // console.log(i);
        $('#txtDari').focus();
        $scope.form.instansi = i.instansi;
        // console.log($scope.form.instansi);
        $(".listInstansi").hide(100);

    }

    $scope.selectDataYangDiminta = function (u) {
        $('#dataYangDiminta').focus();
        $scope.form.dataYangDiminta = u.keterangan;
        $(".listDataYangDiminta").hide(100);
    }

    $scope.selectAlasan = function (a) {
        $('#alasanTidakMemberikanData').focus();
        $scope.form.alasanTidakMemberikanData = a.alasan;
        $(".listAlasan").hide(100);
    }



    $scope.eventClickGetFileUpload = function (id) {
        var apiUrl = "/api/DownloadKIP/" + id;
        document.location.href = webServiceBaseUrl + apiUrl;
    }

    $scope.clearForm = function () {
        $scope.form.instansi = '',
            $scope.form.nomorSurat = '',
            $scope.form.tglSurat = '',
            $scope.form.dataYangDiminta = '',
            $scope.form.deskripsi = '',
            $scope.form.statusPermintaan = '',
            $scope.form.tglPemberianData = '',
            $scope.form.alasanTidakMemberikanData = '',
            $scope.form.keterangan = '',
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