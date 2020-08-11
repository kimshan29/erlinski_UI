mainApp.controller("pembelianOwnerCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers, Upload, $timeout) {
    //Variable


    $scope.currentUser = {};
    $scope.form = {};

    $scope.pageSize = 10;
    $scope.currentPage = 1;

    $scope.master = {};

    $scope.formTransaksi = false;
    $scope.viewTransaksi = false;
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
        $scope.dataBarang();
    }

    $scope.renderListData = function () {
        $('.Loading').show();
        $('.page-form').hide();



        // console.log(JSON.stringify($scope.listData));


        var apiUrl = "/stokIn";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listData = response.data;
            console.log(JSON.stringify($scope.listData));

            $('.Loading').hide();
            $('.page-form').show();

        });

    }

    $scope.dataBarang = () => {
        var apiUrl = "/barang";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.barang = response;
            // console.log(JSON.stringify($scope.master.barang));

        });
    }

    $scope.master.detailBarang = [];
    $scope.getDetailBarang = (barang) => {
        console.log(barang);

        $scope.master.detailBarang.push(barang);
        $scope.form.barcode = "";

    }

    $scope.hapusDetailBarang = (index) => {
        $scope.master.detailBarang.splice(index, 1);
    }


    $scope.eventClickViewDetail = (id) => {
        var apiUrl = "/stokIn/" + id;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.view = response.data;
            console.log(JSON.stringify($scope.view));

        })
    }

    $scope.eventClickSave = function () {

        $scope.view = {
            tglPembelian: $scope.form.tglPembelian,
            noStockIn: $scope.form.noStockIn,
            detailBarang: $scope.master.detailBarang
        };
        // $('.Loading').show();
        // $('.page-form').hide();
        var apiUrl = "/stokIn/create";

        console.log(JSON.stringify($scope.view));
        $scope.formTransaksi = false;
        $scope.viewTransaksi = true;

        $scope.btnSave = false;
        $scope.btnUpdate = true;
        $scope.btnCancel = true;
        // HttpRequest.post(apiUrl, dataForm).success(function (response) {
        //     $scope.eventClickCloseModal();
        //     swal('', 'Data Berhasil Disimpan', 'success')
        //     $('.Loading').hide();
        //     $('.page-form').show();
        // });
    }

    $scope.eventClickSubmit = function () {

        var dataForm = {
            tglPembelian: $scope.view.tglPembelian,
            noStockIn: $scope.view.noStockIn,
            detailBarang: $scope.master.detailBarang
        };
        // $('.Loading').show();
        // $('.page-form').hide();
        var apiUrl = "/stokIn/create";

        console.log(JSON.stringify(dataForm));
        $scope.formTransaksi = false;
        $scope.viewTransaksi = true;

        $scope.btnSave = false;
        $scope.btnUpdate = true;
        $scope.btnCancel = true;
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
        $scope.btnCancel = false;

        $scope.formTransaksi = true;
        $scope.viewTransaksi = false;

    }

    $scope.eventClickCancel = () => {
        $scope.formTransaksi = true;
        $scope.viewTransaksi = false;

        $scope.btnSave = true;
        $scope.btnUpdate = false;
        $scope.btnCancel = false;
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
        $scope.form = {};

    }

    $scope.eventClickCloseModal = function () {
        $scope.clearForm();
        $('#myModal').modal('hide');
        $scope.renderListData();
    }


    //Start of Application ===============================================================
    $scope.formLoad();
})