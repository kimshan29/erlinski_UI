mainApp.factory('markers', function markers() {
    return {
        currentMarkers: []
    }
});

//Constant =================================================================================================
mainApp.factory("Constant", function () {
    var emptyGuid = "00000000-0000-0000-0000-000000000000";

    return {
        emptyGuid: emptyGuid
    };
});

// Export Excel
mainApp.factory("Excel", function ($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) {
            return $window.btoa(unescape(encodeURIComponent(s)));
        },
        format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            })
        };
    return {
        tableToExcel: function (tableId, worksheetName) {
            var table = $(tableId),
                ctx = {
                    worksheet: worksheetName,
                    table: table.html()
                },
                href = uri + base64(format(template, ctx));
            return href;
        }
    };
})

//Helper ==================================================================================================
mainApp.factory("Helper", function () {

    var isNullOrEmptyOrEmptyGuid = function (data) {
        return data == undefined || data == "" || data == "00000000-0000-0000-0000-000000000000";
    };

    var ifNullOrEmptyOrEmptyGuid = function (data, trueData) {
        if (data == undefined || data == "" || data == "00000000-0000-0000-0000-000000000000")
            return trueData;

        return data;
    };

    var isNullOrEmpty = function (data) {
        return data == undefined || data == "";
    };

    var ifNullOrEmpty = function (data, trueData) {
        if (data == undefined || data == "")
            return trueData;

        return data;
    };

    var isEmptyGuid = function (data) {
        return data == "00000000-0000-0000-0000-000000000000";
    };

    var ifEmptyGuid = function (data, trueData) {
        if (data == "00000000-0000-0000-0000-000000000000")
            return trueData;

        return data;
    };

    var iif = function (expression, trueData, falseData) {
        if (expression)
            return trueData;
        return falseData;
    };

    var findItem = function (arr, propName, propValue) {
        for (var i = 0; i < arr.length; i++)
            if (arr[i][propName] == propValue)
                return arr[i];
        // will return undefined if not found; you could return a default instead
    };

    var findItems = function (arr, propName, propValue) {
        var result = [];

        for (var i = 0; i < arr.length; i++)
            if (arr[i][propName] == propValue)
                result.push(arr[i]);
        // will return undefined if not found; you could return a default instead

        return result;
    };

    var defaultDateFormat = function (dateTime) {
        try {
            if (dateTime == undefined || dateTime == "" || strDate.substr(0, 10) == "1900-01-01")
                return "";

            var date = new Date(dateTime);
            var months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

            return ("0" + date.getDate()).substr(-2) + " " + months[date.getMonth()] + " " + date.getFullYear();
        } catch (err) {
            return "";
        }
    };

    var getLabelEfektivitas = function (score) {
        try {
            if (score < 0)
                return "";
            if (score < 1.5)
                return "Tidak Efektif";
            if (score < 3)
                return "Kurang Efektif";
            if (score < 4)
                return "Efektif";
            if (score <= 5)
                return "Sangat Efektif";

            return "";
        } catch (err) {
            return "";
        }
    };

    var getClassEfektivitas = function (score) {
        try {
            if (score < 0)
                return "";
            if (score < 1.5)
                return "label-danger";
            if (score < 3)
                return "label-warning";
            if (score < 4)
                return "label-primary";
            if (score <= 5)
                return "label-success";

            return "";
        } catch (err) {
            return "";
        }
    };

    var jsonParse = function (obj) {
        try {
            var parsedJSON = JSON.parse(obj);

            return parsedJSON;
        } catch (err) {
            return {};
        }
    };

    var toLower = function (str) {
        try {
            return str.toLowerCase();
        } catch (e) {
            return "";
        }
    };

    var toLower = function (str) {
        try {
            return str.toLowerCase();
        } catch (e) {
            return "";
        }
    };

    var toUpper = function (str) {
        try {
            return str.toLowerCase();
        } catch (e) {
            return "";
        }
    };

    var notifErrorHttp = function (data) {
        var errMessage = "";

        if (data.exception.ExceptionMessage == undefined)
            data.exception.ExceptionMessage = data.exception.Message;

        if (data.operation === "GET")
            errMessage = "Terjadi kesalahan saat memuat data " + data.title + ". \n\nError message : (" + data.exceptionCode + ") " + data.exception.ExceptionMessage;
        else if (data.operation === "POST")
            errMessage = "Terjadi kesalahan saat mengirim data " + data.title + ". \n\nError message : (" + data.exceptionCode + ") " + data.exception.ExceptionMessage;
        else if (data.operation === "DELETE")
            errMessage = "Terjadi kesalahan saat menghapus data " + data.title + ". \n\nError message : (" + data.exceptionCode + ") " + data.exception.ExceptionMessage;

        alert(errMessage);

        console.log(errMessage + "( " + data.operation + " : " + data.apiUrl + " )", JSON.stringify(data.exception));
    };

    var formatMoney = function (val, c, d, t) {
        try {
            var n = val,
                c = isNaN(c = Math.abs(c)) ? 2 : c,
                d = d == undefined ? "," : d,
                t = t == undefined ? "." : t,
                s = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        } catch (e) {
            return 0;
        }
    };

    var generateYears = function (numBackward, numToward) {
        try {
            var currDate = new Date();
            var currYear = currDate.getFullYear();
            var years = [];

            for (var i = currYear - numToward; i <= currYear + numBackward; i++) {
                years.push({
                    id: i,
                    name: i.toString()
                });
            }

            return years;

        } catch (e) {
            return [];
        }
    };

    var generateStackedYears = function (minimumYear, numToward) {
        try {
            var currDate = new Date();
            var currYear = currDate.getFullYear();
            var years = [];

            for (var i = currYear + numToward; i >= minimumYear; i--) {
                years.push({
                    id: i,
                    name: i.toString()
                });
            }

            return years;

        } catch (e) {
            return [];
        }
    };

    var generateMonths = function () {
        try {
            var months = [{
                    id: 1,
                    name: "Januari"
                },
                {
                    id: 2,
                    name: "Februari"
                },
                {
                    id: 3,
                    name: "Maret"
                },
                {
                    id: 4,
                    name: "April"
                },
                {
                    id: 5,
                    name: "Mei"
                },
                {
                    id: 6,
                    name: "Juni"
                },
                {
                    id: 7,
                    name: "Juli"
                },
                {
                    id: 8,
                    name: "Agustus"
                },
                {
                    id: 9,
                    name: "September"
                },
                {
                    id: 10,
                    name: "Oktober"
                },
                {
                    id: 11,
                    name: "November"
                },
                {
                    id: 12,
                    name: "Desember"
                }
            ];

            return months;

        } catch (e) {
            return [];
        }
    };

    var generateShortMonths = function () {
        try {
            var months = [{
                    id: 1,
                    name: "Jan"
                },
                {
                    id: 2,
                    name: "Feb"
                },
                {
                    id: 3,
                    name: "Mar"
                },
                {
                    id: 4,
                    name: "Apr"
                },
                {
                    id: 5,
                    name: "Mei"
                },
                {
                    id: 6,
                    name: "Jun"
                },
                {
                    id: 7,
                    name: "Jul"
                },
                {
                    id: 8,
                    name: "Agu"
                },
                {
                    id: 9,
                    name: "Sep"
                },
                {
                    id: 10,
                    name: "Okt"
                },
                {
                    id: 11,
                    name: "Nov"
                },
                {
                    id: 12,
                    name: "Des"
                }
            ];

            return months;

        } catch (e) {
            return [];
        }
    };

    return {
        isNullOrEmptyOrEmptyGuid: isNullOrEmptyOrEmptyGuid,
        ifNullOrEmptyOrEmptyGuid: ifNullOrEmptyOrEmptyGuid,
        isNullOrEmpty: isNullOrEmpty,
        ifNullOrEmpty: ifNullOrEmpty,
        isEmptyGuid: isEmptyGuid,
        ifEmptyGuid: ifEmptyGuid,
        iif: iif,
        findItem: findItem,
        findItems: findItems,
        defaultDateFormat: defaultDateFormat,
        getLabelEfektivitas: getLabelEfektivitas,
        getClassEfektivitas: getClassEfektivitas,
        jsonParse: jsonParse,
        toLower: toLower,
        toUpper: toUpper,
        notifErrorHttp: notifErrorHttp,
        formatMoney: formatMoney,
        generateYears: generateYears,
        generateMonths: generateMonths,
        generateShortMonths: generateShortMonths,
        generateStackedYears: generateStackedYears
    };
});

