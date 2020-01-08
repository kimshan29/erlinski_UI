mainApp.controller("reportCountingVendorCtrl", function ($scope, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, Upload) {
    $scope.Helper = Helper;
    $scope.currentUser = {};

    $scope.master = [];
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }

        $scope.renderList();
        $scope.renderVendor();

    }




    $scope.renderList = function () {
        var apiUrl = "/api/report/getReportCountingVendor";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listData = response.items;
            console.log(JSON.stringify($scope.listData));

        })


    }

    $scope.getByVendor = function (startDate, endDate, idVendor) {

        if (startDate == null && endDate == null) {
            swal("", "Tanggal Awal & Tanggal Akhir Belum di Pilih", "info");
        } else {
            var dAwal = new Date(Date.parse(startDate));
            var date = String(dAwal.getDate()).padStart(2, '0');
            $scope.tglAwal = date + "-" + dAwal.getMonth() + 1 + "-" + dAwal.getFullYear();

            var dAkhir = new Date(Date.parse(endDate));
            var dateAkhir = String(dAkhir.getDate()).padStart(2, '0');

            $scope.tglAkhir = dateAkhir + "-" + dAkhir.getMonth() + 1 + "-" + dAkhir.getFullYear();

            var apiUrl = "/api/report/getReportCountingVendor?startDate=" + $scope.tglAwal + "&endDate=" + $scope.tglAkhir + "&idVendor=" + idVendor;
            console.log(apiUrl);

            HttpRequest.get(apiUrl).success(function (response) {
                $scope.listData = response.items;
                console.log(JSON.stringify($scope.listData));

            })
        }

    }

    $scope.renderVendor = function () {
        var apiUrl = "/api/vendor?username=" + $scope.currentUser.username;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.vendor = response.items;
            // console.log(JSON.stringify($scope.listData));
        })
    }

    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        var exportHref = Excel.tableToExcel(tableId, 'HistoryProjectMilestone');
        $timeout(function () {
            location.href = exportHref;
        }, 100); // trigger download
    }



    $scope.formLoad();
})