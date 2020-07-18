mainApp.controller("mainNavigationCtrl", function ($scope, $routeParams, $cookies, $interval, $sce, HttpRequest, Helper, Constant, Model) {

    $scope.currentUser = {};
    $scope.totalNotifications;
    $scope.data = [];
    $scope.navigationHtml = [];

    //Procedures =====================================================================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }

        $scope.renderMenu();
    };


    $scope.renderMenu = function () {
        // var apiUrlMenu = "/api/user/GetHakAksesMenu?username=" + $scope.currentUser.username;
        // var apiUrlMenu = "/api/user/GetHakAksesMenu?username=Admin";
        // console.log(apiUrlMenu);

        // HttpRequest.get(apiUrlMenu).success(function (response) {
        //     $scope.dataMenu = response.items;
        //     console.log(JSON.stringify($scope.dataMenu));
        // })
        console.log(JSON.stringify($scope.dataMenu));
        $scope.dataMenu = [{
                "icon": "fa fa-home",
                "namaMenu": "Home",
                "menuItem": [{
                        "url": "/index.html#/dashboard",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Dashboard"
                    },
                    {
                        "url": "/index.html#/transaksi",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Transaksi"
                    }
                ]
            },
            {
                "icon": "fa fa-square-o",
                "namaMenu": "Master Data",
                "menuItem": [{
                        "url": "/index.html#/masterBarang",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Master Barang"
                    },
                    {
                        "url": "/index.html#/masterKategori",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Master Kategori"
                    },
                    {
                        "url": "/index.html#/masterMerk",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Master Merk"
                    },
                    {
                        "url": "/index.html#/masterSatuan",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Master Satuan"
                    }
                ]
            },
            {
                "icon": "fa fa-bar-chart",
                "namaMenu": "Report",
                "menuItem": [{
                        "url": "/index.html#/penjualanHarian",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Penjualan Harian"
                    },
                    {
                        "url": "/index.html#/penjualanProduk",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Penjualan Produk"
                    },
                    {
                        "url": "/index.html#/penjualanKasir",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Penjualan Kasir"
                    },
                    {
                        "url": "/index.html#/reportInvoice",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Invoice"
                    }
                ]
            },
            {
                "icon": "fa fa-th",
                "namaMenu": "Master Aplikasi",
                "menuItem": [{
                        "url": "/index.html#/m-menu",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Master Menu"
                    },
                    {
                        "url": "/index.html#/m-peran",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Master Role"
                    },
                    {
                        "url": "/index.html#/m-user",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Master User"
                    },
                    {
                        "url": "/index.html#/attendance",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Attendance"
                    }
                ]
            }
        ]
    }



    //Start of Application =============================================================================================================
    $scope.formLoad();
});