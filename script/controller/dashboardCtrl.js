mainApp.controller("dashboardCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers) {
    //Variable


    $scope.currentUser = {};
    //    ========================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }
        // alert("testing");
        // $('#komitmenkepatuhan').attr('disabled', 'disabled').off('click');

        console.log(JSON.stringify($scope.currentUser));



        // Create the chart
        Highcharts.chart('chartDaily', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Grafik Daily'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                        name: "Employee",
                        y: 40,
                        drilldown: "Employee"
                    },
                    {
                        name: "Third Party",
                        y: 30,
                        drilldown: "Third Party"
                    },
                    {
                        name: "Visitor",
                        y: 30,
                        drilldown: "Visitor"
                    }
                ]
            }]
        });

        // Weekly
        Highcharts.chart('chartWeekly', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Grafik Weekly'
            },
            subtitle: {
                text: ''
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                }
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Jumlah Yang Makan'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },

            series: [{
                name: "Browsers",
                colorByPoint: true,
                data: [{
                        name: "Employee",
                        y: 40,
                        drilldown: "Employee"
                    },
                    {
                        name: "Third Party",
                        y: 30,
                        drilldown: "Third Party"
                    },
                    {
                        name: "Visitor",
                        y: 30,
                        drilldown: "Visitor"
                    }
                ]
            }]

        });

        // Monthly
        Highcharts.chart('chartMonthly', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Grafik Monthly'
            },
            subtitle: {
                text: ''
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                }
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Jumlah Yang Makan'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },

            series: [{
                name: "Browsers",
                colorByPoint: true,
                data: [{
                        name: "Employee",
                        y: 40,
                        drilldown: "Employee"
                    },
                    {
                        name: "Third Party",
                        y: 30,
                        drilldown: "Third Party"
                    },
                    {
                        name: "Visitor",
                        y: 30,
                        drilldown: "Visitor"
                    }
                ]
            }]

        });

        // Yearly
        Highcharts.chart('chartYearly', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Grafik Yearly'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                        name: "Employee",
                        y: 40,
                        drilldown: "Employee"
                    },
                    {
                        name: "Third Party",
                        y: 30,
                        drilldown: "Third Party"
                    },
                    {
                        name: "Visitor",
                        y: 30,
                        drilldown: "Visitor"
                    }
                ]
            }]
        });

    }


    //Start of Application ===============================================================
    $scope.formLoad();
})