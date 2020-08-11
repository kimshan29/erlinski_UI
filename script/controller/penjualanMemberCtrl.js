mainApp.controller("penjualanMemberCtrl", function ($route, $scope, $uibModal, $routeParams, $q, $cookies, Constant, HttpRequest, Model, Helper, DTOptionsBuilder, DTColumnBuilder, markers, Upload, $timeout) {
    //Variable


    $scope.currentUser = {};
    $scope.form = {};

    $scope.pageSize = 10;
    $scope.currentPage = 1;

    $scope.master = {};
    $scope.master.jenisTransaksi = [{
            "id": 1,
            "nama": "Satuan"
        },
        {
            "id": 2,
            "nama": "Paket"
        }
    ]

    $scope.formTransaksi = false;
    $scope.viewTransaksi = false;
    //Form Load ======================================================================
    $scope.formLoad = function () {
        try {
            $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        } catch (err) {
            $scope.currentUser = {};
        }
        // alert("testing");
        // $('#komitmenkepatuhan').attr('disabled', 'disabled').off('click');

        $scope.renderListData();
        // $scope.dataBarang();
        $scope.getDataMember();
        $scope.getBank();
        $scope.getJasaPengiriman();

        $scope.dateNow = new Date();
        $scope.form.tanggal = $scope.dateNow;
        // console.log($scope.currentUser);



    }

    $scope.renderListData = function () {
        $('.Loading').show();
        $('.page-form').hide();

        var apiUrl = "/transaksi/" + $scope.currentUser.email + "/getTransaksiByUsername";
        // var apiUrl = "/transaksi"
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.listData = response.data;
            // console.log(JSON.stringify($scope.listData));

            $('.Loading').hide();
            $('.page-form').show();

        });

    }

    $scope.getTotal = () => {



        var total = 0;
        angular.forEach($scope.master.detailBarang, function (product) {
            var apiUrl = "/transaksi/" + $scope.currentUser.email + "/" + product.id + "/getStokBarang";
            console.log(apiUrl);

            HttpRequest.get(apiUrl).success(function name(response) {
                $scope.stokBarang = response.data;
                // console.log(response.data);
                if (product.jumlah > $scope.stokBarang.stok) {
                    swal("", "Jumlah Tidak Boleh Lebih Dari Stok", "info");
                    product.jumlah = 0;
                    $scope.total = 0;
                    $scope.form.totalTagihan = 0;
                }


            })


            total += product.harga * product.jumlah;


        });


        var diskon = $scope.form.diskon;
        var ongkir = $scope.form.ongkosKirim;


        if (diskon == undefined && ongkir == undefined) {
            $scope.diskon_ = 0;
            $scope.ongkir_ = 0;
            console.log($scope.diskon_);
        } else {
            $scope.diskon_ = $scope.form.diskon;
            $scope.ongkir_ = $scope.form.ongkosKirim;
            console.log($scope.diskon_);
        }


        $scope.total = total;
        $scope.form.totalTagihan = $scope.total + $scope.ongkir_ - $scope.diskon_;
        console.log("Total Tagihan:" + $scope.form.totalTagihan);


    }

    $scope.totalByOngkir = (ongkir) => {
        // console.log(ongkir);
        // console.log($scope.total);
        var diskon = $scope.form.diskon;

        if (diskon == undefined) {
            $scope.diskon_ = 0;
            console.log($scope.diskon_);
        } else {
            $scope.diskon_ = $scope.form.diskon;
            console.log($scope.diskon_);
        }

        $scope.form.totalTagihan = $scope.total + ongkir - $scope.diskon_;
        console.log($scope.form.totalTagihan);

    }

    $scope.totalByDiskon = (diskon) => {
        // console.log(ongkir);
        // console.log($scope.total);
        var ongkir = $scope.form.ongkosKirim;

        if (ongkir == undefined) {
            $scope.ongkir_ = 0;
            console.log($scope.ongkir_);
        } else {
            $scope.ongkir_ = $scope.form.ongkosKirim;
            console.log($scope.ongkir_);
        }

        $scope.form.totalTagihan = $scope.total + $scope.ongkir_ - diskon;
        // console.log($scope.form.totalTagihan);

    }

    $scope.getDataMember = () => {
        var apiUrl = "/member/" + $scope.currentUser.email + "/getListMember";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.member = response.data;
            // console.log(JSON.stringify($scope.master.member));

        });

    }

    $scope.getBarangMember = (dataMember) => {
        // console.log(JSON.stringify(dataMember));
        $scope.master.detailBarang = [];
        $scope.form.namaMember = dataMember.namaLengkap;
        var apiUrl = "/barang/" + $scope.currentUser.email + "/" + dataMember.roleMember + "/getBarangByUsername";
        console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.barang = response.data;
            // console.log(JSON.stringify($scope.master.barang));

        });

    }

    $scope.getBank = () => {
        var apiUrl = "/address/getBank";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.bank = response.data;
            // console.log(JSON.stringify(response.data));

        })

    }

    $scope.getJasaPengiriman = () => {
        var apiUrl = "/address/getJasaKirim";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.jasaPengiriman = response.data;
            // console.log(JSON.stringify(response.data));

        })
    }
    $scope.dataBarang = () => {
        var apiUrl = "/barang";
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.master.barang = response;
            // console.log(JSON.stringify($scope.master.barang));

        });
    }

    $scope.master.detailBarang = [];
    $scope.getDetailBarang = (barang) => {
        console.log(barang);

        $scope.master.detailBarang.push(barang);
        $scope.form.barcode = "";

    }

    $scope.hapusDetailBarang = (index) => {
        $scope.master.detailBarang.splice(index, 1);
    }


    $scope.aksesPilihanPaket = false;
    $scope.getPaket = (value) => {
        console.log(value);
        if (value.nama == "Paket") {
            $scope.aksesPilihanPaket = true;
        } else {
            $scope.aksesPilihanPaket = false;
            $scope.form.pilihanPaket = "";
        }

    }

    $scope.eventClickViewDetail = (id) => {
        var apiUrl = "/transaksi/" + id;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.viewForm = {
                noInvoice: response.data.noInvoice,
                tanggal: response.data.tanggal.toDate(),
                detailTransaksi: response.data.detailTransaksi,
                idPembeli: response.data.idPembeli,
                namaMember: response.data.namaMember,
                barcode: response.data.barcode,
                ongkosKirim: response.data.ongkosKirim,
                jasaKirim: response.data.jasaKirim,
                diskon: response.data.diskon,
                totalTagihan: response.data.totalTagihan,
                keteranganDiskon: response.data.keteranganDiskon,
                jenis: response.data.jenis,
                tanggalBayar: response.data.tanggalBayar.toDate(),
                bank: response.data.bank,
                createdBy: response.data.createdBy,
                idPenjual: response.data.idPenjual,
                namaBank: response.data.namaBank
            }
            // console.log(JSON.stringify($scope.viewForm));

        });
    }

    $scope.eventClickSave = function () {
        $scope.formTransaksi = false;
        $scope.viewTransaksi = true;

        $scope.btnSave = false;
        $scope.btnUpdate = true;
        $scope.btnCancel = true;
        // $scope.dataForm = {
        //     tanggal: $scope.form.tanggal,
        //     detailTransaksi: $scope.master.detailBarang,
        //     idPembeli: $scope.form.idPembeli,
        //     namaMember: $scope.form.namaMember,
        //     barcode: $scope.form.barcode,
        //     ongkosKirim: $scope.form.ongkosKirim,
        //     jasaKirim: $scope.form.jasaKirim,
        //     diskon: $scope.form.diskon,
        //     totalTagihan: $scope.form.totalTagihan,
        //     keteranganDiskon: $scope.form.keteranganDiskon,
        //     jenis: $scope.form.jenis,
        //     tanggalBayar: $scope.form.tanggalBayar,
        //     bank: $scope.form.bank,
        //     createdBy: $scope.currentUser.email,
        //     idPenjual: $scope.currentUser.email
        // }

        // $('.Loading').show();
        // $('.page-form').hide();
        // var apiUrl = "/transaksi/create";

        // // console.log(JSON.stringify($scope.dataForm));
        // HttpRequest.post(apiUrl, $scope.dataForm).success(function (response) {
        //     console.log(response);

        //     $scope.eventClickCloseModal();
        //     swal('', 'Data Berhasil Disimpan', 'success')
        //     $('.Loading').hide();
        //     $('.page-form').show();
        // });
    }

    $scope.eventClickSubmit = function () {

        $scope.dataForm = {
            tanggal: $scope.form.tanggal,
            detailTransaksi: $scope.master.detailBarang,
            idPembeli: $scope.form.idPembeli,
            namaMember: $scope.form.namaMember,
            barcode: $scope.form.barcode,
            ongkosKirim: $scope.form.ongkosKirim,
            jasaKirim: $scope.form.jasaKirim,
            diskon: $scope.form.diskon,
            totalTagihan: $scope.form.totalTagihan,
            keteranganDiskon: $scope.form.keteranganDiskon,
            jenis: $scope.form.jenis,
            tanggalBayar: $scope.form.tanggalBayar,
            bank: $scope.form.bank,
            createdBy: $scope.currentUser.email,
            idPenjual: $scope.currentUser.email
        }

        console.log(JSON.stringify($scope.dataForm));

        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/transaksi/create";

        // console.log(JSON.stringify($scope.dataForm));

        $scope.formTransaksi = false;
        $scope.viewTransaksi = true;

        $scope.btnSave = false;
        $scope.btnUpdate = true;
        $scope.btnCancel = true;


        HttpRequest.post(apiUrl, $scope.dataForm).success(function (response) {
            console.log(response);

            $scope.eventClickCloseModal();
            swal('', 'Data Berhasil Disimpan', 'success')
            $('.Loading').hide();
            $('.page-form').show();
        });
    }

    $scope.eventClickUpdate = function () {
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "/transaksi/" + $scope.form.id;
        // $scope.form.createdBy = $scope.currentUser.email;

        $scope.formEdit = {
            id: $scope.form.id,
            statusBayar: $scope.form.jenis,
            tanggalBayar: $scope.form.tanggalBayar,
            bank: $scope.form.bank,
            updatedBy: $scope.currentUser.email
        }

        console.log(JSON.stringify($scope.formEdit));


        HttpRequest.put(apiUrl, $scope.formEdit).success(function (response) {

            console.log(JSON.stringify(response));
            $scope.renderListData();
            $scope.eventClickCloseModalUpdate();
            swal("Data Berhasil Diupdate", {
                icon: "success",
            });
            $('.Loading').hide();
            $('.page-form').show();
        })
    }

    $scope.eventClickAdd = function () {
        $scope.btnSave = true;
        $scope.btnUpdate = false;
        $scope.btnCancel = false;

        $scope.formTransaksi = true;
        $scope.viewTransaksi = false;
    }

    $scope.eventClickEdit = function (id) {

        $scope.btnSave = false;
        $scope.btnUpdate = true;
        var apiUrl = "/transaksi/" + id;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.form = {
                id: response.data.id,
                noInvoice: response.data.noInvoice,
                tanggal: response.data.tanggal.toDate(),
                detailTransaksi: response.data.detailTransaksi,
                idPembeli: response.data.idPembeli,
                namaMember: response.data.idPembeli.namaLengkap,
                barcode: response.data.barcode,
                ongkosKirim: response.data.ongkosKirim,
                jasaKirim: response.data.jasaKirim,
                diskon: response.data.diskon,
                totalTagihan: response.data.totalTagihan,
                keteranganDiskon: response.data.keteranganDiskon,
                jenis: response.data.jenis,
                tanggalBayar: response.data.tanggalBayar.toDate(),
                bank: response.data.bank,
                createdBy: response.data.createdBy,
                idPenjual: response.data.idPenjual,
                namaBank: response.data.namaBank
            }
            console.log(JSON.stringify($scope.form));

        });
    }

    $scope.eventClickCancel = () => {
        $scope.formTransaksi = true;
        $scope.viewTransaksi = false;

        $scope.btnSave = true;
        $scope.btnUpdate = false;
        $scope.btnCancel = false;
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
                    var apiUrl = "/api/Shift/deleteShift";
                    HttpRequest.post(apiUrl, $scope.dataForm).success(function () {
                        $('.Loading').hide();
                        $('.page-form').show();
                        swal("Data Berhasil Dihapus!", {
                            icon: "success",
                        });
                        $scope.renderListData();
                    })

                } else {
                    // swal("Data To");
                }
            });
    }

    $scope.showField = false;

    $scope.getShowField = (jenisTransaksi) => {
        console.log(jenisTransaksi);
        if (jenisTransaksi == "Sudah Bayar") {
            $scope.showField = true;
        } else {
            $scope.showField = false;
            $scope.form.tglPembayaran = "";
            $scope.form.bank = "";
        }
    }

    $scope.clearForm = function () {
        $scope.form = {};
        $scope.master.detailBarang = [];
    }

    $scope.eventClickCloseModal = function () {
        $scope.clearForm();
        $('#myModal').modal('hide');
        $scope.renderListData();
    }

    $scope.eventClickCloseModalUpdate = function () {
        $scope.clearForm();
        $('#myModalUpdate').modal('hide');
        $scope.renderListData();
    }

    $scope.generatePDF = () => {
        html2canvas(document.getElementById('exportPDF'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500
                    }]
                };
                pdfMake.createPdf(docDefinition).download("Invoice.pdf");
            }
        });
    }

    //Start of Application ===============================================================
    $scope.formLoad();
})