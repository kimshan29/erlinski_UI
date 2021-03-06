mainApp.controller("reportRiwayatPenjualanCtrl", function ($scope, $routeParams, $q, Excel, $timeout, $cookies, $filter, Constant, HttpRequest, Model, Helper, Upload) {
    $scope.Helper = Helper;
    $scope.currentUser = {};


    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }

        $scope.renderList();

    }


    $scope.searchByDate = function (startDate, endDate) {
        var dAwal = new Date(Date.parse(startDate));
        var date = String(dAwal.getDate()).padStart(2, '0');
        $scope.tglAwal = dAwal.getFullYear() + "-" + ("0" + (dAwal.getMonth() + 1)).slice(-2) + "-" + date;

        var dAkhir = new Date(Date.parse(endDate));
        var dateAkhir = String(dAkhir.getDate()).padStart(2, '0');

        // console.log(dateAkhir);

        $scope.tglAkhir = dAkhir.getFullYear() + "-" + ("0" + (dAkhir.getMonth() + 1)).slice(-2) + "-" + dateAkhir;
        // console.log(JSON.stringify($scope.tglAkhir));
        // // console.log(endDate);
        var apiUrl = "/report/" + $scope.currentUser.email + "/" + $scope.tglAwal + "/" + $scope.tglAkhir + "/getPenjualanByTanggal";

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listData = response.data;
            console.log(JSON.stringify($scope.listData));

        })

    }


    $scope.renderList = function () {
        var apiUrl = "/report/" + $scope.currentUser.email + "/getPenjualan";
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.totalPenjualan = response.jumlahPenjualan;
            $scope.totalProduk = response.jumlahProduk;
            $scope.listData = response.data;
            console.log(JSON.stringify(response.data));

        })


    }



    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        var exportHref = Excel.tableToExcel(tableId, 'Report Riwayat Penjualan');
        $timeout(function () {
            location.href = exportHref;
        }, 100); // trigger download
    }



    $scope.formLoad();
})