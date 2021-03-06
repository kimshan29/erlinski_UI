var mainApp = angular.module('mainApp', ['ngRoute', 'ngSanitize', 'ngCookies', 'datatables', 'datatables.columnfilter',
    'ngFileUpload', 'ui.bootstrap', 'uiSwitch', 'ngCkeditor', 'validation', 'validation.rule',
    'angularUtils.directives.dirPagination'
]);


mainApp.run(function ($rootScope, $location, $routeParams, $cookies, HttpRequest, Helper) {
    $rootScope.$on('$routeChangeStart', function (e, current, next) {
        var currentUser = null;

        try {
            currentUser = JSON.parse($cookies.get('currentUser'));
            // console.log(currentUser);

        } catch (err) {}

        if (currentUser == null)
            document.location.href = 'login.html';

        $('.Loading').hide();

    });

    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {

        // console.log('Current route name: ' + $location.path() + '. currentUser : ' + $cookies.get('currentUser'));
        var currentUser = null;

        try {
            currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {}

        $cookies.put('currentRoute', $location.path());

        console.log($routeParams);

        // var path = $location.path()
        // if (path != "/404" && path != "/error") {
        //     var url = "/index.html#" + path;
        //     var encodedUrl = encodeURIComponent(url);
        //     var fullEncodedUrl = encodeURIComponent($location.absUrl());


        // }

    });
});

mainApp.controller("logoutCtrl", function ($scope) {

    // try
    // {
    //     $scope.currentUser = JSON.parse($cookies.get('currentUser'));
    // }
    // catch(err) {
    //     $scope.currentUser = {};
    // }

    $scope.submit = function () {
        alert("Hello Guys???");
    }
});
// Routes Config
mainApp.config(function ($routeProvider) {
    $routeProvider
        // Home
        .when('/', {
            templateUrl: 'template/dashboard.html',
            controller: 'dashboardCtrl',
            cache: false,
        })
        .when('/home', {
            templateUrl: 'template/dashboard.html',
            controller: 'dashboardCtrl',
            cache: false,
        })
        .when('/dashboard', {
            templateUrl: 'template/dashboard.html',
            controller: 'dashboardCtrl',
            cache: false,
        })
        .when('/orderMenu', {
            templateUrl: 'template/orderMenu.html',
            controller: 'orderMenuCtrl',
            cache: false
        })
        .when('/scheduleKantin', {
            templateUrl: 'template/scheduleKantin.html',
            controller: 'scheduleKantinCtrl',
            cache: false
        })
        .when('/scheduleVendor', {
            templateUrl: 'template/scheduleVendor.html',
            controller: 'scheduleVendorCtrl',
            cache: false
        })
        .when('/transaksi', {
            templateUrl: 'template/transaksi.html',
            controller: 'transaksiCtrl',
            cache: false
        })
        .when('/masterMenu', {
            templateUrl: 'template/masterMenuMakanan.html',
            controller: 'masterMenuMakananCtrl',
            cache: false
        })
        .when('/masterPaket', {
            templateUrl: 'template/masterPaket.html',
            controller: 'masterPaketCtrl',
            cache: false
        })
        .when('/mediaPromosi', {
            templateUrl: 'template/masterMediaPromosi.html',
            controller: 'masterMediaPromosiCtrl',
            cache: false
        })
        .when('/masterJenisBarang', {
            templateUrl: 'template/masterJenis.html',
            controller: 'masterJenisCtrl',
            cache: false
        })
        .when('/masterMember', {
            templateUrl: 'template/masterMember.html',
            controller: 'masterMemberCtrl',
            cache: false
        })
        .when('/masterRunningText', {
            templateUrl: 'template/masterRunningText.html',
            controller: 'masterRunningTextCtrl',
            cache: false
        })
        .when('/rewardMember', {
            templateUrl: 'template/rewardMember.html',
            controller: 'rewardMemberCtrl',
            cache: false
        })
        .when('/masterImage', {
            templateUrl: 'template/masterImage.html',
            controller: 'masterImageCtrl',
            cache: false
        })
        .when('/penjualanMember', {
            templateUrl: 'template/penjualanMember.html',
            cache: false,
            controller: 'penjualanMemberCtrl'
        })
        .when('/stokIn', {
            templateUrl: 'template/pembelianOwner.html',
            cache: false,
            controller: 'pembelianOwnerCtrl'
        })
        .when('/riwayatPenjualan', {
            templateUrl: 'template/reportRiwayatPenjualan.html',
            cache: false,
            controller: 'reportRiwayatPenjualanCtrl'
        })
        .when('/riwayatPembelian', {
            templateUrl: 'template/reportRiwayatPembelian.html',
            cache: false,
            controller: 'reportRiwayatPembelianCtrl'
        })
        .when('/riwayatKlaim', {
            templateUrl: 'template/reportRiwayatKlaim.html',
            cache: false,
            controller: 'reportRiwayatKlaimCtrl'
        })
        .when('/reportRewardMember', {
            templateUrl: 'template/reportRewardMember.html',
            cache: false,
            controller: 'reportRewardMemberCtrl'
        })
        .when('/reportBarangMember', {
            templateUrl: 'template/reportBarangMember.html',
            cache: false,
            controller: 'reportBarangMemberCtrl'
        })
        .when('/penjualanHarian', {
            templateUrl: 'template/reportHarian.html',
            cache: false,
            controller: 'reportHarianCtrl'
        })
        .when('/penjualanProduk', {
            templateUrl: 'template/reportProduk.html',
            cache: false,
            controller: 'reportProdukCtrl'
        })
        .when('/reportInvoice', {
            templateUrl: 'template/reportInvoice.html',
            cache: false,
            controller: 'reportInvoiceCtrl'
        })
        .when('/profile', {
            templateUrl: 'template/profile.html',
            cache: false,
            controller: 'profileCtrl'
        })
        .when('/masterReward', {
            templateUrl: 'template/masterReward.html',
            cache: false,
            controller: 'masterRewardCtrl'
        })
        .when('/masterBarang', {
            templateUrl: 'template/masterBarang.html',
            cache: false,
            controller: 'masterBarangCtrl'
        })
        .when('/masterBarangMember', {
            templateUrl: 'template/masterBarangMember.html',
            cache: false,
            controller: 'masterBarangMemberCtrl'
        })
        .when('/updatePassword', {
            templateUrl: 'template/updatePassword.html',
            cache: false,
            controller: 'updatePasswordCtrl'
        })
        .when('/ubahStatusDownline', {
            templateUrl: 'template/ubahStatusDownline.html',
            cache: false,
            controller: 'ubahStatusDownlineCtrl'
        })
        .when('/klaimReward', {
            templateUrl: 'template/klaimReward.html',
            cache: false,
            controller: 'klaimRewardCtrl'
        })
        .when('/login', {
            templateUrl: 'login.html'
        })

        //Form Project
        .when('/project', {
            templateUrl: 'template/404error.html?' + $.now(),
            // controller: 'formProjectCtrl',
            cache: false
        })
        // Master Menu
        .when('/m-menu', {
            cache: false,
            templateUrl: 'template/masterMenu.html?' + $.now(),
            controller: 'mMenuCtrl'
        })

        // Master Peran
        .when('/statusMember', {
            cache: false,
            templateUrl: 'template/masterRole.html?' + $.now(),
            controller: 'mPeranCtrl'
        })

        // Master User
        .when('/m-user', {
            cache: false,
            templateUrl: 'template/masterUser.html?' + $.now(),
            controller: 'masterUsertrl'
        })


});