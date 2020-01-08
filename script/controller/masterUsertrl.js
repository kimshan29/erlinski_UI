mainApp.controller("masterUsertrl", function ($scope, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder) {
    $scope.Helper = Helper;
    $scope.currentUser = {};
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.master = {};

    $scope.aktiveVendor = false;

    //Procedures =====================================================================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }

        // $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withOption('responsive', true).withDisplayLength(10);

        $scope.renderList();
        $scope.renderVendor();


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

    $scope.getAtributeUser = function (email) {
        // console.log(email);
        $scope.user.input.fullName = email.fullName;
        $scope.user.input.jobTitle = email.jobTitle;
        // console.log(JSON.stringify($scope.user.input.fullName))

    }
    $scope.getJabatan = function () {
        var apiUrl = "/api/jabatan";
        HttpRequest.get(apiUrl).success(function (response) {

            $scope.master.jabatan = response.items;
            console.log(JSON.stringify($scope.master.jabatan));

        });
    }

    $scope.getMasterRole = function () {
        var apiUrl = "/api/role";
        HttpRequest.get(apiUrl).success(function (response) {

            $scope.master.role = response.items;
            console.log(JSON.stringify($scope.master.role));


        });
    }
    $scope.renderList = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/user";
        HttpRequest.get(apiUrl).success(function (response) {

            $scope.listUser = response.items;
            $scope.getJabatan();
            $scope.getMasterRole();
            console.log(JSON.stringify($scope.listUser));

            $('.Loading').hide();
            $('.page-form').show();
        });
    }

    $scope.renderVendor = function () {
        var apiUrl = "/api/vendor";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.vendor = response.items;
            console.log(JSON.stringify($scope.listVendor));
        })
    }

    $scope.getVendor = function (idRoleVendor) {
        console.log(idRoleVendor);

        if (idRoleVendor == 3) {
            $scope.aktiveVendor = true;
            $scope.renderVendor();
        } else {
            $scope.aktiveVendor = false;
        }

    }

    $scope.cekUserName = (username) => {
        var apiUrl = "/api/user?username=" + username;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.statusUser = response.status;

            if ($scope.statusUser == true) {
                $scope.showValidasi = true;
            } else {
                $scope.showValidasi = false;
            }
            // console.log($scope.statusUser);

        })
    }
    //Event Handlers ===================================================================================================================
    $scope.eventClickAdd = function () {
        $scope.btnSave = true;
        $scope.btnUpdate = false;
    }

    $scope.eventClickCancel = function () {
        $scope.renderList();

    }

    $scope.eventClickSave = function () {

        // var apiUrl="";
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/user/addUser";
        $scope.form.createdBy = $scope.currentUser.email;
        console.log(JSON.stringify($scope.form));

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

        // var apiUrl="";
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/api/user/updateUser";
        $scope.form.createdBy = $scope.currentUser.email;
        console.log(JSON.stringify($scope.form));

        HttpRequest.post(apiUrl, $scope.form).success(function (response) {
            console.log(JSON.stringify($scope.form));
            $('.Loading').hide();
            $('.page-form').show();
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

        var apiUrl = "/api/user?id=" + id;
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form = response.items;
            if ($scope.form.roleUser == 3) {
                $scope.aktiveVendor = true;
                $scope.renderVendor();
            } else {
                $scope.aktiveVendor = false;
            }
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
    $scope.closeModal = function () {
        $('#myModal').modal('hide');
        $scope.clearForm();
        console.log("clearForm");

    }

    $scope.clearForm = function () {
        $scope.form.id = "";
        $scope.form.nip = "";
        $scope.form.namaLengkap = "";
        $scope.form.email = "";
        $scope.form.username = "";
        $scope.form.password = "";
        $scope.form.jabatan = "";
        $scope.form.roleUser = "";
        $scope.form.vendor = "";

    }

    $scope.minPass = () => {
        var jml = $scope.form.password;
        $scope.jmlChar = jml.length;
        console.log($scope.jmlChar);

    }

    //Start of Application =============================================================================================================
    $scope.formLoad();
});