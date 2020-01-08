mainApp.controller("mMenuCtrl", function ($scope, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder) {

    $scope.currentUser = {};

    $scope.menu = {};
    $scope.menu.data = {};
    $scope.menu.master = {};
    $scope.menu.master.menuParent = [];
    $scope.menu.input = {};
    $scope.menu.isEditMode = false;
    $scope.menu.isView = false;
    $scope.pageSize = 10;
    $scope.currentPage = 1;

    $scope.menu.master.icon = [{
            icon: "fa fa-angle-double-right"
        },
        {
            icon: "fa fa-bell"
        },
        {
            icon: "fa fa-desktop"
        },
        {
            icon: "fa fa-file-o"
        },
        {
            icon: "fa fa-file-text-o"
        },
        {
            icon: "fa fa-glass"
        },
        {
            icon: "fa fa-home"
        },
        {
            icon: "fa fa-plus-square"
        },
        {
            icon: "fa fa-send"
        },
        {
            icon: "fa fa-th"
        }
    ];
    $scope.menu.master.level = ["1", "2", "3"];

    $scope.isAdd = false;


    //Procedures =====================================================================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }


        $scope.renderList();
    }

    $scope.getMenuParent = function () {
        var apiUrl = "/api/akses/getParentMenu";
        HttpRequest.get(apiUrl).success(function (response) {

            $scope.menu.master.menuParent = response.items;
            console.log(JSON.stringify($scope.menu.master.menuParent));

        });
    }

    $scope.renderList = function () {
        // NProgress.start();
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/akses";
        HttpRequest.get(apiUrl).success(function (response) {

            $scope.listMenu = response.items;
            $scope.getMenuParent();
            console.log(JSON.stringify($scope.listMenu));

            $('.Loading').hide();
            $('.page-form').show();
        });
    }

    //Event Handlers ===================================================================================================================
    $scope.eventClickAdd = function () {
        $scope.btnSave = true;
        $scope.btnUpdate = false;
    }

    $scope.eventClickCancel = function () {
        $scope.renderMenu();
        $scope.menu.isEditMode = false;
    }

    $scope.eventClickSave = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/akses/addAkses";
        $scope.form.createdBy = $scope.currentUser.email;

        HttpRequest.post(apiUrl, $scope.form).success(function (response) {
            console.log(JSON.stringify($scope.form));
            $('.Loading').hide();
            $('.page-form').show();
            $scope.renderList();
            $scope.closeModal();
            swal("Data Berhasil Disimpan", {
                icon: "success",
            });

        })


    }

    $scope.eventClickUpdate = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/akses/updateAkses";
        $scope.form.createdBy = $scope.currentUser.email;

        HttpRequest.post(apiUrl, $scope.form).success(function (response) {
            $('.Loading').hide();
            $('.page-form').show();
            console.log(JSON.stringify($scope.form));
            $scope.renderList();
            $scope.closeModal();
            swal("Data Berhasil Diupdate", {
                icon: "success",
            });
        })
    }

    $scope.eventClickEdit = function (id) {
        $scope.btnSave = false;
        $scope.btnUpdate = true;

        var apiUrl = "/api/akses?id=" + id;
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form = response.items;
            console.log(JSON.stringify($scope.form));

        })
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
                    var apiUrl = "/api/akses/deleteAkses";
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
                    $('.Loading').hide();
                    $('.page-form').show();
                }
            });
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

    $scope.closeModal = function () {
        $('#myModal').modal('hide');
        $scope.clearForm();
        console.log("clearForm");

    }

    $scope.clearForm = function () {
        $scope.form.id = "";
        $scope.form.namaMenu = "";
        $scope.form.menuParent = "";
        $scope.form.url = "";
        $scope.form.noUrut = "";
        $scope.form.levelMenu = "";
        $scope.form.tipeMenu = "";
        $scope.form.icon = "";
        $scope.form.target = "";
    }

    //Start of Application =============================================================================================================
    $scope.formLoad();
});