mainApp.factory("FileHelper", function () {
    var downloadFromApi = function (idLampiran) {
        var apiUrl = webServiceBaseUrl + "/api/uploadFile/" + idLampiran;
        document.location.href = apiUrl;
    };

    var downloadFromBase64 = function (file) {
        alert('This function is not applicable at this moment.');
    };

    var downloadDmr = function (idDmr) {
        var apiUrl = webServiceBaseUrl + "/api/downloadDMR/" + idDmr;
        document.location.href = apiUrl;
    };

    var downloadPetaRisiko = function (tahun, bulan, idJenis, idKategori, idSubKategori, idKelompok, idEntitas, modul) {
        var apiUrl = webServiceBaseUrl + "/api/downloadProfilRisiko?tahun=" + tahun + "&bulan=" + bulan + "&idjenis=" + idJenis + "&idkategori=" + idKategori + "&idsubkategori=" + idSubKategori + "&idkelompok=" + idKelompok + "&identitas=" + idEntitas + "&mapType=" + modul;
        document.location.href = apiUrl;
    };

    return {
        downloadFromApi: downloadFromApi,
        downloadFromBase64: downloadFromBase64,
        downloadDmr: downloadDmr,
        downloadPetaRisiko: downloadPetaRisiko
    };
});

/*
mainApp.factory("UserHelper", function (Helper) {
    var currentUser = function () {

        var currUser = JSON.parse($cookies.get('currentUser'));
        console.log(currentUser);
        if (Helper.isNullOrEmpty(currentUser))
            currUser = {};

        return currUser;
    };

    return {
        currentUser: currentUser
    };
});
*/

