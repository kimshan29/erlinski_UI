mainApp.controller("masterMemberCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers, Upload, $timeout) {
    //Variable


    $scope.currentUser = {};
    $scope.form = {};

    $scope.pageSize = 10;
    $scope.currentPage = 1;

    $scope.master = {};


    $scope.master.jenisKelamin = [{
            id: "1",
            nama: "Laki-laki"
        },
        {
            id: "1",
            nama: "Perempuan"
        }
    ]
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

        $scope.getProvinsi();
        $scope.getMasterRole();
        $scope.getBank();
    }

    $scope.renderListData = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/member/" + $scope.currentUser.email + "/getListMember";
        // console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listData = response.data;
            console.log(JSON.stringify($scope.listData));

            $('.Loading').hide();
            $('.page-form').show();

        });

    }

    $scope.showValidasiNIK = false;

    $scope.getNik = (nik) => {
        // console.log("test");

        var apiUrl = "/member/" + nik + "/getMemberNik";
        HttpRequest.get(apiUrl).success(function (response) {
            console.log(response);
            if (response.data.message == "NIK already exists") {
                $scope.showValidasiNIK = true;
            } else {
                $scope.showValidasiNIK = false;
            }
        })
    }

    $scope.showValidasiHP = false;
    $scope.geHpCek = (hp) => {
        var apiUrl = "/member/" + hp + "/getMemberNoHandphone";
        HttpRequest.get(apiUrl).success(function (response) {
            console.log(response);
            if (response.data.message == "No Handphone already exists") {
                $scope.showValidasiHP = true;
            } else {
                $scope.showValidasiHP = false;
            }
        })
    }

    $scope.showValidasiEmail = false;
    $scope.getCekEmail = (email) => {
        var apiUrl = "/member/" + email + "/getMemberEmail";
        HttpRequest.get(apiUrl).success(function (response) {
            console.log(response);
            if (response.data.message == "Email already exists") {
                $scope.showValidasiEmail = true;
            } else {
                $scope.showValidasiEmail = false;
            }
        })
    }

    $scope.getMasterRole = () => {
        var apiUrl = "/role/" + $scope.currentUser.roleMember + "/getRoleByRoleMember";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.role = response.data;

            console.log(JSON.stringify(response.data));

        })
    }


    $scope.getProvinsi = () => {
        var apiUrl = "/address/getProvinsi";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.provinsi = response.data;
            console.log(JSON.stringify(response.data));

        })

    }

    $scope.getBank = () => {
        var apiUrl = "/address/getBank";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.bank = response.data;
            console.log(JSON.stringify(response.data));

        })

    }


    $scope.getKabupaten = (idProvinsi) => {
        console.log(idProvinsi);

        var apiUrl = "/address/" + idProvinsi + "/getKabupatenByIdProvinsi";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.kota = response.data;
            // console.log(JSON.stringify(response.data));

        })
        console.log("Get Kabupaten kota");

    }

    $scope.getKecamatan = (idKabupaten) => {
        var apiUrl = "/address/" + idKabupaten + "/getKecamatanByIdKabupaten";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.kecamatan = response.data;
            // console.log(JSON.stringify(response.data));
        })
        console.log("Get kecamatan");
    }

    $scope.getKelurahan = (idKecamatan) => {
        var apiUrl = "/address/" + idKecamatan + "/getKelurahanByIdKecamatan";
        // console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.desa = response.data;
            // console.log(JSON.stringify(response.data));
        })
        console.log("Get Desa");
    }

    $scope.eventClickSave = function (fileKtp, fileBuktiTransfer) {

        $('.Loading').show();
        $('.page-form').hide();
        // $scope.form.email = $scope.currentUser.email;
        $scope.form.createdBy = $scope.currentUser.email;
        $scope.form.registeredBy = $scope.currentUser.email;
        var dataForm = $scope.form;
        var apiUrl = "/member/create";

        console.log(JSON.stringify($scope.form));
        HttpRequest.post(apiUrl, dataForm).success(function (response) {
            $scope.idMember = response.data.id;
            // console.log(response.data.id);


            if (fileKtp == undefined || fileBuktiTransfer == undefined || "") {
                $scope.eventClickCloseModal();
                console.log("1");
                $scope.renderListData();
            } else {
                // Upload Avatar
                // file.upload = Upload.upload({
                //     url: 'https://api.myerlinski.com/member/uploadAvatarMember',
                //     // url: '',
                //     data: {
                //         id: $scope.idMember,
                //         file: file
                //     },
                // });

                // file.upload.then(function (response) {
                //     $timeout(function () {
                //         file.result = response.data;
                //         console.log(JSON.stringify(response.data));
                //     });


                // }, function (response) {
                //     if (response.status > 0)
                //         $scope.errorMsg = response.status + ': ' + response.data;
                //     console.log(response.data);

                // }, function (evt) {
                //     // Math.min is to fix IE which reports 200% sometimes
                //     file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                // });

                // Upload KTP
                fileKtp.upload = Upload.upload({
                    url: 'https://api.myerlinski.com/member/uploadMemberKtp',
                    // url: '',
                    data: {
                        id: $scope.idMember,
                        fileKtp: fileKtp
                    },
                });

                fileKtp.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(JSON.stringify(response.data));
                    });


                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    console.log(response.data);

                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    fileKtp.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });

                // Upload Bukti Transfer
                fileBuktiTransfer.upload = Upload.upload({
                    url: 'https://api.myerlinski.com/member/uploadMemberBuktiTransfer',
                    // url: '',
                    data: {
                        id: $scope.idMember,
                        fileBuktiTransfer: fileBuktiTransfer
                    },
                });

                fileBuktiTransfer.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(JSON.stringify(response.data));
                    });


                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    console.log(response.data);

                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    fileBuktiTransfer.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });
            }


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
            // console.log(JSON.stringify($scope.form));
        });
    }

    $scope.eventClickUpdate = function (fileKtp, fileBuktiTransfer) {
        $('.Loading').show();
        $('.page-form').hide();

        $scope.form.updatedBy = $scope.currentUser.email;


        // console.log(JSON.stringify($scope.form));

        // console.log(fileKtp);
        // console.log(fileBuktiTransfer);


        var apiUrl = "/member/" + $scope.form.id;
        HttpRequest.put(apiUrl, $scope.form).success(function (response) {
            $scope.idMember = $scope.form.id;
            // console.log(response.data.id);


            if (fileKtp == undefined || fileBuktiTransfer == undefined || "") {
                $scope.eventClickCloseModal();
                console.log("1");
                $scope.renderListData();
            } else {
                // Upload Avatar
                // file.upload = Upload.upload({
                //     url: 'https://api.myerlinski.com/member/uploadAvatarMember',
                //     // url: '',
                //     data: {
                //         id: $scope.idMember,
                //         file: file
                //     },
                // });

                // file.upload.then(function (response) {
                //     $timeout(function () {
                //         file.result = response.data;
                //         console.log(JSON.stringify(response.data));
                //     });


                // }, function (response) {
                //     if (response.status > 0)
                //         $scope.errorMsg = response.status + ': ' + response.data;
                //     console.log(response.data);

                // }, function (evt) {
                //     // Math.min is to fix IE which reports 200% sometimes
                //     file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                // });

                // Upload KTP
                fileKtp.upload = Upload.upload({
                    url: 'https://api.myerlinski.com/member/uploadMemberKtp',
                    // url: '',
                    data: {
                        id: $scope.idMember,
                        fileKtp: fileKtp
                    },
                });

                fileKtp.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(JSON.stringify(response.data));
                    });


                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    console.log(response.data);

                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    fileKtp.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });

                // Upload Bukti Transfer
                fileBuktiTransfer.upload = Upload.upload({
                    url: 'https://api.myerlinski.com/member/uploadMemberBuktiTransfer',
                    // url: '',
                    data: {
                        id: $scope.idMember,
                        fileBuktiTransfer: fileBuktiTransfer
                    },
                });

                fileBuktiTransfer.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(JSON.stringify(response.data));
                    });


                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    console.log(response.data);

                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    fileBuktiTransfer.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });
            }


            // Get List Upload File
            swal("Data Berhasil Diupdate", {
                icon: "success",
            });
            console.log(response.data);
            $scope.renderListData();
            $scope.eventClickCloseModal();
            $scope.clearForm();


            $('.Loading').hide();
            $('.page-form').show();
            // console.log(JSON.stringify($scope.form));
        });
    }

    $scope.eventClickAdd = function () {
        $scope.btnSave = true;
        $scope.btnUpdate = false;

        // alert("test")
    }

    $scope.eventClickEdit = function (id) {

        $scope.btnSave = false;
        $scope.btnUpdate = true;
        var apiUrl = "/member/" + id;
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form = response.data;
            $scope.form.tglLahir = $scope.form.tglLahir.toDate();
            // $scope.getProvinsi();
            $scope.getKabupaten(response.data.idProvinsi);
            $scope.getKecamatan(response.data.idKabupaten);
            $scope.getKelurahan(response.data.idKecamatan);
            console.log($scope.form);
            console.log(JSON.stringify($scope.form));

        })

        // $scope.form = {
        //     "id": 4,
        //     "idMember": "ERLINSKI00004",
        //     "username": "",
        //     "namaLengkap": "Kimshan",
        //     "noHandphone": "081586693839",
        //     "jenisKelamin": "Laki-laki",
        //     "tglLahir": "1990-07-26 00:00:00",
        //     "idProvinsi": "32",
        //     "idKabupaten": "3201",
        //     "idKecamatan": "320114",
        //     "idKelurahan": "",
        //     "kodePos": "16640",
        //     "alamat": "Jl. Damang",
        //     "noRekening": "1231234",
        //     "bank": "009",
        //     "nik": "2134234234",
        //     "file": "",
        //     "email": "kimshan29@gmail.com",
        //     "roleMember": "3",
        //     "instagram": "kimshan",
        //     "facebook": "kimshan",
        //     "twitter": "kimshan",
        //     "latitude": "-8393000",
        //     "longitude": "837494949",
        //     "registeredBy": "shandytias29@gmail.com",
        //     "userIsNew": "1",
        //     "delete": "0",
        //     "createdBy": "shandytias29@gmail.com",
        //     "createdDate": "2020-07-26 11:40:33",
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
                    var apiUrl = "/member/" + id;
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
        $scope.showValidasiEmail = false;
        $scope.showValidasiHP = false;
        $scope.showValidasiNIK = false;
    }

    $scope.eventClickCloseModal = function () {
        $scope.clearForm();
        $('#myModal').modal('hide');
        $scope.renderListData();
    }


    //Start of Application ===============================================================
    $scope.formLoad();
})