mainApp.controller("reportProdukCtrl", function ($scope, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, Upload) {
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
        // var apiUrl = "/api/report/getReportCountingVendor";
        // HttpRequest.get(apiUrl).success(function (response) {
        //     $scope.listData = response.items;
        //     console.log(JSON.stringify($scope.listData));

        // })

        Highcharts.chart('container', {

            title: {
                text: 'Solar Employment Growth by Sector, 2010-2016'
            },

            subtitle: {
                text: 'Source: thesolarfoundation.com'
            },

            yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },

            xAxis: {
                accessibility: {
                    rangeDescription: 'Range: 2010 to 2017'
                }
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },

            series: [{
                name: 'Installation',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }, {
                name: 'Manufacturing',
                data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            }, {
                name: 'Sales & Distribution',
                data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
            }, {
                name: 'Project Development',
                data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
            }, {
                name: 'Other',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });


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