//Models ==================================================================================================
mainApp.factory("Model", function (Constant) {
    var kr = {};
    var dmr = {};
    var mtrDmr = {};

    kr.pk = {};

    // DMR - KAJIAN KELAYAKAN
    dmr.informasiUmum = {};
    dmr.pendahuluan = {};
    dmr.kko = {};
    dmr.kkl = {};
    dmr.kh = {};
    dmr.kkf = {};
    dmr.kesimpulan = {};

    // DMR - KAJIAN RISIKO
    dmr.penetapanKonteks = {};
    dmr.identifikasi = {};
    dmr.analisaEvaluasi = {};
    dmr.rencanaMitigasi = {};

    // DMR - PERSETUJUAN
    dmr.persetujuan = {};

    dmr.informasiUmum.data = function () {
        this.id = Constant.emptyGuid,
            this.nomorDmr = Constant.emptyGuid,
            this.tahun = "",
            this.program = "",
            this.judulDmr = "",
            this.entitas = "",
            this.jenisKegiatan = {},
            this.pemilikResiko = {},
            this.periodeAwal = "",
            this.periodeAkhir = "",
            this.jenisValuta = {},
            this.nilaiAnggaran = 0
    }

    // PENDAHULUAN
    dmr.pendahuluan.data = function () {
        this.id = Constant.emptyGuid,
            this.tahun = 0,
            this.latarBelakang = "",
            this.sasaranKegiatan = "",
            this.sasaranStrategis = new function () {
                this.id = "",
                    this.name = ""
            },
            this.strategicInitiative = new function () {
                this.id = "",
                    this.name = ""
            },
            this.permasalahan = "",
            this.alternatifCaraPencapaianSasaran = new function () {
                this.id = "",
                    this.name = ""
            },
            this.dasarKebijakan = new function () {
                this.id = "",
                    this.name = ""
            },
            this.deskripsiAlternatifCaraPencapaianSasaran = ""
    }

    // KKO - KAJIAN KELAYAKAN OPERASIONAL
    dmr.kko.data = function () {
        this.penjelasanAlternatif = new function () {
                this.penjelasan = "",
                    this.caraPencapaian = ""
            },
            this.penilaianAlternatif = new function () {
                this.name = "",
                    this.aspek = new function () {
                        this.aspek = "",
                            this.bobot = "",
                            this.uraian = "",
                            this.skor = "",
                            this.nilai = ""
                    }
            },
            this.ruangLingkupPekerjaan = "",
            this.jadwalPelaksanaankegiatan = new function () {
                this.keterangan = "",
                    this.periodeAwal = "",
                    this.periodeAkhir = ""
            },
            this.kesimpulanKko = "",
            this.fileAttachment = new function () {
                this.filetype = "",
                    this.filename = "",
                    this, filesize = "",
                    this.base64 = ""
            }
    }

    // KKL - KAJIAN KELAYAKAN LINGKUNGAN
    dmr.kkl.data = function () {
        this.id = Constant.emptyGuid,
            this.penjelasanPelaksanaanKkl = "",
            this.penjelasanSasaranYangHarusDicapai = "",
            this.fileAttachment = new function () {
                this.filetype = "",
                    this.filename = "",
                    this, filesize = "",
                    this.base64 = ""
            }
    }

    // KH - KAJIAN HUKUM
    dmr.kh.data = function () {
        this.penjelasanPelaksanaan = "",
            this.rekomendasi = "",
            this.fileAttachment = new function () {
                this.filetype = "",
                    this.filename = "",
                    this, filesize = "",
                    this.base64 = ""
            }
    }

    // KKF - KAJIAN KELAYAKAN FINANSIAL
    dmr.kkf.data = function () {
        this.intangibleBenefit = "",
            this.penjelasanTambahan = "",
            this.tangible = new function () {
                this.id = "", this.name = ""
            },
            this.roe = 0,
            this.roi = 0,
            this.harga = 0,
            this.referensiHarga = "",
            this.cba = 0,
            this.nilaiCba = 0,
            this.irr = 0,
            this.npv = 0,
            this.paybackPeriod = "",
            this.kesimpulanKKF = "",
            this.fileAttachmentReturn = new function () {
                this.filetype = "",
                    this.filename = "",
                    this, filesize = "",
                    this.base64 = ""
            },
            this.fileAttachmentReferensi = new function () {
                this.filetype = "",
                    this.filename = "",
                    this, filesize = "",
                    this.base64 = ""
            },
            this.fileAttachmentCBA = new function () {
                this.filetype = "",
                    this.filename = "",
                    this, filesize = "",
                    this.base64 = ""
            },
            this.fileAttachmentRasio = new function () {
                this.filetype = "",
                    this.filename = "",
                    this, filesize = "",
                    this.base64 = ""
            }
    }

    // KESIMPULAN
    dmr.kesimpulan.data = function () {
        this.kesimpulan = "",
            this.kesimpulanAkhir = ""
    }


    // PENETAPAN KONTEKS
    dmr.penetapanKonteks = function () {
        this.sasaranStrategis = "",
            this.strategicInitiative = "",
            this.sasaranOperasional = new function () {
                this.id = "",
                    this.keterangan = ""
            },
            this.sasaranFinansial = new function () {
                this.id = "",
                    this.name = ""
            },
            this.spesifik = "",
            this.measurement = "",
            this.agreed = "",
            this.realistic = "",
            this.timebound = new function () {
                this.name = "",
                    this.periodeAwal = "",
                    this.periodeAkhir = ""
            }
    }

    // IDENTIFIKASI
    dmr.identifikasi.data = function () {
        this.sasaranStrategis = new function () {
                this.sasaran = "",
                    this.kategori = new function () {
                        this.kategoriRisiko = "",
                            this.subKategori = new function () {
                                this.id = "", this.name = ""
                            },
                            this.risiko = new function () {
                                this.id = "", this.name = ""
                            },
                            this.kejadian = "",
                            this.tipeSumberRisiko = new function () {
                                this.id = "", this.name = ""
                            },
                            this.sumberRisiko = new function () {
                                this.id = "", this.name = ""
                            },
                            this.penyebab = new function () {
                                this.id = "", this.name
                            },
                            this.areaDampak = ""
                    }
            },
            this.sasaranOperasional = new function () {
                this.sasaran = "",
                    this.kategori = new function () {
                        this.kategoriRisiko = "",
                            this.subKategori = new function () {
                                this.id = "", this.name = ""
                            },
                            this.risiko = new function () {
                                this.id = "", this.name = ""
                            },
                            this.kejadian = "",
                            this.tipeSumberRisiko = new function () {
                                this.id = "", this.name = ""
                            },
                            this.sumberRisiko = new function () {
                                this.id = "", this.name = ""
                            },
                            this.penyebab = new function () {
                                this.id = "", this.name
                            },
                            this.areaDampak = ""
                    }
            },
            this.sasaranFinansial = new function () {
                this.sasaran = "",
                    this.kategori = new function () {
                        this.kategoriRisiko = "",
                            this.subKategori = new function () {
                                this.id = "", this.name = ""
                            },
                            this.risiko = new function () {
                                this.id = "", this.name = ""
                            },
                            this.kejadian = "",
                            this.tipeSumberRisiko = new function () {
                                this.id = "", this.name = ""
                            },
                            this.sumberRisiko = new function () {
                                this.id = "", this.name = ""
                            },
                            this.penyebab = new function () {
                                this.id = "", this.name
                            },
                            this.areaDampak = ""
                    }
            }
    }

    // ANALISA & EVALUASI
    dmr.analisaEvaluasi.data = function () {
        this.sasaranStrategis = function () {
                this.sasaran = "",
                    this.risiko = new function () {
                        this.risiko = "",
                            this.penyebab = new function () {
                                this.namaPenyebab = "",
                                    this.areaDampak = "",
                                    this.existingControl = "",
                                    this.fungsiKontrol = new function () {
                                        this.dampak = false, this.kemungkinan = true, this.keduanya = false
                                    },
                                    this.efektifitas = new function () {
                                        this.approach = "", this.deployment = "", this.learning = "", this.integration = "", this.nilai = ""
                                    },
                                    this.peringkatDampak = new function () {
                                        this.id = "", this.name = ""
                                    },
                                    this.peringkatKemungkinan1 = new function () {
                                        this.id = "", this.name = ""
                                    },
                                    this.peringkatKemungkinan2 = new function () {
                                        this.id = "", this.name = ""
                                    },
                                    this.relatifRisiko = "",
                                    this.tingkatRisiko = "",
                                    this.keberterimaanRisiko = ""
                            }
                    }
            },
            this.sasaranOperasional = new function () {
                this.sasaran = "",
                    this.risiko = new function () {
                        this.risiko = "",
                            this.penyebab = new function () {
                                this.namaPenyebab = "",
                                    this.areaDampak = "",
                                    this.existingControl = "",
                                    this.fungsiKontrol = new function () {
                                        this.dampak = false, this.kemungkinan = true, this.keduanya = false
                                    },
                                    this.efektifitas = new function () {
                                        this.approach = "", this.deployment = "", this.learning = "", this.integration = "", this.nilai = ""
                                    },
                                    this.peringkatDampak = new function () {
                                        this.id = "", this.name = ""
                                    },
                                    this.peringkatKemungkinan1 = new function () {
                                        this.id = "", this.name = ""
                                    },
                                    this.peringkatKemungkinan2 = new function () {
                                        this.id = "", this.name = ""
                                    },
                                    this.relatifRisiko = "",
                                    this.tingkatRisiko = "",
                                    this.keberterimaanRisiko = ""
                            }
                    }
            },
            this.sasaranFinansial = new function () {
                this.sasaran = "",
                    this.risiko = new function () {
                        this.risiko = "",
                            this.penyebab = new function () {
                                this.namaPenyebab = "",
                                    this.areaDampak = "",
                                    this.existingControl = "",
                                    this.fungsiKontrol = new function () {
                                        this.dampak = false, this.kemungkinan = true, this.keduanya = false
                                    },
                                    this.efektifitas = new function () {
                                        this.approach = "", this.deployment = "", this.learning = "", this.integration = "", this.nilai = ""
                                    },
                                    this.peringkatDampak = new function () {
                                        this.id = "", this.name = ""
                                    },
                                    this.peringkatKemungkinan1 = new function () {
                                        this.id = "", this.name = ""
                                    },
                                    this.peringkatKemungkinan2 = new function () {
                                        this.id = "", this.name = ""
                                    },
                                    this.relatifRisiko = "",
                                    this.tingkatRisiko = "",
                                    this.keberterimaanRisiko = ""
                            }
                    }
            }
    }

    // RENCANA MITIGASI
    dmr.rencanaMitigasi.data = function () {
        this.sasaran = "",
            this.riskOwner = "",
            this.risiko = new function () {
                this.risiko = "",
                    this.sumberRisiko = "",
                    this.penyebab = new function () {
                        this.namaPenyebab = "",
                            this.controlledRisk = "",
                            this.rencanaMitigasi = "",
                            this.picKoordinator = "",
                            this.langkahKerja = new function () {
                                this.id = "", this.langkahKerja = "", this.picLangkah = "", this.biayaValuta = new function () {
                                    this.id = "", this.name = ""
                                }, this.biaya = "", this.targetMulai = "", this.targetSelesai = ""
                            },
                            this.fungsiKontrol = new function () {
                                this.dampak = false, this.kemungkinan = false, this.keduanya = false
                            },
                            this.peringkatDampak = new function () {
                                this.id = "", this.name = ""
                            },
                            this.peringkatKemungkinan = new function () {
                                this.id = "", this.name = ""
                            },
                            this.peringkatKemungkinan2 = new function () {
                                this.id = "", this.name = ""
                            },
                            this.relatifRisiko = "",
                            this.tingkatRisiko = "",
                            this.keberterimaanRisiko = ""
                    }
            }
    }


    // PERSETUJUAN
    dmr.persetujuan.data = function () {
        this.kesimpulan = "",
            this.pemeriksa = "",
            this.rekomendasiKSRM = "",
            this.coaching = false,
            this.verifikator = new function () {
                this.id = "", this.name = ""
            },
            this.kadiv = new function () {
                this.id = "", this.nama = ""
            }
    }

    //==== END OF DMR ====//

    kr.pk.detailSasaran = function () {
        this.id = Constant.emptyGuid, //"062d6474-ee47-49d6-bc25-5f95027e23da",
            this.idKR = Constant.emptyGuid, //"ecd06354-053d-414a-bd30-b16a7d01dc56",
            this.sasaranStrategis = {}, //kr.pk.sasaranStrategis
            this.sasaranKPIKM = [], //kr.pk.sasaranKPIKM
            this.username = "" //"fuji.setianto@indonesiapower.co.id"
    }

    kr.pk.sasaranStrategis = function () {
        this.id = Constant.emptyGuid, //"52210dd4-a163-45f1-bea5-fd8aba163a1c",
            this.kodeSO = "", //"SO-02",
            this.name = "", //"SO-02 Efisiensi Biaya",
            this.tahun = 0, //2016,
            this.perspective = "", //"Keuangan dan Pasar",
            this.periodeRJPP = "", //"2016-2021",
            this.periodeSO = "", //"2016-2021",
            this.status = "" //"OK"
    }

    kr.pk.sasaranKPIKM = function () {
        this.id = Constant.emptyGuid, //"65443139-eb44-4a59-bcca-cea767d5978b",
            this.kpikmId = Constant.emptyGuid, //"e3714a17-8d9f-42db-ba58-0ef88f37d5df",
            this.soId = Constant.emptyGuid, //"52210dd4-a163-45f1-bea5-fd8aba163a1c",
            this.name = "", //"KONTRAK MANAJEMEN No= 10.KM/004/IP/2015Kinerja Anggaran (CAPEX) - (i) Kelengkapan Dokumen Pengadaan Investasi",
            this.keterangan = "", //"KONTRAK MANAJEMEN No= 10.KM/004/IP/2015Kinerja Anggaran (CAPEX) - (i) Kelengkapan Dokumen Pengadaan Investasi dengan target 100 %",
            this.sasaranType = "" //"KM"
    }

    kr.id = {};

    kr.id.detailIdentifikasi = function () {
        this.id = Constant.emptyGuid, //"65443139-eb44-4a59-bcca-cea767d5978b",
            this.idSasaranKPIKM = Constant.emptyGuid, //"c9093b58-7fc1-450f-8217-1a1124b01f36",
            this.name = "", //"Kinerja Anggaran (CAPEX) - (ii) Pelaksanaan Program Investasi sudah terkontrak",
            this.sasaranStrategis = new function () {
                this.id = Constant.emptyGuid, //"52210dd4-a163-45f1-bea5-fd8aba163a1c",
                    this.kodeSO = "", //"SO-02",
                    this.name = "", //"SO-02 Efisiensi Biaya",
                    this.tahun = 0, //2016,
                    this.perspective = "", //"Keuangan dan Pasar",
                    this.periodeRJPP = "", //"2016-2021",
                    this.periodeSO = "", //"2016-2021",
                    this.status = "" //"OK"tianto@indonesiapower.co.id"
            },
            this.detailRisiko = [],
            this.username = "" //"fuji.setianto@indonesiapower.co.id"
    }

    kr.id.detailRisiko = function () {
        this.idDetailKategoriRisiko = Constant.emptyGuid, //"339a0636-1512-47bf-a5bb-657cd6e58437",
            this.idKR = Constant.emptyGuid, //"ecd06354-053d-414a-bd30-b16a7d01dc56",
            this.idSasaranKPIKM = Constant.emptyGuid, //"c9093b58-7fc1-450f-8217-1a1124b01f36",
            this.kategoriRisiko = new function () {
                this.id = Constant.emptyGuid, //"6e8313d7-7687-471e-80e6-9b464bd4b73e",
                    this.name = "" //"Operasional"
            },
            this.subKategori = new function () {
                this.id = Constant.emptyGuid, //"ee322536-f08e-4723-af02-612111063edf",
                    this.idKategoriRisiko = Constant.emptyGuid, //"6e8313d7-7687-471e-80e6-9b464bd4b73e",
                    this.name = "" //"Teknologi"
            },
            this.kejadian = new function () {
                this.id = Constant.emptyGuid, //"412e1a25-696c-4b56-ab2d-5e9e6f40ebe3",
                    this.idRisk = Constant.emptyGuid, //"98089352-2910-4b07-ad9c-2410489788e1",
                    this.name = "", //"Security teknologi tidak mampu menahan hack",
                    this.areaDampak = new function () {
                        this.id = Constant.emptyGuid, //"5fe3d1dc-c2f6-4a46-ab97-b9408ffd7133",
                            this.name = "" //"Teknologi"
                    }
            },
            this.risiko = new function () {
                this.id = Constant.emptyGuid, //"98089352-2910-4b07-ad9c-2410489788e1",
                    this.idPustakaRisiko = "", //"58",
                    this.name = "" //"Security Teknologi"
            },
            this.tipeSumberRisiko = new function () {
                this.id = Constant.emptyGuid, //"4d7f3762-075c-4cf2-ae2a-518aad137c28",
                    this.name = "" //"Internal"
            },
            this.sumberRisiko = new function () {
                this.id = Constant.emptyGuid, //"2825f78b-9e81-4d0e-a17f-08665d5d515d",
                    this.idPustakaSumberRisiko = "", //"SR-0008",
                    this.name = "" //"Lingkungan Pembangkit"
            },
            this.penyebab = []
    }

    kr.id.penyebab = function () {
        this.id = Constant.emptyGuid, //"5e7ad8dc-79f5-4d78-b5c7-fce8cf1daa4c",
            this.idPustakaPenyebab = "", //"",
            this.name = "", //"Penyebab 1",
            this.idPustakarisiko = Constant.emptyGuid //"98089352-2910-4b07-ad9c-2410489788e1"
    }

    kr.id.kejadian = function () {
        this.id = Constant.emptyGuid, //"412e1a25-696c-4b56-ab2d-5e9e6f40ebe3",
            this.idRisk = Constant.emptyGuid, //"98089352-2910-4b07-ad9c-2410489788e1",
            this.name = "", //"Security teknologi tidak mampu menahan hack",
            this.areaDampak = new function () {
                this.id = Constant.emptyGuid, //"5fe3d1dc-c2f6-4a46-ab97-b9408ffd7133",
                    this.name = "" //"Teknologi"
            }
    }

    kr.ae = {};

    kr.ae.existingControl = function () {
        this.id = Constant.emptyGuid, //"7b985811-fc9e-4335-9ea3-9ae32157e272",
            this.name = "", //"sample string 2",
            this.approach = 0, //3,
            this.deployment = 0, //4,
            this.learning = 0, //5,
            this.integration = 0, //6,
            this.nilai = 0, //7.0,
            this.efektifitas = "" //"sample string 8"
    }

    kr.ae.peringkatDampak = function () {
        this.id = Constant.emptyGuid, // "f46aadf0-1cc6-4950-9bd2-4dc97ad6fddb",
            this.name = "", // "sample string 2",
            this.keterangan = "", // "sample string 3",
            this.nilai = 0 // 4
    }

    kr.ae.peringkatKemungkinan = function () {
        this.id = Constant.emptyGuid, // "f46aadf0-1cc6-4950-9bd2-4dc97ad6fddb",
            this.name = "", // "sample string 2",
            this.keterangan = "", // "sample string 3",
            this.nilai = 0 // 4
    }

    kr.ae.tingkatRisiko = function () {
        this.id = Constant.emptyGuid, // "24a0b9a6-3dd2-4943-9ff4-38def04889a1",
            this.name = "", // "sample string 2",
            this.keberterimaanRisiko = "", // "sample string 3",
            this.warna = "" // "sample string 4"
    }

    kr.rm = {};

    kr.rm.rencanaMitigasi = function () {
        this.id = Constant.emptyGuid, //"2E46BB7D-B227-4658-B360-3F1A01255254", 
            this.name = "", //"Mitigasi pengadaan sumber bahan bakar hijau", 
            this.picKoordinator = new kr.rm.pic(), //{id= "", //"5AB1B897-7320-4012-B914-EAA6BAA707C2", name= "", //"Finira"}, 
            this.langkahKerja = [], //[]
            this.fungsiMitigasi = 3, //3,
            this.peringkatDampakRR = new function () {
                this.id = Constant.emptyGuid, //"4d251f10-60b2-44c4-a5d4-79f1dfd3b334",
                    this.name = "", //"sample string 2",
                    this.keterangan = "", //"sample string 3"
                    this.nilai = 0
            },
            this.tipePeringkatKemungkinan = new function () {
                this.id = Constant.emptyGuid, //"dfd7c237-6b94-404c-a473-2adaf5d12868",
                    this.name = "" //"sample string 2",
            },
            this.peringkatKemungkinanRR = new function () {
                this.id = Constant.emptyGuid, //"dfd7c237-6b94-404c-a473-2adaf5d12868",
                    this.name = "", //"sample string 2",
                    this.keterangan = "", //"sample string 3"
                    this.nilai = 0
            },
            this.tingkatRisikoRR = new function () {
                this.id = Constant.emptyGuid, //"295835af-43e7-42ce-b061-a966f876c2f1",
                    this.name = "", //"sample string 2",
                    this.keberterimaanRisiko = "", //"sample string 3",
                    this.warna = "" //"sample string 4"
            }
    }

    kr.rm.langkahKerja = function () {
        this.id = Constant.emptyGuid, //"A0E40D5A-0621-489C-8B4B-456781F97B2B", 
            this.name = "", //"Langkah kerja mengadakan sumber bahan bakar hijau", 
            this.picLangkah = new kr.rm.pic(), //{id= "", //"B8BD2682-321F-424E-8729-8E667C6AC959", name= "", //"Surando"}, 
            this.currency = 'IDR', //"IDR", biaya= "", //"2.000.000.000", 
            this.biaya = 0,
            this.targetMulai = "", //"1 Jan 2016", 
            this.targetSelesai = "" //"21 Mei 2016"
    }

    kr.rm.pic = function () {
        this.id = Constant.emptyGuid,
            this.employeeNumber = "",
            this.name = "",
            this.jabatan = "",
            this.email = "",
            this.payrollName = ""
    }

    mtrDmr.jadwalPK = {};

    mtrDmr.jadwalPK.lampiran = function () {
        this.id = Constant.emptyGuid,
            this.idTB = Constant.emptyGuid,
            this.url = "",
            this.title = "",
            this.file = new function () {
                this.filetype = "",
                    this.filename = "",
                    this.filesize = 0,
                    this.base64 = ""
            }
    }

    return {
        kr: kr,
        dmr: dmr,
        mtrDmr: mtrDmr
    };
});