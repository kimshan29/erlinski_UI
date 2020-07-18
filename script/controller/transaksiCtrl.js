mainApp.controller("transaksiCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, $interval, markers, Upload, $timeout) {
    //Variable


    $scope.currentUser = {};
    $scope.announcement = {};
    $scope.announcement.isEditMode = false;
    // console.log($scope.announcement.isEditMode);


    $scope.currentDate = new Date();
    console.log($scope.currentDate);


    //Form Load ======================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }

        $scope.renderDisplayMenu();
        $scope.renderInfoKesehatan();
        // $scope.renderCantennCounting();
        // $scope.renderLastKaryawan();
        $scope.renderRunningText();


        var tick = function () {
            $scope.clock = Date.now();
        }
        tick();
        $interval(tick, 1000);
        setInterval(() => {
            $scope.renderDisplayMenu();
            console.log("Load 5 detik sekali");

        }, 5000);

    }

    $scope.renderDisplayMenu = () => {

        var month = new Array();
        month[0] = "01";
        month[1] = "02";
        month[2] = "03";
        month[3] = "04";
        month[4] = "05";
        month[5] = "06";
        month[6] = "07";
        month[7] = "08";
        month[8] = "09";
        month[9] = "10";
        month[10] = "11";
        month[11] = "12";

        $scope.date = new Date();
        var day = String($scope.date.getDate()).padStart(2, '0');
        var month = month[$scope.date.getMonth()];
        var year = $scope.date.getFullYear();

        var jam = $scope.date.getHours();
        var menit = $scope.date.getMinutes();

        $scope.waktuNow = jam + "." + menit;
        // console.log($scope.waktuNow);

        $scope.dateNow = day + "-" + month + "-" + year;

        // getShift
        var apiShift = "/api/Shift";
        HttpRequest.get(apiShift).success(function (response) {
            $scope.date = new Date();
            var jam = $scope.date.getHours();
            var menit = $scope.date.getMinutes();

            $scope.waktuNow = jam + "." + menit;


            $scope.masterShift = response.items;
            // console.log(JSON.stringify($scope.masterShift));

            angular.forEach($scope.masterShift, function (response) {


                // console.log(response);
                if ($scope.waktuNow >= response.jamMulai && $scope.waktuNow <= response.jamSelesai) {
                    $scope.namaShift = response.namaShift;
                    $scope.idShift = response.id;
                    // console.log(("nama shift:" + $scope.namaShift));

                    var apiUrl = "/api/orderMenu/getListDaftarMenu?shift=" + $scope.idShift + "&date=" + $scope.dateNow;
                    console.log(apiUrl);

                    HttpRequest.get(apiUrl).success(function (response) {
                        $scope.listDisplayMenu = response.items;
                    })


                    // Get Nama Vendor 
                    var apivendor = "/api/scheduleVendor/getVendorByDate?date=" + $scope.dateNow + "&shift=" + $scope.idShift;
                    HttpRequest.get(apivendor).success(function (response) {
                        $scope.listVendor = response.items;
                        // console.log(JSON.stringify($scope.listVendor));

                    })

                    // Get Counting Employee
                    var apiUrlCounting = "/api/orderMenu/getCountingCanteen?shift=" + $scope.idShift + "&date=" + $scope.dateNow + "&username=" + $scope.currentUser.username;
                    HttpRequest.get(apiUrlCounting).success(function (response) {
                        $scope.listDataCounting = response.items;

                        console.log(JSON.stringify($scope.listDataCounting));

                    })

                    // Get Last Order
                    var apiUrlLastOrder = "/api/orderMenu/getListUserOrder?shift=" + $scope.idShift + "&date=" + $scope.dateNow;
                    HttpRequest.get(apiUrlLastOrder).success(function (response) {
                        $scope.listKaryawan = response.items;

                        console.log(JSON.stringify($scope.listKaryawan));

                    })

                    // Get Menu Stok
                    var apiUrlMenuStok = "/api/orderMenu/getStokMenu?shift=" + $scope.idShift + "&date=" + $scope.dateNow;
                    HttpRequest.get(apiUrlMenuStok).success(function (response) {
                        $scope.listMakanan = response.items;

                        console.log(JSON.stringify($scope.listMakanan));

                    })

                }
            });
        })
    }

    $scope.renderRunningText = () => {
        var apiUrl = "/api/runningText/getRunningTextAktive";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listRunningText = response.items;
            console.log(JSON.stringify($scope.listRunningText));

        })
    }
    $scope.renderInfoKesehatan = () => {
        var apiUrl = "/api/image/getImageAktive";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listInfoKesehatan = response.items;
            // console.log(JSON.stringify($scope.listInfoKesehatan));

        })

    }




    //Start of Application ===============================================================
    $scope.formLoad();
})