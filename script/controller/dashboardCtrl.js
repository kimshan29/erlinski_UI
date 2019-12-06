mainApp.controller("dashboardCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers) {
    //Variable


    $scope.currentUser = {};
    $scope.listKebijakan = {};
    $scope.listAnnouncement = {};
    // $scope.listKebijakan.data = [{
    //         id: "1",
    //         kebijakan: "Lorem Ipsum is simply dummy text of the printing and typesetting industry 1"
    //     },
    //     {
    //         id: "2",
    //         kebijakan: "Lorem Ipsum is simply dummy text of the printing and typesetting industry 2"
    //     }, {
    //         id: "3",
    //         kebijakan: "Lorem Ipsum is simply dummy text of the printing and typesetting industry 3"
    //     }, {
    //         id: "4",
    //         kebijakan: "Lorem Ipsum is simply dummy text of the printing and typesetting industry 4"
    //     }, {
    //         id: "5",
    //         kebijakan: "Lorem Ipsum is simply dummy text of the printing and typesetting industry 5"
    //     }
    // ]
    //Form Load ======================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }
        // alert("testing");
        // $('#komitmenkepatuhan').attr('disabled', 'disabled').off('click');

        // Disabled Menu Dashboard
        $("#komitmenkepatuhan").addClass("disabledbutton");
        $("#komitmenBenturanKepentingan").addClass("disabledbutton");
        $("#daftarKhusus").addClass("disabledbutton");
        $("#lhkpn").addClass("disabledbutton");
        $("#faqs").addClass("disabledbutton");

        $scope.renderKebijakan();
        $scope.renderAnnouncement();
        $("#materiSosialisasi").addClass("disabledbutton");
        // $("#pelayananKip").addClass("disabledbutton");
        // $("#wbs").addClass("disabledbutton");
    }

    $scope.renderKebijakan = function () {
        var apiUrl = "/api/MateriSosialisasi";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listKebijakan.data = response;

            // console.log(JSON.stringify($scope.listKebijakan.data));
        })
    }

    $scope.renderAnnouncement = function () {
        var apiUrl = "/api/Announcement";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listAnnouncement.data = response;
            // console.log(JSON.stringify($scope.listAnnouncement.data));
        })
    }


    $scope.popUpDetailAccouncement = function (id) {
        $('#detailAnnouncement').modal({
            show: true
        });

        var apiUrl = "/api/Announcement/" + id;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.previewAnnouncement = response;
            // console.log(JSON.stringify($scope.previewAnnouncement.isi));
            $('#previewAnnouncement').html($scope.previewAnnouncement.isi);
        });
    }


    $scope.popUpDetailKebijakan = function (id) {
        $('#detailKebijakan').modal({
            show: true
        })

        var apiUrl = "/api/MateriSosialisasi/" + id;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form = response;
            $scope.form.tanggalDokumen = response.tanggalDokumen.toDate();
            // console.log(JSON.stringify($scope.form));
        })
    }

    $scope.openGolKPK = function () {
        // alert("test");
        window.open("https://gol.kpk.go.id");
    }

    $scope.openGCGNews = function () {
        // window.open();
        alert("Belum Ada Link");
    }

    $scope.openGCGForum = function () {
        window.open("http://forum.indonesiapower.co.id/c/proses-bisnis/manajemen-hubungan-stakeholders");
    }

    // download Kebijakan
    $scope.eventClickGetFileKebijakan = function (id) {
        var apiUrl = "/api/DownloadMateriSosialisasi/" + id;
        document.location.href = webServiceBaseUrl + apiUrl;
        // alert("File Not Found!!!")
    }

    // Function switch link form
    $scope.switchLink = function () {
        linkKey = $scope.selected;

        switch (linkKey) {
            case 'laporanGratifikasi':
                alert('Testing');
                break;
            case 'surveyPemahamanGcg':
                alert('survey');
                break;
            case 'pelayananKip':
                $('#formPelayananKip').modal({
                    show: true
                });
                $('#myModal').modal('hide');
                break;

            default:
                break;
        }
    }

    $scope.eventClickSaveKip = function () {

        // $('#myModal').modal('hide');

        $('#formPelayananKip').modal('hide');
        location.href = "/index.html#/pelayananKip";
        // alert("test");


    }

    $scope.clearModalForm = function () {

    }
    $scope.eventClickFormKIP = function () {
        alert("Testttttt");
    }
    //Start of Application ===============================================================
    $scope.formLoad();
})