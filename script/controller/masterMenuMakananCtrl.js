mainApp.controller("masterMenuMakananCtrl", function ($http, $scope, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper) {

    $scope.Helper = Helper;
    $scope.currentUser = {};
    $scope.master = {};

    $scope.formLoad = function () {

        $scope.renderList();

    }

    $scope.master.jenisMenu = [{
            id: "1",
            namaJenisMenu: "Makanan"
        },
        {
            id: "2",
            namaJenisMenu: "Buah"
        },
        {
            id: "3",
            namaJenisMenu: "Makanan Tambahan"
        },
        {
            id: "4",
            namaJenisMenu: "Sayuran"
        }
    ]

    $scope.master.vendor = [{
            id: "1",
            namaVendor: "Vendor A"
        },
        {
            id: "2",
            namaVendor: "Vendor B"
        },
        {
            id: "3",
            namaVendor: "Vendor C"
        }
    ]

    $scope.renderList = function () {
        // var apiUrl = "/api/menuMakanan";
        // HttpRequest.get(apiUrl).success(function (response) {
        //     $scope.listmenuMakanan = response.items;
        //     console.log(JSON.stringify($scope.listmenuMakanan));

        // })

        $scope.listMenuMakanan = [{
                id: "1",
                namaMenu: "Ayam Penyet",
                jenisMenu: "Makanan",
                cssJenisMenu: "label-danger",
                infoKalori: "Shandy",
                infoAlergi: "0892873930",
                file: {},
                namaVendor: "Vendor A"

            },
            {
                id: "2",
                namaMenu: "Melon",
                jenisMenu: "Buah",
                cssJenisMenu: "label-success",
                infoKalori: "Shandy",
                infoAlergi: "0892873930",
                file: {},
                namaVendor: "Vendor A"

            },
            {
                id: "3",
                namaMenu: "Tahu",
                jenisMenu: "Menu Tambahan",
                cssJenisMenu: "label-warning",
                infoKalori: "Shandy",
                infoAlergi: "0892873930",
                file: {},
                namaVendor: "Vendor A"

            },
            {
                id: "4",
                namaMenu: "Sayur Bayam",
                jenisMenu: "Sayur",
                cssJenisMenu: "label-primary",
                infoKalori: "Shandy",
                infoAlergi: "0892873930",
                file: {},
                namaVendor: "Vendor A"

            }
        ]

        // console.log(JSON.stringify($scope.listmenuMakanan));
    }

    $scope.eventClickSave = function () {
        console.log(JSON.stringify($scope.form));
        swal("Data Berhasil Disimpan", {
            icon: "success",
        });

    }
    $scope.eventClickEdit = function (id) {
        $scope.form = {
            "id": "1",
            "namamenuMakanan": "Kantin Go Green",
            "initial": "KGG",
            "alamatmenuMakanan": "Bogor",
            "namaPic": "Shandy",
            "telepon": "093475994",
            "teleponPic": "834995003",
            "tglBergabung": "2019-12-10T00:00:00.000Z"
        }
    }

    $scope.eventClickDelete = function (id) {
        swal({
                title: "Delete!!!",
                text: "Yakin Ingin Menghapus Data ini?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Data Berhasil Dihapus!", {
                        icon: "success",
                    });
                } else {
                    // swal("Data To");
                }
            });
    }

    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        var exportHref = Excel.tableToExcel(tableId, 'HistoryProjectMilestone');
        $timeout(function () {
            location.href = exportHref;
        }, 100); // trigger download
    }

    $scope.clearForm = function () {
        $scope.form.id = "";
        $scope.form.namamenuMakanan = "";
        $scope.form.initial = "";
        $scope.form.alamatmenuMakanan = "";
        $scope.form.namaPic = "";
        $scope.form.telepon = "";
        $scope.form.teleponPic = "";
        $scope.form.tglBergabung = "";
    }

    $scope.formLoad();

})