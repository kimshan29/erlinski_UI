var mainApp = angular.module('mainApp', ['ngRoute', 'ngSanitize', 'ngCookies', 'datatables', 'datatables.columnfilter',
    'ngFileUpload', 'ui.bootstrap', 'uiSwitch', 'ngCkeditor', 'validation', 'validation.rule',
    'angularUtils.directives.dirPagination', 'htmlToPdfSave', 'summernote'
]);


mainApp.run(function ($rootScope, $location, $routeParams, $cookies, HttpRequest, Helper) {
    $rootScope.$on('$routeChangeStart', function (e, current, next) {
        var currentUser = null;

        try {
            currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {}

        // if (currentUser == null)
        //     document.location.href = 'login.html';

        // $('.Loading').Hide();

    });

    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {

        //console.log('Current route name: ' + $location.path() + '. currentUser : ' + $cookies.get('currentUser'));
        var currentUser = null;

        try {
            currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {}

        $cookies.put('currentRoute', $location.path());


        // if (path != "/401" && path != "/error" && path != "/new-kr" && path != "/new-dmr" && path != "/map-risk") {
        //     var url = "/main.aspx#" + path;
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
            templateUrl: 'template/404error.html',
            // controller: 'dashboardCtrl',
            cache: false,
        })
        .when('/home', {
            templateUrl: 'template/404error.html',
            // controller: 'dashboardCtrl',
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
            templateUrl: 'template/formProject.html?' + $.now(),
            controller: 'formProjectCtrl',
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