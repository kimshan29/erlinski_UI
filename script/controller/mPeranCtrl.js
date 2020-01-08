mainApp.controller("mPeranCtrl", function ($scope, $sce, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder) {

    $scope.currentUser = {};

    $scope.pageSize = 10;
    $scope.currentPage = 1;

    //Procedures =====================================================================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }

        // $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withOption('responsive', true).withDisplayLength(10);

        $scope.renderList();
    }

    $scope.pilihAkses = function (id) {
        $scope.idPeran = id;
        var apiUrl = "/api/akses/getAksesByIdRole?id=" + $scope.idPeran;
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listMenu = response.items;
            console.log(JSON.stringify($scope.listRole));


        })
    }
    $scope.renderList = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/role";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listRole = response.items;
            console.log(JSON.stringify($scope.listRole));
            $('.Loading').hide();
            $('.page-form').show();

        })



    }

    //Event Handlers ===================================================================================================================
    $scope.eventClickSave = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/role/addRole";
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
        var apiUrl = "/api/role/updateRole";
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

    $scope.eventClickAdd = function () {
        $scope.btnSave = true;
        $scope.btnUpdate = false;
    }
    $scope.eventClickEdit = function (id) {
        $scope.btnSave = false;
        $scope.btnUpdate = true;

        var apiUrl = "/api/role?id=" + id;
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
                    var apiUrl = "/api/role/deleteRole";
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

    $scope.item = {};
    $scope.checkAll = function () {
        $scope.item.status = true;
    }
    $scope.eventClickSaveAkses = function () {
        $('.Loading').show();
        $('.page-form').hide();

        $scope.currentUser.email = "Admin";
        var apiUrl = "/api/aksesRole/addAksesRole";
        $scope.formAkses = {
            idRole: $scope.idPeran,
            listMenu: $scope.listMenu,
            createdBy: $scope.currentUser.email
        }

        console.log(JSON.stringify($scope.formAkses));
        // $scope.peranPopup.data.diubahOleh = $scope.currentUser.email;
        HttpRequest.post(apiUrl, $scope.formAkses).success(function (response) {
                $('#myModalAkses').modal('hide');
                $scope.renderList();

                // $('.Loading').hide();
                // $('.page-form').show();
            })
            .error(function (response, code) {


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

    $scope.closeModal = function () {
        $('#myModal').modal('hide');
        $scope.clearForm();
    }

    $scope.clearForm = function () {
        $scope.form.id = "";
        $scope.form.namaRole = "";
        $scope.form.keterangan = "";
    }

    //Start of Application =============================================================================================================
    $scope.formLoad();
});