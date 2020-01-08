mainApp.controller("reportAllCtrl", function ($scope, $routeParams, $q, Excel, $timeout, $cookies, $filter, Constant, HttpRequest, Model, Helper, Upload) {
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
        $scope.tglAwal = date + "-" + dAwal.getMonth() + 1 + "-" + dAwal.getFullYear();

        var dAkhir = new Date(Date.parse(endDate));
        var dateAkhir = String(dAkhir.getDate()).padStart(2, '0');

        $scope.tglAkhir = dateAkhir + "-" + dAkhir.getMonth() + 1 + "-" + dAkhir.getFullYear();
        // console.log(JSON.stringify(tglAwal));
        // console.log(endDate);
        var apiUrl = "/api/report/getReportAll?startDate=" + $scope.tglAwal + "&endDate=" + $scope.tglAkhir;
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listData = response.items;
            console.log(JSON.stringify($scope.listData));

        })

    }


    $scope.renderList = function () {
        var apiUrl = "/api/report/getReportAll";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listData = response.items;
            console.log(JSON.stringify($scope.listData));

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