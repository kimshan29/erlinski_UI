mainApp.controller("form3Ctrl", function ($http, $scope, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper) {
    
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

    $scope.formLoad = function (){

        $scope.renderList();
        $scope.sortType     = 'namaPengemudi'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchFish   = '';     // set the default search/filter term
    }



    $scope.renderList = function (){
        // var api="http://192.168.100.239:2010/api/Pengemudi";

        // $http.get(api).then(function(response){
        //     $scope.listPengemudi = response.data;
        //     console.log(JSON.stringify($scope.listPengemudi));
        // }).
        // catch(function onError(response) {
        //     console.log(response);
        // });
        // NProgress.start();
        var apiUrl = "/api/UserInRole";
        HttpRequest.get(apiUrl).success(function (response) {
            // console.log(response);
            // var apiUrl2 = "/api/ListUnitPetaRisiko";
            // HttpRequest.get(apiUrl2).success(function (response) {
            //     $scope.user.master.unit = response;
            // });

            var apiUrl3 = "/api/MasterRole";
            HttpRequest.get(apiUrl3).success(function (response) {
                $scope.user.master.peran = response;
                console.log(JSON.stringify($scope.user.master.peran));

            });

            var apiUrlGroup = "/api/GetGroup";
            HttpRequest.get(apiUrlGroup).success(function (response) {
                $scope.user.master.groupAkses = response;
                console.log(JSON.stringify($scope.user.master.groupAkses));
            });

            
            $scope.user.data = response;
            $scope.user.exist = response;
            // NProgress.done();
        });
    }

    $scope.addForm = function (){
        // alert("test");
        $('#myModal').modal({show:true});
    }

    $scope.deleteForm = function(id) {
        var api="http://192.168.100.239:2010/api/Pengemudi";
        var hapus = confirm("Hapus?" );
        if (hapus) {
            $http.del(api).success(function (response) {
                $scope.renderList();

            }
            );
        }
    }

    $scope.editForm = function (id){
        var api="http://192.168.100.239:2010/api/Pengemudi/" + id;

        $http.get(api).then(function(response){

            $scope.form = response.data;
            console.log(JSON.stringify(response.data));
        });
        $('#myModal').modal({show:true});
    }

    $scope.closeForm = function (){
        $('#myModal').modal('hide');
    }

    $scope.saveForm = function(){
        
        var data = $scope.form;

        var config = 'contenttype';
        var api="http://192.168.100.239:2010/api/Pengemudi";
        $http.post(api, data, config).then(function(response){

            $scope.renderList();
            console.log(JSON.stringify(response));  
        
        });
        

        $scope.closeForm();

    }

    $scope.myFunction = function(){
        alert("Hello");
    }   

    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
        var exportHref=Excel.tableToExcel(tableId,'HistoryProjectMilestone');
        $timeout(function(){location.href=exportHref;},100); // trigger download
    }



    $scope.formLoad();

    $scope.names = ["Available", "Not Available"];
})