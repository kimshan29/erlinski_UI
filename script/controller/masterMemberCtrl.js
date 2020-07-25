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