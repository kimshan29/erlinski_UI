mainApp.controller("laporanGratifikasiCtrl", function ($scope, $http, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, Upload) {
    $scope.Helper = Helper;
    $scope.currentUser = {};


    $scope.lapGratifikasi = {};
    $scope.lapGratifikasi.master = {};
    $scope.lapGratifikasi.isEditMode = false;
    $scope.formLapGratifikasi = {};


    $scope.lapGratifikasi.tab1 = false;
    $scope.lapGratifikasi.tab2 = false;
    $scope.lapGratifikasi.tab3 = false;
    $scope.lapGratifikasi.tab4 = false;





    //Procedures =====================================================================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }

        // $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withOption('responsive', true).withDisplayLength(10);

        $scope.renderlapGratifikasi();
    }

    $scope.renderEmail = function (keyword) {
        var apiUrl = "/api/GetUserEmail?email=" + keyword;
        return HttpRequest.get(apiUrl).then(function (response) {
            // console.log(JSON.stringify(response));
            // $scope.user.input.email = response.data.email;
            // console.log(JSON.stringify($scope.user.input.email));
            return response.data;
        });
    }

    $scope.print = function (printSectionId) {
        // var innerContents = document.getElementById(printSectionId).innerHTML;
        // var popupWinindow = window.open('../template/form1.html', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        // popupWinindow.document.open();
        // popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        // popupWinindow.document.close();
        window.open('print/form1.html', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    }

    $scope.renderlapGratifikasi = function () {
        NProgress.start();
        $scope.lapGratifikasi.data = [{
                tglLaporan: "14/05/2018",
                email: "shandy.edu@indonesiapower.co.id",
                company: "PT. Energi Duta Utama",
                namaPemberiGratifikasi: "Bayu Isnanto Putro",
                jabatanPemberiGratifikasi: "Kepala Divisi SDM",
                emailPemberiGratifikasi: "hattta@gmail.com",
                status: "Selesai",
                statusKpk: "Ya",
                statusRekomendasi: "Ya",
                nilai: 2000000
            },
            {
                tglLaporan: "14/05/2018",
                email: "sastra.edu@indonesiapower.co.id",
                company: "PT. Energi Duta Utama",
                namaPemberiGratifikasi: "Hatta Alfian Naser",
                jabatanPemberiGratifikasi: "Kepala Divisi SDM",
                emailPemberiGratifikasi: "hattta@gmail.com",
                status: "Selesai",
                statusKpk: "Ya",
                statusRekomendasi: "Tidak",
                nilai: 4000000
            },
            {
                tglLaporan: "14/05/2018",
                email: "bais@indonesiapower.co.id",
                company: "PT. Indonesiapower",
                namaPemberiGratifikasi: "Sastra",
                jabatanPemberiGratifikasi: "Kepala Divisi SDM",
                emailPemberiGratifikasi: "hattta@gmail.com",
                status: "Draft",
                statusKpk: "-",
                statusRekomendasi: "-",
                nilai: 6000000
            },
            {
                namaPelapor: "Sastra",
                email: "sastra.edu@indonesiapower.co.id",
                company: "PT. Energi Duta Utama",
                namaPemberiGratifikasi: "Hatta Alfian Naser",
                jabatanPemberiGratifikasi: "Kepala Divisi SDM",
                emailPemberiGratifikasi: "hattta@gmail.com",
                nilai: 4000000
            }, {
                namaPelapor: "Bayu Isnanto Putro",
                email: "bais@indonesiapower.co.id",
                company: "PT. Indonesiapower",
                namaPemberiGratifikasi: "Hatta Alfian Naser",
                jabatanPemberiGratifikasi: "Kepala Divisi SDM",
                emailPemberiGratifikasi: "hattta@gmail.com",
                nilai: 6000000
            },
            {
                namaPelapor: "Sastra",
                email: "sastra.edu@indonesiapower.co.id",
                company: "PT. Energi Duta Utama",
                namaPemberiGratifikasi: "Hatta Alfian Naser",
                jabatanPemberiGratifikasi: "Kepala Divisi SDM",
                emailPemberiGratifikasi: "hattta@gmail.com",
                nilai: 4000000
            }, {
                namaPelapor: "Bayu Isnanto Putro",
                email: "bais@indonesiapower.co.id",
                company: "PT. Indonesiapower",
                namaPemberiGratifikasi: "Hatta Alfian Naser",
                jabatanPemberiGratifikasi: "Kepala Divisi SDM",
                emailPemberiGratifikasi: "hattta@gmail.com",
                nilai: 6000000
            },
            {
                namaPelapor: "Sastra",
                email: "sastra.edu@indonesiapower.co.id",
                company: "PT. Energi Duta Utama",
                namaPemberiGratifikasi: "Hatta Alfian Naser",
                jabatanPemberiGratifikasi: "Kepala Divisi SDM",
                emailPemberiGratifikasi: "hattta@gmail.com",
                nilai: 4000000
            }, {
                namaPelapor: "Bayu Isnanto Putro",
                email: "bais@indonesiapower.co.id",
                company: "PT. Indonesiapower",
                namaPemberiGratifikasi: "Hatta Alfian Naser",
                jabatanPemberiGratifikasi: "Kepala Divisi SDM",
                emailPemberiGratifikasi: "hattta@gmail.com",
                nilai: 6000000
            },
            {
                namaPelapor: "Sastra",
                email: "sastra.edu@indonesiapower.co.id",
                company: "PT. Energi Duta Utama",
                namaPemberiGratifikasi: "Hatta Alfian Naser",
                jabatanPemberiGratifikasi: "Kepala Divisi SDM",
                emailPemberiGratifikasi: "hattta@gmail.com",
                nilai: 4000000
            }, {
                namaPelapor: "Bayu Isnanto Putro",
                email: "bais@indonesiapower.co.id",
                company: "PT. Indonesiapower",
                namaPemberiGratifikasi: "Hatta Alfian Naser",
                jabatanPemberiGratifikasi: "Kepala Divisi SDM",
                emailPemberiGratifikasi: "hattta@gmail.com",
                nilai: 6000000
            }
        ]
        console.log(JSON.stringify($scope.lapGratifikasi.data));

        // Provinsi
        var apiUrlProvinsi = "https://unpkg.com/administratif-indonesia@0.2.0/storages/index.json";
        $http.get(apiUrlProvinsi).then(function (response) {
            $scope.lapGratifikasi.master.provinsi = response.data;
            // console.log(JSON.stringify($scope.lapGratifikasi.master.provinsi));
        }).
        catch(function onError(response) {
            console.log(response);
        });
        NProgress.done();
    }

    //Event Handlers ===================================================================================================================
    $scope.eventClickAdd = function () {

        $scope.formLapGratifikasi = {};
        $scope.lapGratifikasi.isEditMode = true;

    }

    $scope.getTotal = function (type) {
        var total = 0;
        angular.forEach($scope.lapGratifikasi.data, function (el) {
            total += el[type];
        });
        return total;
    };
    // Get kode post
    $scope.getKodePost = function (provinsi) {
        // console.log(provinsi.name);
        // console.log(JSON.stringify(provinsi.name));
        var apiUrlKodePost = "http://kalarau.net/api/v1/kodepos/prov/" + provinsi.name;
        $http.get(apiUrlKodePost).then(function (response) {
            $scope.formLapGratifikasi.identitasPelapor.kodePos = response;
            console.log(JSON.stringify($scope.formLapGratifikasi.identitasPelapor.kodePos));
        })
        // $scope.formLapGratifikasi.identitasPelapor.kodePos;
        // apiUrl
    }
    $scope.eventClickCancel = function () {
        $scope.lapGratifikasi.isEditMode = false;
        // $route.reload();
        $scope.renderlapGratifikasi();
    }

    $scope.eventClickSave = function () {
        // alert("Test Save!!!");
        // var apiUrl = "/api/UserInRole";
        var apiUrl = "";
        $scope.formLapGratifikasi.username = $scope.currentUser.email;
        var data = $scope.formLapGratifikasi;
        console.log(JSON.stringify(data));
        // HttpRequest.post(apiUrl, data).success(function(response){
        //     $scope.lapGratifikasi.data = response;
        //     console.log(JSON.stringify($scope.lapGratifikasi.data));
        // })
    }

    $scope.eventClickEdit = function (id) {
        NProgress.start();
        $scope.isAdd = false;
        var apiUrl = "/api/UserInRole/" + id;

        HttpRequest.get(apiUrl).success(function (response) {
                // $scope.emailJvc = false;
                // $scope.email = false;
                $scope.user.input = response;
                // if ($scope.user.input.typeUser == "INDONESIA POWER"){
                //     $scope.emailJvc = true;
                //     $scope.email= false;
                //     console.log("1");
                // }
                if ($scope.user.input.typeUser == "NON INDONESIA POWER") {
                    $scope.email = true;
                    $scope.emailJvc = false;
                    console.log("2");
                } else {
                    $scope.email = false;
                    $scope.emailJvc = true;
                    console.log("3");
                }


                $scope.user.input.tglAwalAktif = $scope.user.input.tglAwalAktif != null ? $scope.user.input.tglAwalAktif.toDate() : null;
                $scope.user.input.tglAkhirAktif = $scope.user.input.tglAkhirAktif != null ? $scope.user.input.tglAkhirAktif.toDate() : null;
                $scope.user.isEditMode = true;
                $scope.isAdd = false;
                NProgress.done();

                console.log(JSON.stringify($scope.user.input));
            })
            .error(function (response, code) {
                NProgress.done();

                var data = {
                    title: "User",
                    exception: response,
                    exceptionCode: code,
                    operation: "GET",
                    apiUrl: apiUrl
                };

                Helper.notifErrorHttp(data);
            });
    }

    $scope.eventClickHapus = function (id, name) {

        var apiUrl = "/api/UserInRole?idUserInRole=" + id + "&email=" + $scope.currentUser.email;
        var hapus = confirm("Hapus " + name + "?");

        if (hapus) {
            NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                    $scope.user.isEditMode = false;
                    NProgress.done();
                })
                .error(function (response, code) {
                    NProgress.done();

                    var data = {
                        title: "User",
                        exception: response,
                        exceptionCode: code,
                        operation: "DELETE",
                        apiUrl: apiUrl
                    };

                    Helper.notifErrorHttp(data);
                });
        }
    }

    $scope.nextTab2 = function () {
        $scope.lapGratifikasi.tab2 = true;
        $scope.lapGratifikasi.tab1 = false;
        $scope.lapGratifikasi.tab3 = false;
        $scope.lapGratifikasi.tab4 = false
    }

    $scope.previewPrint = function () {
        $('#previewPrint').modal({
            show: true
        });
    }


    $scope.printDiv = function (divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=800,height=800');
        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    }
    //Start of Application =============================================================================================================
    $scope.formLoad();
});