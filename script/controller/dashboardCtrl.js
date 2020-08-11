mainApp.controller("dashboardCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, $http, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers) {
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

        // console.log(JSON.stringify($scope.currentUser));




        $scope.getMaps();
        $scope.getDataPromosi();
        $scope.getMember()
        $scope.getRole();
        $scope.getTotalPembelian();
        $scope.getTotalPenjualan();
    }

    $scope.getDataPromosi = () => {
        var apiUrl = "/promosi";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.dataPromosi = response.data;
            console.log(JSON.stringify(response));

        })

    }

    $scope.getTotalPembelian = () => {
        var apiUrl = "/report/" + $scope.currentUser.email + "/getPembelian";
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.totalPembelian = response.jumlahPembelian;
            console.log(JSON.stringify(response.data));

        })
    }
    $scope.getTotalPenjualan = () => {
        var apiUrl = "/report/" + $scope.currentUser.email + "/getPenjualan";
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.totalPenjualan = response.jumlahPenjualan;
            console.log(JSON.stringify(response.data));

        })
    }
    $scope.getRole = () => {
        var apiUrl = "/role/" + $scope.currentUser.roleMember + "/getRoleByRoleMember";
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listRole = response.data;
            console.log(JSON.stringify($scope.listRole.data));

        })
    }
    $scope.getMaps = () => {

        // var url = "http://192.168.100.185:65080/api/GetLocation";
        var apiUrl = "/member/" + $scope.currentUser.email + "/getMaps";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.dataLocation = response.data
            // console.log(JSON.stringify($scope.dataLocation));


            var mapOptions = {
                center: [-0.586527, 116.315544],
                zoom: 5
            }

            // // Creating a map object
            var map = new L.map('map', mapOptions);

            // Street Maps
            L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=GJz5nBDpz0UcGEnhcImZ', {
                attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            }).addTo(map);

            // Satelit Maps
            // L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            //     attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            // }).addTo(map);



            $scope.dataLocation.forEach(element => {
                if (element.tipeMember == "Stokis") {
                    var iconOptions = {
                        iconUrl: './../icons/icon-stokis.png',
                        iconSize: [20, 20]
                    }
                } else if (element.tipeMember == "Agen") {
                    var iconOptions = {
                        iconUrl: './../icons/icon-agen.png',
                        iconSize: [20, 20]
                    }
                } else if (element.tipeMember == "Distributor") {
                    var iconOptions = {
                        iconUrl: './../icons/icon-distributor.png',
                        iconSize: [20, 20]
                    }
                } else if (element.tipeMember == "Master Distributor") {
                    var iconOptions = {
                        iconUrl: './../icons/icon-master-distributor.png',
                        iconSize: [20, 20]
                    }
                } else if (element.tipeMember == "End User") {
                    var iconOptions = {
                        iconUrl: './../icons/icon-user.png',
                        iconSize: [20, 20]
                    }
                } else {
                    var iconOptions = {
                        iconUrl: './../icons/icon-reseller.png',
                        iconSize: [20, 20]
                    }
                }

                var customIcon = L.icon(iconOptions);
                marker = new L.marker([element.Latitude, element.Longitude], {
                    icon: customIcon
                }).bindPopup(element.namaLengkap).addTo(map);
            });
        });
    }

    $scope.getMember = () => {
        var apiUrl = "/member/" + $scope.currentUser.email + "/getListMember";
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.totalMember = response.jumlahMember;
            $scope.listData = response.data;


        });
    }
    $scope.downloadPromosi = (url) => {
        window.open(url, '_blank')

        // window.open('https://www.codexworld.com', '_blank')
    }
    //Start of Application ===============================================================
    $scope.formLoad();
})