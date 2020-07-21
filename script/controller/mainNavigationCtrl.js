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
        // console.log(JSON.stringify($scope.dataMenu));
        $scope.dataMenu = [{
                "icon": "fa fa-home",
                "namaMenu": "Home",
                "menuItem": [{
                    "url": "/index.html#/dashboard",
                    "icon": "fa fa-circle-o",
                    "namaMenu": "Dashboard"
                }]
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
                        "url": "/index.html#/masterJenisBarang",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Master Jenis Barang"
                    },
                    {
                        "url": "/index.html#/masterPaket",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Master Paket"
                    }, {
                        "url": "/index.html#/statusMember",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Status Member"
                    }

                ]
            },
            {
                "icon": "fa fa-users",
                "namaMenu": "Member Data",
                "menuItem": [{
                        "url": "/index.html#/masterMember",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Data Member"
                    },
                    {
                        "url": "/index.html#/rewardMember",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Reward Member"
                    }
                ]
            },
            {
                "icon": "fa fa-shopping-cart",
                "namaMenu": "Pembelian Atau Penjualan",
                "menuItem": [{
                        "url": "/index.html#/stokIn",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Stok In"
                    },
                    {
                        "url": "/index.html#/penjualanMember",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Penjualan Member"
                    }
                ]
            },
            {
                "icon": "fa fa-bar-chart",
                "namaMenu": "Report",
                "menuItem": [{
                        "url": "/index.html#/penjualanHarian",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Riwayat Pembelian"
                    },
                    {
                        "url": "/index.html#/penjualanProduk",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Riwayat Penjualan"
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
                        "url": "/index.html#/profile",
                        "icon": "fa fa-circle-o",
                        "namaMenu": "Profile"
                    }
                ]
            }
        ]
    }



    //Start of Application =============================================================================================================
    $scope.formLoad();
});