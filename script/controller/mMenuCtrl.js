mainApp.controller("mMenuCtrl", function ($scope, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder) {

    $scope.currentUser = {};

    $scope.menu = {};
    $scope.menu.data = {};
    $scope.menu.master = {};
    $scope.menu.master.menuParent = [];
    $scope.menu.input = {};
    $scope.menu.isEditMode = false;
    $scope.menu.isView = false;

    $scope.menu.master.icon = [{ icon: "fa fa-angle-double-right" },
                               { icon: "fa fa-bell" },
                               { icon: "fa fa-desktop" },
                               { icon: "fa fa-file-o" },
                               { icon: "fa fa-file-text-o" },
                               { icon: "fa fa-glass" },
                               { icon: "fa fa-home" },
                               { icon: "fa fa-plus-square" },
                               { icon: "fa fa-send" },
                               { icon: "fa fa-th" }
                              ];
    $scope.menu.master.level = [1,2,3];

    $scope.isAdd = false;


    //Procedures =====================================================================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        }
        catch (err) {
            $scope.currentUser = {};
        }

        $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withOption('responsive', true).withDisplayLength(10);

        $scope.renderMenu();
    }

    $scope.renderMenu = function () {
        NProgress.start();
        var apiUrl = "/api/MasterMenu";
        HttpRequest.get(apiUrl).success(function (response) {

            var apiUrl2 = "/api/MasterMenu";
            HttpRequest.get(apiUrl2).success(function (response) {
                $scope.menu.master.menuParent = response;
                $scope.menu.master.menuParent.unshift({id:"",namaMenu:""});
            });

            $scope.menu.data = response;
            NProgress.done();
        });
    }

    //Event Handlers ===================================================================================================================
    $scope.eventClickAdd = function () {
        $scope.menu.input = {};
        $scope.menu.isEditMode = true;
        $scope.isAdd = true;

        $scope.lastNoUrut = null;

        var apiUrl2 = "/api/GetLastNoUrutMenu?idParen=";
        HttpRequest.get(apiUrl2).success(function (response) {
            $scope.lastNoUrut = response.LastUrutan;

            $scope.menu.input = {
                id: "00000000-0000-0000-0000-000000000000",
                namaMenu: "",
                menuParent: {
                    id: "00000000-0000-0000-0000-000000000000",
                    name: ""
                },
                url: null,
                icon: null,
                level: null,
                tipe: null,
                noUrut: $scope.lastNoUrut,
                target: "",
                onClickHandler: "",
                isNotif: false,
                flagBerlaku: false,
                flagTampil: false,
                tglAwalAktif: null,
                tglAkhirAktif: null,
                dibuatOleh: null,
                dibuatTgl: null,
                diubahOleh: null,
                diubahTgl: null
            };
        });
    }

    $scope.eventClickCancel = function () {
        $scope.renderMenu();
        $scope.menu.isEditMode = false;
    }

    $scope.eventClickSave = function () {
        var apiUrl = "/api/MasterMenu";

        if ($scope.isAdd == true) {
            $scope.menu.input.dibuatOleh = $scope.currentUser.email;
        } else {
            $scope.menu.input.diubahOleh = $scope.currentUser.email;
        }

        HttpRequest.post(apiUrl, $scope.menu.input).success(function (response) {
            $scope.renderMenu();
            $scope.menu.isEditMode = false;
        })
        .error(function (response, code) {
            NProgress.done();
            var data = {
                title: "MENU",
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
        $scope.isAdd = false;
        var apiUrl = "/api/MasterMenu/" + id;

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.menu.input = response;
            $scope.menu.input.tglAwalAktif = $scope.menu.input.tglAwalAktif != null ? $scope.menu.input.tglAwalAktif.toDate() : null;
            $scope.menu.input.tglAkhirAktif = $scope.menu.input.tglAkhirAktif != null ? $scope.menu.input.tglAkhirAktif.toDate() : null;
            $scope.menu.isEditMode = true;
            NProgress.done();
        })
        .error(function (response, code) {
            NProgress.done();

            var data = {
                title: "MENU",
                exception: response,
                exceptionCode: code,
                operation: "GET",
                apiUrl: apiUrl
            };

            Helper.notifErrorHttp(data);
        });
    }

    $scope.eventClickHapus = function (id, name) {

        var apiUrl = "/api/MasterMenu?idMenu=" + id + "&userEmail=" + $scope.currentUser.email;
        var hapus = confirm("Hapus " + name + "?");

        if (hapus) {
            NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                $scope.renderMenu();
                $scope.menu.isEditMode = false;
                NProgress.done();
            })
            .error(function (response, code) {
                NProgress.done();

                var data = {
                    title: "MENU",
                    exception: response,
                    exceptionCode: code,
                    operation: "DELETE",
                    apiUrl: apiUrl
                };

                Helper.notifErrorHttp(data);
            });
        }
    }
    
    $scope.eventChangeParent = function () {
        var masterParent = $scope.menu.master.menuParent;
        var selectedParent = Helper.findItem(masterParent, "id", $scope.menu.input.menuParent.id);
        $scope.menu.input.menuParent.id = selectedParent.id;
        $scope.menu.input.menuParent.name = selectedParent.name;

        var apiUrl2 = "/api/GetLastNoUrutMenu?idParen=" + selectedParent.id;
        HttpRequest.get(apiUrl2).success(function (response) {
            $scope.menu.input.noUrut = response.LastUrutan;

        });
    }

    $scope.eventClickView = function (ID) {
        NProgress.start();
        var apiUrl = "/api/MasterMenu/" + ID;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.menu.input = response;
            $scope.menu.input.tglAwalAktif = $scope.menu.input.tglAwalAktif != null ? $scope.menu.input.tglAwalAktif.toDate() : null;
            $scope.menu.input.tglAkhirAktif = $scope.menu.input.tglAkhirAktif != null ? $scope.menu.input.tglAkhirAktif.toDate() : null;
            $scope.menu.isView = true;
            NProgress.done();
        })
        .error(function (response, code) {
            NProgress.done();

            var data = {
                title: "MENU",
                exception: response,
                exceptionCode: code,
                operation: "GET",
                apiUrl: apiUrl
            };

            Helper.notifErrorHttp(data);
        });
    }

    $scope.eventClickBack = function (id) {
        NProgress.start();
        $scope.menu.isView = false;
        NProgress.done();
    }

    //Start of Application =============================================================================================================
    $scope.formLoad();
});