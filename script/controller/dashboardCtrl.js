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

    }


    $scope.getMaps = () => {

        // var url = "http://192.168.100.185:65080/api/GetLocation";


        // $http.get(url).then(function (response) {
        $scope.dataLocation = [{
            "Latitude": -7.683431,
            "Longitude": 109.137462,
            "Id": "a136a5ee-81af-4b46-b073-529213ea2f63",
            "KodeUnit": "ADP",
            "NamaUnit": "PLTU ADIPALA"
        }, {
            "Latitude": -6.391752,
            "Longitude": 105.828620,
            "Id": "7ec4ad3a-ca5c-4952-8075-198969e5c6ff",
            "KodeUnit": "BLB",
            "NamaUnit": "PLTU LABUAN"
        }, {
            "Latitude": -8.717559,
            "Longitude": 115.211746,
            "Id": "b887d5c7-f617-46ce-ae63-fe548d3e9157",
            "KodeUnit": "BLI",
            "NamaUnit": "PLTGDG BALI"
        }, {
            "Latitude": -6.059042,
            "Longitude": 106.461855,
            "Id": "070842d5-50bc-47dd-a501-edf7ad611f25",
            "KodeUnit": "BLT",
            "NamaUnit": "PLTU LONTAR"
        }, {
            "Latitude": -4.291609,
            "Longitude": 119.631653,
            "Id": "bae4b6df-f372-4085-b3bd-2bb095166977",
            "KodeUnit": "BRU",
            "NamaUnit": "PLTU BARRU"
        }, {
            "Latitude": -5.886484,
            "Longitude": 106.037350,
            "Id": "9672e996-5dc7-42ce-b8c1-a6204c652ae2",
            "KodeUnit": "BSLA",
            "NamaUnit": "PLTU SURALAYA 8"
        }, {
            "Latitude": -5.994542,
            "Longitude": 106.093128,
            "Id": "b09d0f5c-8826-4600-9e08-163671cbf828",
            "KodeUnit": "CLG",
            "NamaUnit": "PLTU CILEGON"
        }, {
            "Latitude": -2.614364,
            "Longitude": 140.790419,
            "Id": "bc2dedec-699c-437d-ad8b-f7865e7e7427",
            "KodeUnit": "HTC",
            "NamaUnit": "PLTU HOLTEKAMP"
        }, {
            "Latitude": -7.023670,
            "Longitude": 106.546527,
            "Id": "a58facca-8f53-410d-86b9-94363aac70a5",
            "KodeUnit": "JPR",
            "NamaUnit": "PLTU PALABUHAN RATU"
        }, {
            "Latitude": -8.659225,
            "Longitude": 116.072969,
            "Id": "48264112-78f0-44f5-b4a7-d28b7c12070d",
            "KodeUnit": "JRJ",
            "NamaUnit": "PLTU JERANJANG"
        }, {
            "Latitude": -7.141194,
            "Longitude": 107.788064,
            "Id": "f70ac114-02a7-486a-a674-4b210ca4ae39",
            "KodeUnit": "KMJ",
            "NamaUnit": "PLTP KAMOJANG"
        }, {
            "Latitude": -7.394907,
            "Longitude": 109.605351,
            "Id": "2d58aaf5-b09d-49c4-923d-378e6bbb5499",
            "KodeUnit": "MRC",
            "NamaUnit": "PLTA MRICA"
        }, {
            "Latitude": -7.650702,
            "Longitude": 113.026923,
            "Id": "a2f41475-d344-4bc0-8543-a8419bcc07a5",
            "KodeUnit": "PGT",
            "NamaUnit": "PLTGU GRATI"
        }, {
            "Latitude": 4.118865,
            "Longitude": 98.257488,
            "Id": "e289d80e-8b50-4972-86a2-88de66b0c439",
            "KodeUnit": "PNS",
            "NamaUnit": "PLTU PANGKALAN SUSU"
        }, {
            "Latitude": -6.863384,
            "Longitude": 107.349739,
            "Id": "996f5706-a8b1-4b6b-8dbc-74db3515535a",
            "KodeUnit": "SGL",
            "NamaUnit": "PLTA SAGULING"
        }, {
            "Latitude": 0.030667,
            "Longitude": 110.555477,
            "Id": "c2e7dc65-fd8d-41d5-a8f6-8473992d54fc",
            "KodeUnit": "SGU",
            "NamaUnit": "PLTU SANGGAU"
        }, {
            "Latitude": -5.892175,
            "Longitude": 106.029746,
            "Id": "a8b9eef7-aaa8-43f1-b413-675b710ef755",
            "KodeUnit": "SLA",
            "NamaUnit": "PLTU SURALAYA"
        }, {
            "Latitude": -6.952038,
            "Longitude": 110.430394,
            "Id": "12c8c9a8-a6e6-4c15-83c2-c8dfdb9a020a",
            "KodeUnit": "SMG",
            "NamaUnit": "PLTGU SEMARANG"
        }, {
            "Latitude": -6.109906,
            "Longitude": 106.867223,
            "Id": "900ca1e6-d69b-4339-b56c-ed0336dde11b",
            "KodeUnit": "TGP",
            "NamaUnit": "PLTGU PRIOK"
        }];
        // console.log($scope.dataLocation);
        var mapOptions = {
            center: [-0.586527, 116.315544],
            zoom: 5
        }

        // // Creating a map object
        var map = new L.map('map', mapOptions);

        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=GJz5nBDpz0UcGEnhcImZ', {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        }).addTo(map);

        $scope.dataLocation.forEach(element => {
            marker = new L.marker([element.Latitude, element.Longitude], {}).bindPopup(element.NamaUnit).addTo(map);
        });
    }
    //Start of Application ===============================================================
    $scope.formLoad();
})