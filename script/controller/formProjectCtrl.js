mainApp.controller("formProjectCtrl", function ($route, $scope, $routeParams, $q, $http, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, Helper, Upload, $timeout){
    //Variable
    $scope.currentUser = {};
    // $scope.myIP ={};
    $scope.Helper = Helper;
    $scope.project={};
    $scope.project.isCreator = false;
    

    $scope.formProject={};
    $scope.formProject.periodeAwal = {};
    $scope.formProject.info={};
    $scope.formProject.info.units=[];
    // $scope.formProject.milestone ={};
    // $scope.formProject.milestone.isPlan = false;
    $scope.data={};
    $scope.project.master = {};
    $scope.project.filter = {};
    $scope.project.master.bulan=[
                {
                    noBulan:1,
                    bulan:"Januari"
                },
                {
                    noBulan:2,
                    bulan:"Februari"
                },
                {
                    noBulan:3,
                    bulan:"Maret"
                },
                {
                    noBulan:4,
                    bulan:"April"
                },
                {
                    noBulan:5,
                    bulan:"Mei"
                },
                {
                    noBulan:6,
                    bulan:"Juni"
                },
                {
                    noBulan:7,
                    bulan:"Juli"
                },
                {
                    noBulan:8,
                    bulan:"Agustus"
                },
                {
                    noBulan:9,
                    bulan:"September"
                },
                {
                    noBulan:10,
                    bulan:"Oktober"
                },
                {
                    noBulan:11,
                    bulan:"November"
                },
                {
                    noBulan:12,
                    bulan:"Desember"
                }
    ]
    $scope.project.isEditMode = false;
    $scope.project.tabInfo = false;
    $scope.project.tabMilestone = false;
    $scope.project.tabDisbursement = false;
    
    //Function ======================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        }
        catch (err) {
            $scope.currentUser = {};
        }

        // $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withOption('responsive', true).withDisplayLength(10);

        $scope.renderProject();

        

    }
    // Render Data /Get Data =====================================================
    $scope.renderProject = function ()
    {
        NProgress.start();
        
            var apiUrl = "/api/ProjectList?username="+ $scope.currentUser.email;
            
            HttpRequest.get(apiUrl).success(function (response) {
                
            $scope.project.data = response;

            // console.log(JSON.stringify(response));

            var currentYear = new Date().getFullYear();
            $scope.project.master.year = [];
            for (var i = currentYear - 0; i <= currentYear + 10; i++) {
                $scope.project.master.year.push(i);
            };

            
            var periodeAwal = new Date().getFullYear();
            $scope.project.filter.periodeAwal = [];
            for (var i = periodeAwal - 10; i <= periodeAwal + 10; i++) {
                $scope.project.filter.periodeAwal.push(i);
            };

            var periodeAkhir = new Date().getFullYear();
            $scope.project.filter.periodeAkhir = [];
            for (var i = periodeAkhir - 10; i <= periodeAkhir + 10; i++) {
                $scope.project.filter.periodeAkhir.push(i);
            };

            var apiUrl = "/api/PowerPlantType";
            HttpRequest.get(apiUrl).success(function (response) {
                $scope.data.powerPlantType = response;

                // console.log(JSON.stringify($scope.data.powerPlantType));
            }).error(function (response, code) {
                
            });

            var apiUrl = "/api/ProjectCreator?username=" + $scope.currentUser.email;
            HttpRequest.get(apiUrl).success(function(response){
                $scope.project.isCreator = response.isCreator;

            });

            var apiUrlGroup = "/api/GetGroup";
            HttpRequest.get(apiUrlGroup).success(function (response) {
                $scope.project.master.groupAkses = response;
                // console.log(JSON.stringify($scope.project.master.groupAkses));
            });

           
            NProgress.done();

            }).error(function (response, code) {
                NProgress.done();
                alert(code + '</br>' + response);
            });

        
    }

    $scope.renderProjectManager = function (keyword) {
        var apiUrl = "/api/GetListPIC?name=" + keyword;
        return HttpRequest.get(apiUrl).then(function (response) {
            // console.log(JSON.stringify(response));
            return response.data;
        });
        
    }

    $scope.renderProjectManagerJVC = function (keyword) {
        var apiUrl = "/api/GetListPICJVC?name=" + keyword;
        return HttpRequest.get(apiUrl).then(function (response) {
            // console.log(JSON.stringify(response));
            return response.data;
        });
        
    }

    $scope.renderProcost = function (keyword) {
        var apiProcost = "/api/SearchProcost?name=" + keyword;
        return HttpRequest.get(apiProcost).then(function (response){
            // console.log(JSON.stringify(response));
            return response.data;
        })
    }

    


    // ==========================================================================

    // Event Handler =========================================================================
    $scope.reloadPage = function(){window.location.reload();}
    
    $scope.eventClickGetMilestoneIPP = function(){
        var apiUrl="/api/GetListMilestone?type=IPP";
        HttpRequest.get(apiUrl).success(function (response){
            $scope.project.master.currentMilestone = response;
            $scope.formProject.info.projectOwner = null;
            // $scope.eventClickJVC();
            // console.log(JSON.stringify($scope.data.currentMilestone));
        });

        
    }
    
    $scope.eventClickGetMilestoneNonIPP = function (){
        var apiUrl="/api/GetListMilestone?type=NON IPP";
        HttpRequest.get(apiUrl).success(function (response){
            $scope.project.master.currentMilestone = response;
            // $scope.formProject.info.projectOwner = "Indonesia Power";
            // $scope.eventClickNonJVC();
        });

    }

    $scope.eventClickAdd = function () {
        // $route.reload();
        NProgress.start();
        $scope.formProject = {};
        
        $scope.project.isEditMode = true;

        var apiUrl ="/api/CreateNewProject?username=" + $scope.currentUser.email;
        HttpRequest.get(apiUrl).success(function (response){
            $scope.formProject = response;
            var idProject = $scope.formProject.id;

            var apiUrlUnit ="/api/ProjectTabInfoUnit/" + idProject;
            HttpRequest.get(apiUrlUnit).success(function(response){
                $scope.formProject.data = response;
                console.log(JSON.stringify($scope.formProject.data));
            });

            $scope.project.isEditMode = true;
            // $scope.project.tabMilestone = true;
            // $scope.project.tabDisbursement = true;
            
            // console.log(JSON.stringify(response));
        });

        
       

        NProgress.done();
    }

    $scope.clickGetDataUnit = function (idProject) {
        var apiUrlUnit ="/api/ProjectTabInfoUnit/" + idProject;
        HttpRequest.get(apiUrlUnit).success(function(response){
            $scope.formProject.data = response;
            // console.log(JSON.stringify($scope.formProject.data));
        });
    }
    

    $scope.eventClickInfo = function (idProject) {
        $scope.projectName = false;
        $scope.projectDescription = false;
        $scope.periodeAwal = false;
        $scope.periodeAkhir = false;

        
        $scope.saveInfo = false;
        
        var apiUrl="/api/ProjectTabInfo/"+ idProject + "?username=" + $scope.currentUser.email;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.formProject = response;

            var idProject = $scope.formProject.id;
            
            var apiUrlUnit ="/api/ProjectTabInfoUnit/" + idProject;
            HttpRequest.get(apiUrlUnit).success(function(response){
                $scope.formProject.data = response;
                // console.log(JSON.stringify($scope.formProject.data));
            });
            console.log(JSON.stringify(response));
        }).error(function (response, code) {
            
        });
    }
    $scope.eventClickMilestone = function (idProject) {
        $scope.projectName = true;
        $scope.projectDescription = true;
        $scope.periodeAwal = true;
        $scope.periodeAkhir = true;
        $scope.saveInfo = true;
        $scope.formProject.isProjectHeade = false;
                            
        var apiUrl="/api/ProjectTabMilestone/"+ idProject + "?username=" + $scope.currentUser.email;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.formProject.data = response;
            // $scope.formProject.milestone.isPlan = response.isPlan;
            // console.log(JSON.stringify(response));
        }).error(function (response, code) {
            
        });
        
    }

    $scope.eventClickDisbursements = function (idProject) {
        // Get List Project Costing Disbursement

        var apiUrl="/api/GetProcost/"+ idProject;
        HttpRequest.get(apiUrl).success(function (response) {
            
            $scope.formProject.data = response;
            console.log(JSON.stringify(response));
        });




        // Ini Masih ngambil ke list disbursement
        // var apiUrl="/api/ProjectTabDisbursement/" + idProject + "?username=" + $scope.currentUser.email;
        // HttpRequest.get(apiUrl).success(function(response){
        //     $scope.formProject.data = response;

        //     // console.log(JSON.stringify(response));
            
        //     var apiUrl="/api/GetTahunDisbursement/" + idProject;
        //     HttpRequest.get(apiUrl).success(function(response){
        //         $scope.project.filter.year = response ;
        //         // console.log(JSON.stringify($scope.project.filter.year));
        //     })

        //     //console.log(JSON.stringify(response));

        // }).error(function (response, code){

        // });
    }

    $scope.eventClickFilterTahunDisbursement = function (idProject, tahun) {
        var apiUrl="/api/ProjectTabDisbursement/" + idProject + "?tahun=" + tahun + "&username=" + $scope.currentUser.email ;
        // console.log(apiUrl);
        HttpRequest.get(apiUrl).success(function(response){
            $scope.formProject.data = response;

            console.log(JSON.stringify(response));

        }).error(function (response, code){

        });
    }

    $scope.eventClickSaveInfoUnits = function () {
        var apiUrl = "/api/ProjectTabInfo";
        // var apiUrl ="";
        $scope.formProject.username = $scope.currentUser.email;
        var data = $scope.formProject;

        console.log(JSON.stringify(data));

        HttpRequest.post(apiUrl, data).success(function (response) {
            // render By Id Project
            alert("Data Info Has Been Saved");
            $scope.project.tabMilestone = true;
            $scope.saveInfo = true;
           
            console.log(JSON.stringify(data));
          
        })
 
        .error(function (response, code) {
            var data = {
                title: "Project Info",
                exception: response,
                exceptionCode: code,
                operation: "POST",
                apiUrl: apiUrl
            };
            console.log(JSON.stringify(data));
            Helper.notifErrorHttp(data);

            $scope.project.tabMilestone = true;
        });
     
    }

    

    $scope.eventClickSaveMilestone = function () {
        var apiUrl = "/api/ProjectTabMilestone" + "?username=" + $scope.currentUser.email;
        // var apiUrl ="";
        // $scope.formProject.milestone.idProject = "eeff1038-ef9a-45d2-9f0d-958af2c38ad5"
        $scope.formProject.milestone.username = $scope.currentUser.email;
        var data = $scope.formProject.milestone;

        console.log(JSON.stringify(data));

        HttpRequest.post(apiUrl, data).success(function (response) {

            $scope.idProject = data.idProject;
            console.log(JSON.stringify($scope.idProject));

            var apiUrl="/api/ProjectTabMilestone/"+ $scope.idProject + "?username=" + $scope.currentUser.email;
            HttpRequest.get(apiUrl).success(function (response) {

                alert("Data Milestone Has Been Saved");
                $scope.formProject.data = response;
                console.log(JSON.stringify(response));
            })


            $scope.project.tabDisbursement = true;
           
            // console.log(JSON.stringify(data));
            $('#modalMilestone').modal('hide');
        })

        
        .error(function (response, code) {
            var data = {
                title: "Project Milestone",
                exception: response,
                exceptionCode: code,
                operation: "POST",
                apiUrl: apiUrl
            };
            console.log(JSON.stringify(data));
            Helper.notifErrorHttp(data);
        });
     
    }

     // modalMilestone
     $scope.eventClickEditModalMilestone = function (idProject, id,phase,milestone, planStart, planFinish, actualStart, actualFinish, statusMilestone, isPlan, isActual){
        
        var apiUrl ="/api/GetDetailMilestone/" + id +"?username=" +$scope.currentUser.email;
        HttpRequest.get(apiUrl).success(function (response){
            $scope.formProject.milestone = response;
            console.log(JSON.stringify($scope.formProject.milestone));
        });

        
        $('#modalMilestone').modal({show:true});
      
    }

    $scope.eventClickJVC = function (){
        // alert("test");
        // $scope.picPmp = 
        $scope.picUnitProyek = true;
        $scope.developmentScheme = true;
        // console.log($scope.developmentScheme);
        $scope.picJvc = false;
        $scope.formProject.info.projectManagerConstruction =null;
        // $scope.picJvc = 
    }

    $scope.eventClickNonJVC = function (){
        
        $scope.picJvc = true;
        $scope.picUnitProyek = false;
        $scope.developmentScheme = false;
        $scope.formProject.info.siteManager=null;
    }

    
    $scope.eventClickCloseModalMilestone = function (){
        $('#modalMilestone').modal('hide');
    }

    $scope.eventClickEditModalDisbursement = function (idProject, idProcost, procostNo, description, nilai) {
        
     
        apiUrl = "/api/ProjectCosting/" + idProcost;
        HttpRequest.get(apiUrl).success(function (response){
            $scope.formProject.projectCosting = response;
            // console.log(JSON.stringify($scope.formProject));
        })

        // console.log($scope.formProject, procostNo);

        // $scope.formProject.disbursement.year = tahun;
        // console.log(JSON.stringify($scope.formProject.disbursement.year));
        $('#modalDisbursement').modal({show:true});
    }

    $scope.eventClickSaveProjectCosting = function () {
        var apiUrl = "/api/ProjectCosting";
        // var apiUrl ="";
        $scope.formProject.projectCosting.username = $scope.currentUser.email;
        var data = $scope.formProject.projectCosting;
        
        console.log(JSON.stringify(data));

        HttpRequest.post(apiUrl, data).success(function (response) {

            $scope.idProject = data.idProject;
            console.log(JSON.stringify($scope.idProject));

            var apiUrl="/api/GetProcost/"+ $scope.idProject;
            HttpRequest.get(apiUrl).success(function (response) {
                alert("Data Project Costing Has Been Saved");
                $scope.formProject.data = response;
                console.log(JSON.stringify($scope.formProject.data));
            });

            
            console.log(JSON.stringify(data));
            $('#modalDisbursement').modal('hide');
        })

        
        .error(function (response, code) {
            var data = {
                title: "Project Disbursement",
                exception: response,
                exceptionCode: code,
                operation: "POST",
                apiUrl: apiUrl
            };
            console.log(JSON.stringify(data));
            Helper.notifErrorHttp(data);
        });
     
    }

    $scope.eventClickEdit = function (id) {
        NProgress.start();

        var apiUrl = "/api/ProjectTabInfo/" + id + "?username=" + $scope.currentUser.email;
        console.log(apiUrl);
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.formProject = response;
            
            // console.log(JSON.stringify($scope.formProject));
            if ($scope.formProject.info.projectType == "IPP"){
                $scope.picUnitProyek = true;
                $scope.developmentScheme = true;
                $scope.picJvc = false;

                // console.log("IPP/JVC");
            }else{
                $scope.picJvc = true;
                $scope.picUnitProyek = false;
                $scope.developmentScheme = false;
                // console.log("Non IPP/Non JVC");
            }

            

            
            // console.log(JSON.stringify($scope.formProject));
            var projectType = $scope.formProject.info != null ? $scope.formProject.info.projectType : "IPP";
            var apiUrl = "/api/GetListMilestone?type=" + projectType;
            HttpRequest.get(apiUrl).success(function (response) {
                $scope.project.master.currentMilestone = response;
                
            });

            
            

            $scope.project.isEditMode = true;
            $scope.project.tabMilestone = true;
            $scope.project.tabDisbursement = true;
            $scope.project.tabUploadFile = true;
            

            var apiUrlUnit ="/api/ProjectTabInfoUnit/" + $scope.formProject.id;
            HttpRequest.get(apiUrlUnit).success(function(response){
                $scope.formProject.data = response;
                
                // console.log(JSON.stringify($scope.formProject.data));
            })

            // Mode Confirm Switch Project Type
            $scope.eventClickSaveSwitch = function(){
                var typeProject = $scope.formProject.info.projectType;
                var answer = confirm("Yakin Ingin Memindah Project Type, Pemindahan Project Type Mengakibatkan Data Milestone Yang di Type Project Sebelumnya akan terhapus?")
                if (answer) {
                    console.log("1");

                    var alert2 = confirm("Apakah Anda Sudah Yakin???");
                    if (alert2){
                        // save project Type
                        var apiUrl = "/api/ProjectTabInfo";
                        $scope.formProject.username = $scope.currentUser.email;
                        var data = $scope.formProject;
                
                        HttpRequest.post(apiUrl, data).success(function (response) {
                            
                            if(typeProject == "IPP"){
                                $scope.picUnitProyek = true;
                                $scope.developmentScheme = true;
                                $scope.picJvc = false;
                                $scope.formProject.info.projectOwner =null;
                                $scope.formProject.info.projectManagerConstruction =null;
                                $scope.formProject.info.developmentScheme = null ;
                                // console.log("IPP");
                            }else{
                                $scope.formProject.info.projectOwner = "Indonesia Power";
                                $scope.formProject.info.siteManager= null;
                                $scope.picJvc = true;
                                $scope.picUnitProyek = false;
                                $scope.developmentScheme =false;
                            }
                        
                        })
                    }
                    else
                    {
                         // Save
                        var apiUrl = "/api/ProjectTabInfo";
                        $scope.formProject.username = $scope.currentUser.email;
                        var data = $scope.formProject;
                
                        HttpRequest.post(apiUrl, data).success(function (response) {
                            if(typeProject == "NON IPP"){
                                $scope.formProject.info.projectType ="IPP";
                                $scope.picUnitProyek = true;
                                $scope.developmentScheme = true;
                                $scope.picJvc = false;
                                $scope.formProject.info.projectOwner =null;
                                // console.log("IPP");
                            }else{
                                $scope.formProject.info.projectType ="NON IPP";
                                $scope.formProject.info.projectOwner = "Indonesia Power";
                                $scope.picJvc = true;
                                $scope.picUnitProyek = false;
                                $scope.developmentScheme = false;
                                
                                // console.log("NON IPP", $scope.formProject.info.projectOwner);
                            }
                        })
                    }

                }
                else {
                    // console.log("2");
                    
                    // Save
                    var apiUrl = "/api/ProjectTabInfo";
                    $scope.formProject.username = $scope.currentUser.email;
                    var data = $scope.formProject;
            
                    HttpRequest.post(apiUrl, data).success(function (response) {
                        if(typeProject == "NON IPP"){
                            $scope.formProject.info.projectType ="IPP";
                            $scope.picUnitProyek = true;
                            $scope.developmentScheme = true;
                            $scope.picJvc = false;
                            $scope.formProject.info.projectOwner =null;
                            // console.log("IPP");
                        }else{
                            $scope.formProject.info.projectType ="NON IPP";
                            $scope.formProject.info.projectOwner = "Indonesia Power";
                            $scope.picJvc = true;
                            $scope.picUnitProyek = false;
                            $scope.developmentScheme = false;
                            
                            // console.log("NON IPP", $scope.formProject.info.projectOwner);
                        }
                    })
                }
            }
            // console.log(JSON.stringify($scope.formProject.info.isTabLocation));
            NProgress.done();

        })
        .error(function (response, code) {
            NProgress.done();
            console.log(JSON.stringify(response));
            var data = {
                title: "Project",
                exception: response,
                exceptionCode: code,
                operation: "GET",
                apiUrl: apiUrl
            };

            Helper.notifErrorHttp(data);
        });


        
    }


    $scope.eventClickCancel = function () {
        NProgress.start();
        $route.reload();
        $scope.renderProject();
        $scope.project.tabMilestone = false;
        $scope.project.tabDisbursement = false;
        $scope.project.isEditMode = false;

        NProgress.done();
    }

    $scope.eventClickHapus = function (id, name) {

        var apiUrl = "/api/Project/" + id;
        var hapus = confirm("Hapus " + name + "?");

        if (hapus) {
            NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                $scope.renderProject();
                $scope.project.tabMilestone = false;
                $scope.project.tabDisbursement = false;
                $scope.project.isEditMode = false;
                NProgress.done();
            })
            .error(function (response, code) {
                NProgress.done();

                var data = {
                    title: "Project",
                    exception: response,
                    exceptionCode: code,
                    operation: "DELETE",
                    apiUrl: apiUrl
                };

                Helper.notifErrorHttp(data);
            });
        }
    }

    $scope.eventClickModalInfoUnits = function (idProject, powerPlantType){
        // lempar parameter powerplantype tapi sementara tidak di pakai
        var apiUrl="/api/PowerPlantType/" + powerPlantType;
        // console.log (apiUrl); 
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.formProject.info.units.powerPlantType = response.powerPlantType;
            // console.log($scope.formProject.info.units.powerPlantType);
        });


        // save project dulu
        var apiUrl = "/api/ProjectTabInfo";
        // var apiUrl ="";
        var data = $scope.formProject;

        // console.log(JSON.stringify(data));

        HttpRequest.post(apiUrl, data).success(function (response) {
            // render By Id Project
            // alert("Data Info Berhasil Disimpan");
            // $scope.project.tabMilestone = true;
            // $scope.saveInfo = true;
        //    alert("Data kesimpen");
            console.log(JSON.stringify(data));
          
        })

        $scope.formProject.info.units = {
            idProject : idProject,
            id : null,
            name : null,
            powerPlantType : null,
            capacity : null,
            codPlan : null,
            codActual : null,
            statusUnit : null
        }
        // console.log(powerPlantType); 
        //panggil pop up
        $('#modalInfoUnits').modal({show:true});
    }

    $scope.eventClickAddInfoUnits = function () {
        
        var apiUrl ="/api/ProjectTabInfoUnit";
        var data = $scope.formProject.info.units;
        
        // console.log(JSON.stringify(data));

        HttpRequest.post(apiUrl, data).success(function (response) {
            $scope.idProject = data.idProject;

            console.log($scope.idProject, "idProject");

            var apiUrlInfo = "/api/ProjectTabInfo/" + $scope.idProject + "?username=" + $scope.currentUser.email;
            HttpRequest.get(apiUrlInfo).success(function (response) {
            //     alert("Data Info Unit Berhasil Disimpan");
                $scope.formProject = response;   
         
                console.log(JSON.stringify($scope.formProject, "info"));

                var apiUrlUnit ="/api/ProjectTabInfoUnit/" + $scope.formProject.id;
                HttpRequest.get(apiUrlUnit).success(function(response){
                    $scope.formProject.data = response;
        
                    console.log(JSON.stringify($scope.formProject.data,"unit"));
                })
            });
        });


        $('#modalInfoUnits').modal('hide');
    }

    $scope.eventClickEditModalInfoUnits = function (idProject, id, name, powerPlantType, capacity, codPlan, codActual, statusUnit){

        // var apiUrl = "/api/PowerPlantType/"+ powerPlantType;
        // HttpRequest.get(apiUrl).success(function (response) {
        //     $scope.formProject.info.units.powerPlantType = response.powerPlantType;

        //     console.log(JSON.stringify($scope.formProject.info.units.powerPlantType));
        // })

        $scope.formProject.info.units = {
            idProject : idProject,
            id : id,
            name : name,
            powerPlantType : powerPlantType,
            capacity : capacity,
            codPlan : codPlan,
            codActual : codActual,
            statusUnit : statusUnit
        }
        // console.log(JSON.stringify(powerPlantType));
        $('#modalInfoUnits').modal({show:true});
    }

   

    $scope.eventClickHapusInfoUnits = function(idProject, id, name)
    {
        var apiUrl = "/api/ProjectTabInfoUnit/" + id;
        var hapus = confirm("Hapus " + name + "?");

        if (hapus) {
            // NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                
                var apiUrlInfo = "/api/ProjectTabInfo/" + idProject + "?username=" + $scope.currentUser.email;
                HttpRequest.get(apiUrlInfo).success(function (response) {
                //     alert("Data Info Unit Berhasil Disimpan");
                    $scope.formProject = response;   
                
                    console.log(JSON.stringify($scope.formProject, "info"));
    
                    var apiUrlUnit ="/api/ProjectTabInfoUnit/" + $scope.formProject.id;
                    HttpRequest.get(apiUrlUnit).success(function(response){
                        $scope.formProject.data = response;
            
                        console.log(JSON.stringify($scope.formProject.data,"unit"));
                    })
                });

            })
            .error(function (response, code) {
                NProgress.done();

                var data = {
                    title: "Hapus Unit",
                    exception: response,
                    exceptionCode: code,
                    operation: "DELETE",
                    apiUrl: apiUrl
                };

                Helper.notifErrorHttp(data);
            });
        }
    }

    $scope.eventClickHapusModalDisbursement = function (idProject, idProcost, procostNo) {

        var apiUrl = "/api/ProjectCosting/" + idProcost;
        // var apiUrl ="";
        var hapus = confirm("Are Your Sure To Delete This No Procost " + procostNo + "?");

        if (hapus) {
            // NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                // $scope.idProject = data.idProject;
                // console.log(JSON.stringify($scope.idProject));

                var apiUrl="/api/GetProcost/"+ idProject;
                HttpRequest.get(apiUrl).success(function (response) {
                    alert("Data Project Costing Has Been Save");
                    $scope.formProject.data = response;
                    console.log(JSON.stringify($scope.formProject.data));
                });
            })
            .error(function (response, code) {
                // NProgress.done();

                var data = {
                    title: "Project",
                    exception: response,
                    exceptionCode: code,
                    operation: "DELETE",
                    apiUrl: apiUrl
                };

                Helper.notifErrorHttp(data);
            });
        }
    }

    $scope.eventClickCloseModalInfoUnits = function (){
        $('#modalInfoUnits').modal('hide');
    }


    $scope.eventClickModalDisbursement = function (idProject){
        
        console.log(idProject);
        $scope.formProject.projectCosting = {
            idProject : idProject, 
            projectCosting :{
                id :"",
                procostNo : "",
                description : "",
                nilai : ""
            },  
            username : ""
        };

        $('#modalDisbursement').modal({show:true});
    }

    $scope.eventClickCloseModalDisbursement = function (){
        $('#modalDisbursement').modal('hide');
    }


    $scope.eventClickGetHistoryMilestone = function (idProject, idMilestone){
        $('#modalHistoryMilestone').modal({show:true});

        var apiUrl="/api/GetMilestoneHistory/"+ idMilestone;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.formProject.data.milestoneHistory = response;
            // $scope.formProject.milestone.isPlan = response.isPlan;
            // console.log(JSON.stringify(response));
        }).error(function (response, code) {
            
        });

    }

    $scope.eventClickCloseHistoryMilestone = function (){
        $('#modalHistoryMilestone').modal('hide');
    }

    $scope.eventClickGetFileUploadMilestone = function (idProject, idMilestone){
        $('#modalFileUploadMilestone').modal({show:true});

        // var apiUrl="/api/ProjectTabMilestone/"+ idProject + "?username=" + $scope.currentUser.email;
        // HttpRequest.get(apiUrl).success(function (response) {
        //     $scope.formProject.data = response;
        //     // $scope.formProject.milestone.isPlan = response.isPlan;
        //     console.log(JSON.stringify(response));
        // }).error(function (response, code) {
            
        // });

    }

    $scope.eventClickCloseFileUploadMilestone = function (){
        $('#modalFileUploadMilestone').modal('hide');
    }

    $scope.getNilaiProjectProgress = function (){
        var projectProgress = $scope.formProject.milestone.bobot * $scope.formProject.milestone.prosentaseProgress / 100 ;
        $scope.formProject.milestone.projectProgress = projectProgress;
        // console.log($scope.formProject.milestone.projectProgress);
    }
   
    // =====================================================

    // Upload File
    $scope.eventClickModalUploadFileBulanan = function (idProject){

        // console.log(idProject);
        $scope.id = idProject;
        // $scope.formProject = {
        //     // id: idProject,
        //     uploadFile : {
        //         id: "",
        //         year :"",
        //         month : "",
        //         title : "",
        //         description : "",
        //         file : {
        //             fileName: "",
        //             fileType: "",
        //             fileSize: "",
        //             base64: ""
        //         },
        //     },
        //     username : $scope.currentUser.email

            
        // }
        var apiUrl="/api/GetTahunDisbursement/" + idProject;
        HttpRequest.get(apiUrl).success(function(response){
            $scope.project.filter.year = response ;
            console.log(JSON.stringify($scope.project.filter.year));
        })

        $('#modalFileUploadBulanan').modal({show:true});

    }

    $scope.eventClickCloseModalUploadFileBulanan = function (){
        $scope.clearFormUploadFile();
        $('#modalFileUploadBulanan').modal('hide');
    }

    $scope.eventClickUploadFile = function (idProject, projectName, description, periodeAwal, periodeAkhir){
       
        $scope.formProject.data.test = [];
        $scope.formProject = {
            id: idProject,
            projectName : projectName,
            description : description, 
            periodeAwal : periodeAwal,
            periodeAkhir : periodeAkhir,
            uploadFile : {
                id:"",
                year :"",
                month : "",
                title : "",
                description : "",
                file : {
                    fileName: "",
                    fileType: "",
                    fileSize: "",
                    base64: ""
                },
            },
            username : $scope.currentUser.email

            
        }

        var apiUrl = "/api/ListAttachment/" + idProject;
        // console.log(apiUrl);
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.formProject.fileUpload = response;


            // Get Status Upload
            var apiStatusUpload ="/api/GetStatusUpload/" + idProject;
            HttpRequest.get(apiStatusUpload).success(function (response){
                $scope.statusUpload = response;

                // console.log(JSON.stringify($scope.statusUpload));
            });
         
            // console.log(JSON.stringify($scope.formProject.fileUpload));
        }).error(function (response, code) {
            
        });
    }

    $scope.clearFormUploadFile = function (){
        $scope.year = null;
        $scope.month = null;
        $scope.title = null;
        $scope.description = null;
        $scope.picFile = null;    
    }

    
    $scope.eventClickListFile = function (id){
        var apiUrl = "/api/ListAttachment/" + id;

        HttpRequest.get(apiUrl).success(function(response){
            $scope.formProject.data = response;
        })
    }

    $scope.eventClickDeleteFileUpload = function (id, idProject){
        var apiUrl ="/api/DeleteAttachment/" + id;
        var hapus = confirm("Hapus " + name + "?");

        // console.log(id,"-",idProject);
        
        if (hapus) {
            // NProgress.start();

            HttpRequest.get(apiUrl).success(function (response) {
                
                // Get List Upload File
                var apiUrl = "/api/ListAttachment/" + idProject;
                console.log(apiUrl);
                HttpRequest.get(apiUrl).success(function (response) {
                    $scope.formProject.fileUpload = response;
                    

                    // Get Status Upload
                    var apiStatusUpload ="/api/GetStatusUpload/" + $scope.id;
                    HttpRequest.get(apiStatusUpload).success(function (response){
                        $scope.statusUpload = response;

                        // console.log($scope.statusUpload);
                    })
                    // console.log(JSON.stringify($scope.formProject.fileUpload));
                })


               

            })
            .error(function (response, code) {
                NProgress.done();

                var data = {
                    title: "Hapus File Upload",
                    exception: response,
                    exceptionCode: code,
                    operation: "DELETE",
                    apiUrl: apiUrl
                };

                Helper.notifErrorHttp(data);
            });
        }
    }

    // download Upload File
    $scope.eventClickGetFileUpload = function (id){
        var apiUrl ="/api/DownloadAttachment/" + id;
        
        document.location.href = webServiceBaseUrl + apiUrl;
    }


    // Upload File
    $scope.uploadPic = function(file) {
        file.upload = Upload.upload({
            url: 'http://192.168.100.239:10070/api/Upload',
            // url:'/api/Upload',
            data: {   id: $scope.id,
                    username: $scope.currentUser.email, 
                    year : $scope.year,
                    month : $scope.month,
                    title : $scope.title,
                    description : $scope.description, 
                    file: file},
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });

            // Get List Upload File
            var apiUrl = "/api/ListAttachment/" + $scope.id;
            HttpRequest.get(apiUrl).success(function (response) {
                $scope.formProject.fileUpload = response;

                // Get Status Upload
                var apiStatusUpload ="/api/GetStatusUpload/" + $scope.id;
                HttpRequest.get(apiStatusUpload).success(function (response){
                    $scope.statusUpload = response;

                    // console.log($scope.statusUpload);
                })
                // console.log(JSON.stringify($scope.formProject.fileUpload));
            })

           
           // Close Pop Up
           $scope.eventClickCloseModalUploadFileBulanan();
           console.log(response.data);
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
            console.log(response.data);
           
        }, function (evt) {
          // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          
        });

        
    }

    $scope.getProjectHistory = function (idProject) {
        $('#modalProjectHistory').modal({show:true});

        var apiUrl="/api/GetProjectHistory/"+ idProject;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.projectHistory = response;
            // $scope.formProject.milestone.isPlan = response.isPlan;
            console.log(JSON.stringify(response));
        }).error(function (response, code) {
            
        });
    }

    $scope.eventClickCloseProjectHistory = function (){
        $('#modalProjectHistory').modal('hide');
    }
    
    $scope.getAtributeProcost = function (procost){
        
        $scope.formProject.projectCosting.description = procost.description;
        $scope.formProject.projectCosting.nilai = procost.nilai;

    }
    //Start of Application =============================================================================================================
    $scope.formLoad();

})


