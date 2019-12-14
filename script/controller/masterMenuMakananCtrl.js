mainApp.controller("masterMenuMakananCtrl", function ($http, $scope, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper) {

    $scope.Helper = Helper;
    $scope.currentUser = {};
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.master = [];

    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }

        $scope.renderList();
        $scope.getVendor();
        $scope.getJenisMenu();

    }

    $scope.getVendor = function () {
        var apiUrl = "/api/vendor";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.vendor = response.items;
            console.log(JSON.stringify($scope.master.vendor));

        })
    }

    $scope.getJenisMenu = function () {
        var apiUrl = "/api/jenisMenu";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.jenisMenu = response.items;
            console.log(JSON.stringify($scope.master.jenisMenu));

        })
    }
    $scope.renderList = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/menu";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listMenuMakanan = response.items;
            console.log(JSON.stringify($scope.listMenuMakanan));
            $('.Loading').hide();
            $('.page-form').show();

        })
        // console.log(JSON.stringify($scope.listmenuMakanan));
    }

    $scope.eventClickAdd = function () {
        $scope.modeEdit = false;
        $scope.modeAdd = true;

        $scope.btnSave = true;
        $scope.btnUpdate = false;
    }
    $scope.eventClickSave = function (file) {
        console.log(file);

        $scope.form.username = $scope.currentUser.email;
        var dataForm = $scope.form;
        var apiUrl = "/api/menu/addMenu";

        console.log(JSON.stringify(dataForm));
        HttpRequest.post(apiUrl, dataForm).success(function (response) {
            $scope.idMenu = response;
            $scope.renderList();
            $scope.closeModal();
            // if (file == undefined) {
            //     $scope.eventClickCancel();
            //     console.log("1");
            //     $scope.listMenuMakanan();
            // } else {
            //     file.upload = Upload.upload({
            //         url: 'http://192.168.100.185:20010/api/UploadMenuMakanan',
            //         // url: '',
            //         data: {
            //             idMenu: $scope.idMenu,
            //             file: file
            //         },
            //     });

            //     file.upload.then(function (response) {
            //         $timeout(function () {
            //             file.result = response.data;
            //             console.log(JSON.stringify(response.data));
            //         });

            //         // Get List Upload File
            //         $scope.listMenuMakanan();
            //         swal("Data Berhasil Disimpan", {
            //             icon: "success",
            //         });
            //         console.log(response.data);
            //         // $scope.eventClickCloseModal();
            //         $scope.clearForm();
            //         //  $scope.announcement.isEditMode = false;
            //     }, function (response) {
            //         if (response.status > 0)
            //             $scope.errorMsg = response.status + ': ' + response.data;
            //         console.log(response.data);

            //     }, function (evt) {
            //         // Math.min is to fix IE which reports 200% sometimes
            //         file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

            //     });
            // }

            console.log(JSON.stringify($scope.form));
        });
        // console.log(JSON.stringify($scope.form));


    }

    $scope.eventClickUpdate = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/menu/updateMenu";
        $scope.form.createdBy = $scope.currentUser.email;

        HttpRequest.post(apiUrl, $scope.form).success(function (response) {
            $('.Loading').hide();
            $('.page-form').show();
            console.log(JSON.stringify($scope.form));
            $scope.renderList();
            $scope.closeModal();
            swal("Data Berhasil Disimpan", {
                icon: "success",
            });
        })
    }
    $scope.eventClickEdit = function (id) {

        $scope.btnSave = false;
        $scope.btnUpdate = true;
        var apiUrl = "/api/menu?id=" + id;
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form = response.items;
            console.log(JSON.stringify($scope.form));

        })

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
                $('.Loading').show();
                $('.page-form').hide();
                if (willDelete) {
                    $scope.dataForm = {
                        id: id,
                        updateBy: $scope.currentUser.email
                    }
                    var apiUrl = "/api/menu/deleteMenu";
                    HttpRequest.post(apiUrl, $scope.dataForm).success(function () {
                        $('.Loading').hide();
                        $('.page-form').show();
                        swal("Data Berhasil Dihapus!", {
                            icon: "success",
                        });
                        $scope.renderList();
                    })

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

    $scope.closeModal = function () {
        $('#myModal').modal('hide');
        $scope.clearForm();
    }
    $scope.clearForm = function () {
        $scope.form.id = "";
        $scope.form.jenisMenu = "";
        $scope.form.namaMenu = "";
        $scope.form.infoKalori = "";
        $scope.form.infoAlergi = "";
        $scope.form.file = undefined;
        $scope.form.namaVendor = "";


    }

    $scope.formLoad();

})