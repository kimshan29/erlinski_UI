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
            templateUrl: 'template/dashboard.html',
            controller: 'dashboardCtrl',
            cache: false,
        })
        .when('/home', {
            templateUrl: 'template/dashboard.html',
            controller: 'dashboardCtrl',
            cache: false,
        })
        // .when('/laporanGratifikasi', {
        //     templateUrl: 'template/formLapGratifikasi.html',
        //     controller: 'formLapGratifikasiCtrl',
        //     cache: false
        // })
        .when('/komitmenKepatuhan', {
            templateUrl: 'template/komitmenKepatuhan.html',
            controller: 'komitmenKepatuhanCtrl',
            cache: false
        })
        .when('/komitmenBenturanKepentingan', {
            templateUrl: 'template/komitmenBenturanKepentingan.html',
            controller: 'komitmenBenturanKepentinganCtrl',
            cache: false
        })
        .when('/daftarKhusus', {
            templateUrl: 'template/daftarKhusus.html',
            controller: 'daftarKhususCtrl',
            cache: false
        })
        .when('/laporanGratifikasi', {
            templateUrl: 'template/laporanGratifikasi.html',
            controller: 'laporanGratifikasiCtrl',
            cache: false
        })
        .when('/lhkpn', {
            templateUrl: 'template/lhkpn.html',
            controller: 'lhkpnCtrl',
            cache: false
        })
        .when('/surveyPemahamaGcg', {
            templateUrl: 'template/surveyPemahamaGcg.html',
            controller: 'surveyPemahamaGcgCtrl',
            cache: false
        })
        .when('/pelayananKip', {
            templateUrl: 'template/pelayananKip.html',
            controller: 'pelayananKipCtrl',
            cache: false
        })
        .when('/whistleBlowingSystem', {
            templateUrl: 'template/whistleBlowingSystem.html',
            controller: 'whistleBlowingSystemCtrl',
            cache: false
        })
        .when('/faqs', {
            templateUrl: 'template/faqs.html',
            controller: 'faqsCtrl',
            cache: false
        })
        .when('/gcgNews', {
            templateUrl: 'template/gcgNews.html',
            controller: 'gcgNewsCtrl',
            cache: false
        })
        .when('/gcgForum', {
            templateUrl: 'template/gcgForum.html',
            controller: 'gcgForumCtrl',
            cache: false
        })
        .when('/materiSosialisasi', {
            templateUrl: 'template/materiSosialisasi.html',
            controller: 'materiSosialisasiCtrl',
            cache: false
        })
        .when('/displayMenu', {
            templateUrl: 'template/displayMenu.html',
            controller: 'displayMenuCtrl',
            cache: false
        })
        .when('/masterMenu', {
            templateUrl: 'template/masterMenu.html',
            // controller: 'masterMenuCtrl',
            cache: false
        })
        .when('/form1', {
            templateUrl: 'template/form1.html',
            controller: 'form1Ctrl',
            cache: false
        })
        .when('/formBooks', {
            templateUrl: 'template/formBooks.html',
            cache: false,
            controller: 'formBooksCtrl'
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
            templateUrl: 'template/m-menu.html?' + $.now(),
            controller: 'mMenuCtrl'
        })

        // Master Peran
        .when('/m-peran', {
            cache: false,
            templateUrl: 'template/m-peran.html?' + $.now(),
            controller: 'mPeranCtrl'
        })

        // Master User
        .when('/m-user', {
            cache: false,
            templateUrl: 'template/m-user.html?' + $.now(),
            controller: 'mUserCtrl'
        })


});