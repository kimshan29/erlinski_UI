mainApp.controller("masterUsertrl", function ($scope, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder) {
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

    //Procedures =====================================================================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }

        // $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withOption('responsive', true).withDisplayLength(10);

        $scope.renderUser();


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

    $scope.renderUser = function () {
        // NProgress.start();
        // var apiUrl = "/api/UserInRole";
        // HttpRequest.get(apiUrl).success(function (response) {
        // NProgress.done();
        // });
    }

    //Event Handlers ===================================================================================================================
    $scope.eventClickAdd = function () {
        $scope.user.input = {};
        $scope.isAdd = true;
        $scope.user.isEditMode = true;
        $scope.user.input.typeUser = "INDONESIA POWER";
        $scope.hideJVC();
    }

    $scope.eventClickCancel = function () {
        $scope.renderUser();
        $scope.user.isEditMode = false;
    }

    $scope.eventClickSave = function () {
        var apiUrl = "/api/UserInRole";
        // var apiUrl="";
        if ($scope.isAdd == true) { // INI TAMBAH USER

            if ($scope.userexist == false && $scope.emailexist == false) {

                $scope.user.input.dibuatOleh = $scope.currentUser.email;
                // console.log(JSON.stringify($scope.user.input));
                HttpRequest.post(apiUrl, $scope.user.input).success(function (response) {
                        $scope.renderUser();
                        $scope.user.isEditMode = false;
                    })
                    .error(function (response, code) {
                        NProgress.done();

                        var data = {
                            title: "User",
                            exception: response,
                            exceptionCode: code,
                            operation: "POST",
                            apiUrl: apiUrl
                        };

                        Helper.notifErrorHttp(data);
                    });
            }

        } else { // INI EDIT USER

            $scope.user.input.diubahOleh = $scope.currentUser.email;
            HttpRequest.post(apiUrl, $scope.user.input).success(function (response) {
                    $scope.renderUser();
                    $scope.user.isEditMode = false;
                })
                .error(function (response, code) {
                    NProgress.done();

                    var data = {
                        title: "User",
                        exception: response,
                        exceptionCode: code,
                        operation: "POST",
                        apiUrl: apiUrl
                    };

                    Helper.notifErrorHttp(data);
                });
        }




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
                    $scope.renderUser();
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

    $scope.eventChangeUnit = function () {
        var masterUnit = $scope.user.master.unit;
        var selectedUnit = Helper.findItem(masterUnit, "id", $scope.user.input.unit.id);
        $scope.user.input.unit.id = selectedUnit.id;
        $scope.user.input.unit.name = selectedUnit.name;
    }

    $scope.eventChangePeran = function () {
        var masterPeran = $scope.user.master.peran;
        var selectedPeran = Helper.findItem(masterPeran, "id", $scope.user.input.peran.id);
        $scope.user.input.peran.id = selectedPeran.id;
        $scope.user.input.peran.name = selectedPeran.name;
    }

    $scope.eventCekUserExist = function (name) {

        var DataExist = $scope.user.exist;
        $scope.exist = Helper.findItem(DataExist, 'userName', name);
        if ($scope.exist != null) {
            $scope.userexist = true;
        } else {
            $scope.userexist = false;
        }
    }

    $scope.eventCekUserExistEmail = function (email) {

        var DataExist = $scope.user.exist;
        $scope.exist = Helper.findItem(DataExist, 'email', email);
        if ($scope.exist != null) {
            $scope.emailexist = true;
        } else {
            $scope.emailexist = false;
        }
    }

    $scope.hideJVC = function () {
        $scope.company = true;
        // $scope.jobTitle = true;
        $scope.emailJvc = true;
        $scope.email = false;


        $scope.user.input.email = null;
        $scope.user.input.emailJvc = null;
        $scope.user.input.fullName = null;
        $scope.user.input.peran = null;
        $scope.user.input.groupAkses = null;
        $scope.user.input.tglAwalAktif = null;
        $scope.user.input.tglAkhirAktif = null;
        $scope.user.input.company = null;
        $scope.user.input.jobTitle = null;

    }

    $scope.showJVC = function () {
        $scope.company = false;
        // $scope.jobTitle = false;

        $scope.emailJvc = false;
        $scope.email = true;


        $scope.user.input.email = null;
        $scope.user.input.emailJvc = null;
        $scope.user.input.fullName = null;
        $scope.user.input.peran = null;
        $scope.user.input.groupAkses = null;
        $scope.user.input.tglAwalAktif = null;
        $scope.user.input.tglAkhirAktif = null;
        $scope.user.input.company = null;
        $scope.user.input.jobTitle = null;

    }

    //Start of Application =============================================================================================================
    $scope.formLoad();
});