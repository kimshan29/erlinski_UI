mainApp.controller("displayMenuCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers, Upload, $timeout) {
    //Variable


    $scope.currentUser = {};
    $scope.announcement = {};
    $scope.announcement.isEditMode = false;
    // console.log($scope.announcement.isEditMode);


    $scope.currentDate = new Date();
    console.log($scope.currentDate);


    //Form Load ======================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }
        // alert("testing");
        // $('#komitmenkepatuhan').attr('disabled', 'disabled').off('click');
        $scope.renderListAnnouncement();
    }

    $scope.renderListAnnouncement = function () {
        var apiUrl = "/api/Announcement";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listAnnouncement = response;
            console.log(JSON.stringify($scope.listAnnouncement));
            // console.log("1");
        })
    }

    $scope.eventClickAdd = function () {
        $scope.announcement.isEditMode = true;
        $scope.modeEdit = false;
        $scope.modeAdd = true;
        // console.log($scope.announcement.isEditMode);
    }

    $scope.eventClickSave = function (file) {
        $scope.form.username = $scope.currentUser.email;
        var dataForm = $scope.form;
        var apiUrl = "/api/Announcement";

        console.log(JSON.stringify(dataForm));
        HttpRequest.post(apiUrl, dataForm).success(function (response) {
            $scope.idAnnouncement = response;

            if (file == undefined) {
                $scope.eventClickCancel();
                console.log("1");
                $scope.renderListAnnouncement();
            } else {
                file.upload = Upload.upload({
                    url: 'http://192.168.100.185:2010/api/UploadAnnouncement',
                    // url: '',
                    data: {
                        idAnnouncement: $scope.idAnnouncement,
                        file: file
                    },
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(JSON.stringify(response.data));
                    });

                    // Get List Upload File
                    $scope.renderListAnnouncement();

                    console.log(response.data);
                    // $scope.eventClickCloseModal();
                    $scope.announcement.isEditMode = false;
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    console.log(response.data);

                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });
            }

            console.log(JSON.stringify($scope.form));
        });


    }

    $scope.eventClickEdit = function (id) {
        // $('#myModal').modal({
        //     show: true
        // });

        $scope.announcement.isEditMode = true;
        $scope.modeEdit = true;
        $scope.modeAdd = false;
        var apiUrl = "/api/Announcement/" + id;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form = response;
            $scope.form.tglMulaiPublish = response.tglMulaiPublish.toDate();
            $scope.form.tglSelesaiPublish = response.tglSelesaiPublish.toDate();

            console.log(JSON.stringify($scope.form));
        })

        var apiUrlFile = "/api/UploadAnnouncement/" + id;
        console.log(apiUrlFile);
        HttpRequest.get(apiUrlFile).success(function (response) {
            $scope.listFile = response;
            // console.log("mulai jalan");
            // console.log("testing", $scope.listFile.length);
            if ($scope.listFile.length > 0) {
                $scope.modeAdd = false;
                $scope.modeEdit = true;
                console.log("1");
            } else {
                $scope.modeAdd = true;
                $scope.modeEdit = false;

                console.log("2");
            }
        })

    }

    $scope.eventClickHapus = function (id) {

        var apiUrl = "/api/Announcement/" + id;
        console.log(apiUrl);
        var hapus = confirm("Are You Sure You Want to Delete This Announcement?");

        if (hapus) {
            // NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                    $scope.renderListAnnouncement();
                })
                .error(function (response, code) {
                    // NProgress.done();

                    var data = {
                        title: "Announcement",
                        exception: response,
                        exceptionCode: code,
                        operation: "DELETE",
                        apiUrl: apiUrl
                    };

                    Helper.notifErrorHttp(data);
                });
        }
    }

    $scope.eventClickHapusFile = function (idAnnouncement, idFile) {
        console.log(idAnnouncement, idFile);
        var apiUrl = "/api/UploadAnnouncement/" + idFile;
        var hapus = confirm("Are You Sure You Want to Delete This File?");

        if (hapus) {
            // NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                    console.log(JSON.stringify(response));
                    // Post Back Form Edit
                    var apiUrl = "/api/Announcement/" + response;
                    HttpRequest.get(apiUrl).success(function (response) {
                        // $scope.form = response;
                        // console.log(JSON.stringify($scope.form));
                        $scope.form = response;
                        $scope.form.tglMulaiPublish = response.tglMulaiPublish.toDate();
                        $scope.form.tglSelesaiPublish = response.tglSelesaiPublish.toDate();

                        // console.log(JSON.stringify($scope.form));
                    })

                    // Get List File
                    var apiUrlFile = "/api/UploadAnnouncement/" + response;
                    HttpRequest.get(apiUrlFile).success(function (response) {
                        $scope.listFile = response;
                    })
                })
                .error(function (response, code) {
                    // NProgress.done();

                    var data = {
                        title: "Announcement",
                        exception: response,
                        exceptionCode: code,
                        operation: "DELETE",
                        apiUrl: apiUrl
                    };

                    Helper.notifErrorHttp(data);
                });
        }


    }

    $scope.eventClickGetFileUpload = function (id) {
        var apiUrl = "/api/DownloadKIP/" + id;
        document.location.href = webServiceBaseUrl + apiUrl;
    }

    $scope.eventClickCancel = function () {
        $scope.announcement.isEditMode = false;
        $scope.clearForm();
        $scope.editFile = false;
    }
    $scope.clearForm = function () {
        $scope.form.judul = '',
            $scope.form.summary = '',
            $scope.form.isi = '',
            $scope.form.tglMulaiPublish = '',
            $scope.form.tglSelesaiPublish = '',
            $scope.form.file = ''
    }

    $scope.eventClickCloseModal = function () {
        $scope.clearForm();
        $('#myModal').modal('hide');

    }

    $scope.editorOptions = {
        language: 'en',
        // uiColor: '#ffffff'
    };

    $scope.showEditFile = function () {
        $scope.editFile = true;
    }
    //Start of Application ===============================================================
    $scope.formLoad();
})