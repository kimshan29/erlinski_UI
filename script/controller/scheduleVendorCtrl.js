mainApp.controller("scheduleVendorCtrl", function ($route, $scope, $routeParams, $q, $http, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, Helper, Upload, $timeout) {
    $scope.Helper = Helper;
    $scope.currentUser = {};

    $scope.user = {};
    $scope.user.data = {};
    $scope.user.master = {};
    $scope.user.master.unit = [];
    $scope.user.master.peran = [];
    $scope.user.input = {};
    $scope.user.isEditMode = false;
    $scope.isAdd = false;

    $scope.userexist = false;
    $scope.emailexist = false;
    $scope.user.exist = {};

    $scope.formLoad = function () {

        $scope.renderList();

    }




    $scope.renderList = function () {
        // var apiUrl = "/api/vendor";
        // HttpRequest.get(apiUrl).success(function (response) {
        //     $scope.listVendor = response.items;
        //     console.log(JSON.stringify($scope.listVendor));

        // })

        $scope.listVendor = [{
                id: "1",
                namaVendor: "Vendor A",
                initial: "Vendor A",
                alamatVendor: "Bogor",
                namaPic: "Shandy",
                telepon: "0892873930",
                teleponPic: "0893839499",
                tglBergabung: "22-12-2019"

            },
            {
                id: "2",
                namaVendor: "Vendor B",
                initial: "Vendor A",
                alamatVendor: "Bogor",
                namaPic: "Shandy",
                telepon: "0892873930",
                teleponPic: "0893839499",
                tglBergabung: "22-12-2019"

            },
            {
                id: "3",
                namaVendor: "Vendor C",
                initial: "Vendor A",
                alamatVendor: "Bogor",
                namaPic: "Shandy",
                telepon: "0892873930",
                teleponPic: "0893839499",
                tglBergabung: "22-12-2019"

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