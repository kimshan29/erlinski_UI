mainApp.controller("scheduleVendorCtrl", function ($route, $scope, $routeParams, $q, $http, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, Helper, Upload, $timeout) {
    $scope.Helper = Helper;
    $scope.currentUser = {};

    $scope.master = {};
    $scope.form = {};
    $scope.pageSize = 10;
    $scope.currentPage = 1;

    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }
        $scope.renderList();
        $scope.renderVendor();
        $scope.getJenisMenu();

    }

    $scope.getListMenuMakanan = (idVendor) => {
        // list Menu Utama
        var apiUrl = "/api/scheduleVendor/getMenuUtama?idVendor=" + idVendor;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.menuUtama = response.items;
            console.log(JSON.stringify($scope.master.menuUtama));


        })
        // list Menu Tambahan
        var apiUrl = "/api/scheduleVendor/getMenuTambahan?idVendor=" + idVendor;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.menuTambahan = response.items;

        })
        // List Sayur
        var apiUrl = "/api/scheduleVendor/getSayur?idVendor=" + idVendor;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.sayur = response.items;

        })
        // list Buah
        var apiUrl = "/api/scheduleVendor/getBuah?idVendor=" + idVendor;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.buah = response.items;

        })
    }

    $scope.viewDetail = (idSchedule) => {
        var apiUrl = "/api/scheduleVendor/detailMenuMakanan?idSchedule=" + idSchedule;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listDetailMenuMakanan = response;
        })

    }
    $scope.getDateVendor = (sift, idVendor) => {
        // Date Range
        console.log(sift);

        var apiUrl = "/api/scheduleVendor/getDate?shift=" + sift + "&idVendor=" + idVendor;
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.dateRange = response.items;
            console.log(JSON.stringify($scope.master.dateRange));

        })
    }

    $scope.getDateVendorEdit = (sift, idVendor, idSchedule) => {
        // Date Range
        // console.log(sift);

        var apiUrl = "/api/scheduleVendor/getDate?shift=" + sift + "&idVendor=" + idVendor + "&idSchedule=" + idSchedule;
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.dateRange = response.items;
            console.log(JSON.stringify($scope.master.dateRange));

        })
    }
    $scope.getDataSift = (idVendor) => {

        console.log(idVendor);

        // List Sift
        var apiUrl = "/api/scheduleVendor/getShift?idVendor=" + idVendor;
        console.log("url shift:" + apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.shift = response.items;
            console.log(JSON.stringify($scope.master.shift));

        })

        $scope.getListMenuMakanan(idVendor);
    }

    $scope.renderMenuMakanan = function (keyword, idVendor, idJenis) {
        var apiUrl = "/api/menu/SearchMenuMakanan?namaMenu=" + keyword + "&idVendor=" + idVendor + "&jenisMenu=" + idJenis;
        console.log(apiUrl);

        return HttpRequest.get(apiUrl).then(function (response) {
            console.log(JSON.stringify(response.data));
            // $scope.user.input.email = response.data.email;
            // console.log(JSON.stringify($scope.user.input.email));
            return response.data;
        });
    }

    $scope.renderMenuTambahan = function (keyword) {
        var apiUrl = "/api/menu/SearchMenuTambahan?namatambahan=" + keyword;
        return HttpRequest.get(apiUrl).then(function (response) {

            return response.data;
        });
    }
    $scope.renderList = function () {
        var apiUrl = "/api/scheduleVendor?username=" + $scope.currentUser.username;
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listData = response.items;
            console.log(JSON.stringify($scope.listData));

        })
    }

    $scope.renderVendor = function () {
        var apiUrl = "/api/vendor?username=" + $scope.currentUser.username;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.vendor = response.items;
            console.log(JSON.stringify($scope.listData));
        })
    }

    $scope.eventClickAdd = function () {

        $scope.btnSave = true;
        $scope.btnUpdate = false;
    }
    $scope.eventClickSave = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/scheduleVendor/addScheduleVendor";
        $scope.form.createdBy = $scope.currentUser.username;



        console.log(JSON.stringify($scope.form));


        HttpRequest.post(apiUrl, $scope.form).success(function (response) {


            $('.Loading').hide();
            $('.page-form').show();
            $scope.renderList();
            $scope.closeModal();
            swal("Data Berhasil Disimpan", {
                icon: "success",
            });



        })

    }

    $scope.getJenisMenu = function () {
        var apiUrl = "/api/jenisMenu";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.jenisMenu = response.items;
            console.log(JSON.stringify($scope.master.jenisMenu));

        })
    }
    $scope.eventClickUpdate = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/scheduleVendor/updateScheduleVendor";
        $scope.form.createdBy = $scope.currentUser.username;

        console.log(JSON.stringify($scope.form));

        HttpRequest.post(apiUrl, $scope.form).success(function (response) {
            $('.Loading').hide();
            $('.page-form').show();
            $scope.renderList();
            $scope.closeModal();
            swal("Data Berhasil Diupdate", {
                icon: "success",
            });
        })
    }

    $scope.eventClickEdit = function (id) {
        $scope.btnSave = false;
        $scope.btnUpdate = true;

        var apiUrl = "/api/scheduleVendor?id=" + id;
        console.log(apiUrl);


        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form = response.items;
            console.log(JSON.stringify($scope.form));


            var idVendor = $scope.form.vendor;
            $scope.getDataSift(idVendor)

            $scope.getDateVendorEdit($scope.form.shift, idVendor, $scope.form.id);

            // console.log(JSON.stringify($scope.form.shift));

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
                    var apiUrl = "/api/scheduleVendor/deleteScheduleVendor";
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

    $scope.form.detailMenuMakanan = [];

    $scope.addDetailMenuMakanan = (jenisMenu, namaMenu, stok) => {
        $scope.clearFormDetailMenu();

        console.log(jenisMenu);

        $scope.form.detailMenuMakanan.push({
            idJenisMenu: jenisMenu.id,
            jenisMenu: jenisMenu.namaJenisMenu,
            namaMenu: namaMenu.namaMenu,
            idMenu: namaMenu.id,
            stok: stok
        });


    }

    $scope.deleteDetailMenuMakanan = (index) => {
        $scope.form.detailMenuMakanan.splice(index, 1);
    }

    $scope.clearFormDetailMenu = () => {
        $scope.jenisMenu = "";
        $scope.namaMenu = "";
        $scope.stok = "";

    }



    $scope.closeModal = function () {
        $('#myModal').modal('hide');
        $scope.clearForm();
    }
    $scope.clearForm = function () {
        $scope.form.id = "";
        $scope.form.vendor = "";
        $scope.form.date = "";
        $scope.form.shift = "";
        $scope.form.menuUtama = "";
        $scope.form.menuTambahan = "";
        $scope.form.buah = "";
        $scope.form.sayur = "";
        $scope.form.detailMenuMakanan = [];
    }

    $scope.formLoad();
})