var mainApp = angular.module('mainApp', ['ngRoute', 'ngSanitize', 'ngCookies', 'datatables', 'datatables.columnfilter',
    'ngFileUpload', 'ui.bootstrap', 'uiSwitch', 'ngCkeditor', 'validation', 'validation.rule',
    'angularUtils.directives.dirPagination'
]);


mainApp.run(function ($rootScope, $location, $routeParams, $cookies, HttpRequest, Helper) {
    $rootScope.$on('$routeChangeStart', function (e, current, next) {
        var currentUser = null;

        try {
            currentUser = JSON.parse($cookies.get('currentUser'));
            console.log(currentUser);

        } catch (err) {}

        if (currentUser == null)
            document.location.href = 'login.html';

        $('.Loading').hide();

    });

    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {

        console.log('Current route name: ' + $location.path() + '. currentUser : ' + $cookies.get('currentUser'));
        var currentUser = null;

        try {
            currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {}

        $cookies.put('currentRoute', $location.path());


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
            templateUrl: 'template/displayMenu.html',
            controller: 'displayMenuCtrl',
            cache: false,
        })
        .when('/home', {
            templateUrl: 'template/displayMenu.html',
            controller: 'displayMenuCtrl',
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
        .when('/displayMenu', {
            templateUrl: 'template/displayMenu.html',
            controller: 'displayMenuCtrl',
            cache: false
        })
        .when('/masterMenu', {
            templateUrl: 'template/masterMenuMakanan.html',
            controller: 'masterMenuMakananCtrl',
            cache: false
        })
        .when('/masterVendor', {
            templateUrl: 'template/masterVendor.html',
            controller: 'masterVendorCtrl',
            cache: false
        })
        .when('/masterRunningText', {
            templateUrl: 'template/masterRunningText.html',
            controller: 'masterRunningTextCtrl',
            cache: false
        })
        .when('/masterShift', {
            templateUrl: 'template/masterShift.html',
            controller: 'masterShiftCtrl',
            cache: false
        })
        .when('/masterImage', {
            templateUrl: 'template/masterImage.html',
            controller: 'masterImageCtrl',
            cache: false
        })
        .when('/reportAll', {
            templateUrl: 'template/reportAll.html',
            cache: false,
            controller: 'reportAllCtrl'
        })
        .when('/reportTotalCounting', {
            templateUrl: 'template/reportTotalCounting.html',
            cache: false,
            controller: 'reportTotalCountingCtrl'
        })
        .when('/reportCountingVendor', {
            templateUrl: 'template/reportCountingVendor.html',
            cache: false,
            controller: 'reportCountingVendorCtrl'
        })
        .when('/reportCountingEmployee', {
            templateUrl: 'template/reportCountingEmployee.html',
            cache: false,
            controller: 'reportCountingEmployeeCtrl'
        })
        .when('/form3', {
            templateUrl: 'template/form3.html',
            cache: false,
            controller: 'form3Ctrl'
        })
        .when('/login', {
            templateUrl: 'login.html'
        })
        .when('/multipleUpload', {
            templateUrl: 'multipleUpload.html'
        })
        .when('/singleUpload', {
            templateUrl: 'singleUpload.html'
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
        .when('/m-peran', {
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