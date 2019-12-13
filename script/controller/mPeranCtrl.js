mainApp.controller("mPeranCtrl", function ($scope, $sce, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder) {

    $scope.currentUser = {};

    $scope.peran = {};
    $scope.peran.data = {};
    $scope.peran.master = {};
    $scope.peran.input = {};
    $scope.peranPopup = {};
    $scope.peranPopup.data = {};
    $scope.peran.isEditMode = false;
    $scope.isAdd = false;

    //Procedures =====================================================================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }

        // $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withOption('responsive', true).withDisplayLength(10);

        $scope.renderperan();
    }

    $scope.renderperan = function () {
        $scope.listRole = [{
                id: "1",
                namaRole: "Super Admin",
                keterangan: "Super Admin"
            },
            {
                id: "2",
                namaRole: "Admin",
                keterangan: "Admin"
            },
            {
                id: "3",
                namaRole: "Vendor",
                keterangan: "Vendor Kantin"
            },
            {
                id: "4",
                namaRole: "User",
                keterangan: "Karyawan"
            }
        ]

        $scope.listMenu = [{
                id: "1",
                namaMenu: "Master Menu Makanan",
            },
            {
                id: "2",
                namaMenu: "Master Vendor",
            }
        ]

        // NProgress.start();
        // var apiUrl = "/api/MasterRole";
        // HttpRequest.get(apiUrl).success(function (response) {
        //     $scope.peran.data = response;
        //     NProgress.done();
        // });
    }

    //Event Handlers ===================================================================================================================
    $scope.eventClickAdd = function () {
        $scope.peran.input = {};
        $scope.peran.isEditMode = true;
        $scope.isAdd = true;

        $scope.peran.input = {
            id: "00000000-0000-0000-0000-000000000000",
            namaPeran: "",
            keterangan: "",
            flagBerlaku: false,
            tglAwalAktif: null,
            tglAkhirAktif: null,
            dibuatOleh: null,
            dibuatTgl: null,
            diubahOleh: null,
            diubahTgl: null
        }
    }

    $scope.eventClickCancel = function () {
        $scope.renderperan();
        $scope.peran.isEditMode = false;
        $scope.isAdd = false;
    }

    $scope.eventClickSave = function () {
        NProgress.start();
        var apiUrl = "/api/MasterRole";

        if ($scope.isAdd == true) {
            $scope.peran.input.dibuatOleh = $scope.currentUser.email;
        } else {
            $scope.peran.input.diubahOleh = $scope.currentUser.email;
        }
        HttpRequest.post(apiUrl, $scope.peran.input).success(function (response) {
                $scope.renderperan();
                $scope.peran.isEditMode = false;
                NProgress.done();
            })
            .error(function (response, code) {
                NProgress.done();

                var data = {
                    title: "PERAN",
                    exception: response,
                    exceptionCode: code,
                    operation: "POST",
                    apiUrl: apiUrl
                };

                Helper.notifErrorHttp(data);
            });
    }

    $scope.eventClickEdit = function (id) {
        NProgress.start();

        var apiUrl = "/api/MasterRole/" + id;

        HttpRequest.get(apiUrl).success(function (response) {
                $scope.peran.input = response;
                $scope.peran.input.tglAwalAktif = $scope.peran.input.tglAwalAktif != null ? $scope.peran.input.tglAwalAktif.toDate() : null;
                $scope.peran.input.tglAkhirAktif = $scope.peran.input.tglAkhirAktif != null ? $scope.peran.input.tglAkhirAktif.toDate() : null;
                $scope.peran.isEditMode = true;
                $scope.isAdd = false;
                NProgress.done();
            })
            .error(function (response, code) {
                NProgress.done();

                var data = {
                    title: "PERAN",
                    exception: response,
                    exceptionCode: code,
                    operation: "GET",
                    apiUrl: apiUrl
                };

                Helper.notifErrorHttp(data);
            });
    }

    $scope.eventClickHapus = function (id, name) {

        var apiUrl = "/api/MasterRole?idPeran=" + id + "&userEmail=" + $scope.currentUser.email;
        var hapus = confirm("Hapus " + name + "?");

        if (hapus) {
            NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                    $scope.renderperan();
                    $scope.peran.isEditMode = false;
                    NProgress.done();
                })
                .error(function (response, code) {
                    NProgress.done();

                    var data = {
                        title: "PERAN",
                        exception: response,
                        exceptionCode: code,
                        operation: "DELETE",
                        apiUrl: apiUrl
                    };

                    Helper.notifErrorHttp(data);
                });
        }
    }

    $scope.eventClickAkses = function (id) {
        NProgress.start();

        var apiUrl = "/api/MenuAccessInRoleByIdRole/" + id;

        HttpRequest.get(apiUrl).success(function (response) {
                $scope.peranPopup.data = response;
                NProgress.done();
                $('#modalAkses').modal('show');
            })
            .error(function (response, code) {
                NProgress.done();

                var data = {
                    title: "PERAN - AKSES",
                    exception: response,
                    exceptionCode: code,
                    operation: "GET",
                    apiUrl: apiUrl
                };

                Helper.notifErrorHttp(data);
            });
    }

    $scope.eventClickSaveAkses = function () {
        NProgress.start();
        var apiUrl = "/api/MenuAccessInRole";

        $scope.peranPopup.data.diubahOleh = $scope.currentUser.email;
        HttpRequest.post(apiUrl, $scope.peranPopup.data).success(function (response) {
                $('#modalAkses').modal('hide');
                NProgress.done();
            })
            .error(function (response, code) {
                NProgress.done();

                var data = {
                    title: "PERAN AKSES",
                    exception: response,
                    exceptionCode: code,
                    operation: "POST",
                    apiUrl: apiUrl
                };

                Helper.notifErrorHttp(data);
            });
    }

    $scope.eventClickCancelAkses = function () {
        NProgress.start();
        $('#modalAkses').modal('hide');
        NProgress.done();
    }

    $scope.isParent = function (menuParent) {
        if (menuParent != null) {
            return "padding-left-20-important";
        } else {
            return "font-bold font-14";
        }
    }

    $scope.haveParent = function (id, menuParent) {
        if (menuParent != null) {
            return "treegrid-" + id + " treegrid-parent-" + menuParent;
        } else {
            return "treegrid-" + id + " treegrid-expand";
        }
    }

    $scope.reconfigureTable = function () {
        $('.tree').treegrid();
    }


    //Start of Application =============================================================================================================
    $scope.formLoad();
});