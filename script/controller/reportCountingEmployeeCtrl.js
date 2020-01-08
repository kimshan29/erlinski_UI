mainApp.controller("reportCountingEmployeeCtrl", function ($scope, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, Upload) {
    $scope.Helper = Helper;
    $scope.currentUser = {};
    $scope.master = []

    $scope.formLoad = function () {

        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }
        $scope.renderList();
        $scope.getMasterRole();

    }




    $scope.renderList = function () {
        var apiUrl = "/api/report/reportCountingEmployee";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listData = response.items;
            console.log(JSON.stringify($scope.listData));

        })


        // console.log(JSON.stringify($scope.listVendor));
    }

    $scope.getByEmployee = function (startDate, endDate, idRole) {
        console.log(idRole);

        if (startDate == null && endDate == null) {
            swal("", "Tanggal Awal & Tanggal Akhir Belum di Pilih", "info");
        } else {
            var dAwal = new Date(Date.parse(startDate));
            var date = String(dAwal.getDate()).padStart(2, '0');
            $scope.tglAwal = date + "-" + dAwal.getMonth() + 1 + "-" + dAwal.getFullYear();

            var dAkhir = new Date(Date.parse(endDate));
            var dateAkhir = String(dAkhir.getDate()).padStart(2, '0');

            $scope.tglAkhir = dateAkhir + "-" + dAkhir.getMonth() + 1 + "-" + dAkhir.getFullYear();

            var apiUrl = "/api/report/reportCountingEmployee?startDate=" + $scope.tglAwal + "&endDate=" + $scope.tglAkhir + "&idRole=" + idRole;
            console.log(apiUrl);

            HttpRequest.get(apiUrl).success(function (response) {
                $scope.listData = response.items;
                console.log(JSON.stringify($scope.listData));

            })
        }

    }

    $scope.getMasterRole = function () {
        var apiUrl = "/api/role";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.role = response.items;
            console.log($scope.master.role);

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