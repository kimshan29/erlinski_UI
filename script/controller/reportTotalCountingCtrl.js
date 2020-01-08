mainApp.controller("reportTotalCountingCtrl", function ($scope, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, Upload) {
    $scope.Helper = Helper;
    $scope.currentUser = {};


    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }

        $scope.renderList();

    }




    $scope.renderList = function () {
        // var apiUrl = "/api/vendor";
        // HttpRequest.get(apiUrl).success(function (response) {
        //     $scope.listVendor = response.items;
        //     console.log(JSON.stringify($scope.listVendor));

        // })

        $scope.listData = [{
                id: "1",
                date: "26-07-2019",
                status: "Employee",
                namaLengkap: "Rama Rangga Ramadhan",
                vendor: "Shandy",
                menuUtama: "Opor Ayam",
                menuTambahan: "Tempe",
                sayur: "Tumis Kangkung",
                buah: "Melon",
                totalKalori: "200",

            },
            {
                id: "2",
                date: "26-07-2019",
                status: "Employee",
                namaLengkap: "Rama Rangga Ramadhan",
                vendor: "Shandy",
                menuUtama: "Opor Ayam",
                menuTambahan: "Tempe",
                sayur: "Tumis Kangkung",
                buah: "Melon",
                totalKalori: "200",

            },
            {
                id: "3",
                date: "26-07-2019",
                status: "Employee",
                namaLengkap: "Rama Rangga Ramadhan",
                vendor: "Shandy",
                menuUtama: "Opor Ayam",
                menuTambahan: "Tempe",
                sayur: "Tumis Kangkung",
                buah: "Melon",
                totalKalori: "200",

            }
        ]

        // console.log(JSON.stringify($scope.listVendor));
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
            "namaVendor": "Kantin Go Green",
            "initial": "KGG",
            "alamatVendor": "Bogor",
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
        $scope.form.namaVendor = "";
        $scope.form.initial = "";
        $scope.form.alamatVendor = "";
        $scope.form.namaPic = "";
        $scope.form.telepon = "";
        $scope.form.teleponPic = "";
        $scope.form.tglBergabung = "";
    }

    $scope.formLoad();
})