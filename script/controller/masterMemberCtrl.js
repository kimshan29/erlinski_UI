mainApp.controller("masterMemberCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers, Upload, $timeout) {
    //Variable


    $scope.currentUser = {};
    $scope.form = {};

    $scope.pageSize = 10;
    $scope.currentPage = 1;

    $scope.master = {};
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
    $scope.SelectFile = function (e) {
        console.log(e);

        // var reader = new FileReader();
        // reader.onload = function (e) {
        //     $scope.PreviewImage = e.target.result;
        //     $scope.$apply();
        // };

        // reader.readAsDataURL(e.target.files[0]);
    };
    $scope.renderListData = function () {
        $('.Loading').show();
        $('.page-form').hide();


        $scope.listData = [{
                id: 1,
                nama: "Shandy Tias",
                jenisMember: "Distributor",
                telepon: "082383893",
                kota: "Bogor"
            },
            {
                id: 1,
                nama: "Shandy Tias",
                jenisMember: "Distributor",
                telepon: "082383893",
                kota: "Bogor"
            },
            {
                id: 1,
                nama: "Shandy Tias",
                jenisMember: "Distributor",
                telepon: "082383893",
                kota: "Bogor"
            },
            {
                id: 1,
                nama: "Shandy Tias",
                jenisMember: "Distributor",
                telepon: "082383893",
                kota: "Bogor"
            },
            {
                id: 1,
                nama: "Shandy Tias",
                jenisMember: "Distributor",
                telepon: "082383893",
                kota: "Bogor"
            }
        ];
        console.log(JSON.stringify($scope.listData));

        $('.Loading').hide();
        $('.page-form').show();
        // var apiUrl = "/api/shift";
        // HttpRequest.get(apiUrl).success(function (response) {
        //     $scope.listMasterShift = response.items;
        //     console.log(JSON.stringify($scope.listMasterShift));

        //     $('.Loading').hide();
        //     $('.page-form').show();

        // });
        $scope.getProvinsi();
    }
    $scope.getProvinsi = () => {
        $scope.master.provinsi = [];
    }
    $scope.getKabupaten = (idProvinsi) => {
        console.log("Get Kabupaten kota");

    }

    $scope.getKecamatan = (idKabupaten) => {
        console.log("Get kecamatan");
    }

    $scope.getKelurahan = (idKecamatan) => {
        console.log("Get Desa");
    }

    $scope.eventClickSave = function (file, file2, file3) {

        $('.Loading').show();
        $('.page-form').hide();
        // $scope.form.email = $scope.currentUser.email;
        $scope.form.createdBy = $scope.currentUser.email;

        var dataForm = $scope.form;
        var apiUrl = "/barang/create";

        console.log(JSON.stringify($scope.form));
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

    $scope.eventClickUpdate = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/Shift/updateShift";
        $scope.form.createdBy = $scope.currentUser.email;


        console.log(JSON.stringify($scope.form));


        HttpRequest.post(apiUrl, $scope.form).success(function (response) {
            $('.Loading').hide();
            $('.page-form').show();
            console.log(JSON.stringify($scope.form));
            $scope.renderListData();
            $scope.eventClickCloseModal();
            swal("Data Berhasil Diupdate", {
                icon: "success",
            });
        })
    }

    $scope.eventClickAdd = function () {
        $scope.btnSave = true;
        $scope.btnUpdate = false;

        // alert("test")
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
                        $scope.renderListData();
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
        $scope.renderListData();
    }


    //Start of Application ===============================================================
    $scope.formLoad();
})