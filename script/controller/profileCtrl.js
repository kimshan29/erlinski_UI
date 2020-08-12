mainApp.controller("profileCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, $location, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers, Upload, $timeout) {
    //Variable


    $scope.currentUser = {};
    $scope.form = {};

    $scope.pageSize = 10;
    $scope.currentPage = 1;

    $scope.profile = {};
    $scope.profile.tab1 = false;
    $scope.profile.tab2 = false;

    $scope.master = {};
    //Form Load ======================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }

        // console.log(JSON.stringify($scope.currentUser));

        // alert("testing");
        // $('#komitmenkepatuhan').attr('disabled', 'disabled').off('click');

        $scope.renderData();
        $scope.getProvinsi();
        $scope.getBank();
        $scope.getIdentitas();
    }

    $scope.renderData = function () {
        $('.Loading').show();
        $('.page-form').hide();

        var apiUrl = "/member/" + $scope.currentUser.email + "/getMemberByUsername";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form = response.data;
            // console.log(JSON.stringify($scope.form));


            console.log(JSON.stringify($scope.form));
            // $scope.form.tglLahir = $scope.form.tglLahir.toDate();
            // $scope.getProvinsi();
            $scope.getKabupaten(response.data.idProvinsi);
            $scope.getKecamatan(response.data.idKabupaten);
            $scope.getKelurahan(response.data.idKecamatan);
            console.log(JSON.stringify($scope.form));

            $('.Loading').hide();
            $('.page-form').show();

        });

    }

    $scope.getIdentitas = () => {
        var apiUrl = "/member/" + $scope.currentUser.email + "/getMemberByUsername";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.data = response.data;


            // $scope.dat.tglLahir = $scope.form.tglLahir.toDate();
            // // $scope.getProvinsi();
            // $scope.getKabupaten(response.data.idProvinsi);
            // $scope.getKecamatan(response.data.idKabupaten);
            // $scope.getKelurahan(response.data.idKecamatan);
            // console.log(JSON.stringify($scope.form));


        });
    }

    $scope.getMasterRole = () => {
        var apiUrl = "/role/" + $scope.currentUser.roleMember + "/getRoleByRoleMember";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.role = response.data;

            // console.log(JSON.stringify(response.data));

        })
    }


    $scope.getProvinsi = () => {
        var apiUrl = "/address/getProvinsi";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.provinsi = response.data;
            // console.log(JSON.stringify(response.data));

        })

    }

    $scope.getBank = () => {
        var apiUrl = "/address/getBank";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.bank = response.data;
            // console.log(JSON.stringify(response.data));

        })

    }


    $scope.getKabupaten = (idProvinsi) => {
        console.log(idProvinsi);

        var apiUrl = "/address/" + idProvinsi + "/getKabupatenByIdProvinsi";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.kota = response.data;
            // console.log(JSON.stringify(response.data));

        })
        // console.log("Get Kabupaten kota");

    }

    $scope.getKecamatan = (idKabupaten) => {
        var apiUrl = "/address/" + idKabupaten + "/getKecamatanByIdKabupaten";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.kecamatan = response.data;
            // console.log(JSON.stringify(response.data));
        })
        // console.log("Get kecamatan");
    }

    $scope.getKelurahan = (idKecamatan) => {
        var apiUrl = "/address/" + idKecamatan + "/getKelurahanByIdKecamatan";
        // console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.desa = response.data;
            // console.log(JSON.stringify(response.data));
        })
        // console.log("Get Desa");
    }

    $scope.updatePassword = () => {
        $scope.dataForm = {
            "username": $scope.currentUser.email,
            "oldPassword": $scope.pass.oldPassword,
            "newPassword": $scope.pass.newPassword,
            "confirmPassword": $scope.pass.confirmPassword
        }

        var apiUrl = "/member/changePassword";

        HttpRequest.post(apiUrl, $scope.dataForm).success(function (response) {
            if (response.data.message == "Current Password is failed") {
                swal("Password Lama Anda Tidak Sesuai", {
                    icon: "warning",
                });
            } else if (response.data.message == "Password & Confirm Password is not match") {
                swal("Password & Confirm Password Anda Tidak Sama", {
                    icon: "warning",
                });
            } else {
                swal("Password Anda Berhasil Di Update", {
                    icon: "success",
                });

                $location.path("/dashboard")
            }

        })

        // console.log(JSON.stringify($scope.dataForm));

    }
    $scope.eventClickSave = function () {

        var dataForm = $scope.form;
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/Shift/addShift";

        console.log(JSON.stringify(dataForm));
        HttpRequest.post(apiUrl, dataForm).success(function (response) {
            $scope.eventClickCloseModal();
            swal('', 'Data Berhasil Disimpan', 'success')
            $('.Loading').hide();
            $('.page-form').show();
        });
    }

    $scope.eventClickUpdate = function (fileKtp) {
        $('.Loading').show();
        $('.page-form').hide();

        $scope.form.updatedBy = $scope.currentUser.email;


        console.log(JSON.stringify($scope.form));



        var apiUrl = "/member/" + $scope.form.id;
        HttpRequest.put(apiUrl, $scope.form).success(function (response) {
            $scope.idMember = $scope.form.id;
            // console.log(response.data.id);


            if (fileKtp == undefined || "") {
                $scope.eventClickCloseModal();
                console.log("1");
                $scope.renderData();
                $scope.getIdentitas();
            } else {

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


            }


            // Get List Upload File
            swal("Data Berhasil Diupdate", {
                icon: "success",
            });
            console.log(response.data);
            $scope.renderData();
            $scope.getIdentitas();

            $('.Loading').hide();
            $('.page-form').show();
            // console.log(JSON.stringify($scope.form));
        });
    }
    $scope.eventClickAdd = function () {
        $scope.btnSave = true;
        $scope.btnUpdate = false;
    }

    $scope.eventClickEdit = function (id) {

        $scope.btnSave = false;
        $scope.btnUpdate = true;
        var apiUrl = "/api/Shift?id=" + id;
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form = response.items;

            console.log(JSON.stringify($scope.form));

        })


    }

    $scope.backMaps = () => {
        $location.path("/dashboard")
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
                    var apiUrl = "/api/Shift/deleteShift";
                    HttpRequest.post(apiUrl, $scope.dataForm).success(function () {
                        $('.Loading').hide();
                        $('.page-form').show();
                        swal("Data Berhasil Dihapus!", {
                            icon: "success",
                        });
                        $scope.renderData();
                    })

                } else {
                    // swal("Data To");
                }
            });
    }


    $scope.clearForm = function () {
        $scope.form.id = '';
        $scope.form.namaShift = '';
        $scope.form.jamMulai = '';
        $scope.form.jamSelesai = '';

    }

    $scope.eventClickCloseModal = function () {
        $scope.clearForm();
        $('#myModal').modal('hide');
        $scope.renderData();
    }


    //Start of Application ===============================================================
    $scope.formLoad();
})