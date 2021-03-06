angular.module("htmlToPdfSave", []), angular.module("htmlToPdfSave").directive("pdfSaveButton", ["$rootScope", "$pdfStorage", function(e, t) {
    return {
        restrict: "A",
        link: function(a, n, o) {
            t.pdfSaveButtons.push(n), a.buttonText = "Button", n.on("click", function() {
                var t = o.pdfSaveButton,
                    a = o.pdfName;
                e.$broadcast("savePdfEvent", {
                    activePdfSaveId: t,
                    activePdfSaveName: a
                })
            })
        }
    }
}]), angular.module("htmlToPdfSave").directive("pdfSaveContent", ["$rootScope", "$pdfStorage", function(e, t) {
    return {
        link: function(e, a, n) {
            t.pdfSaveContents.push(a);
            var o = e.$on("savePdfEvent", function(e, n) {
                function o(e, t) {
                    return e == t
                }

                function d(e, t) {
                    v(e, t)
                }

                function v(e, t) {
                    var a = $("div[pdf-save-content=" + t + "]")[0];
                    html2canvas(a, {
                        onrendered: function(e) {
                            for (var t = new jsPDF("p", "pt", "letter"), n = 0; n <= a.clientHeight / 980; n++) {
                                var o = e,
                                    d = 0,
                                    v = 980 * n,
                                    f = 900,
                                    i = 980,
                                    r = 0,
                                    u = 0,
                                    c = 900,
                                    g = 980;
                                window.onePageCanvas = document.createElement("canvas"), onePageCanvas.setAttribute("width", 900), onePageCanvas.setAttribute("height", 980);
                                var p = onePageCanvas.getContext("2d");
                                p.drawImage(o, d, v, f, i, r, u, c, g);
                                var l = onePageCanvas.toDataURL("image/png", 1),
                                    S = onePageCanvas.width,
                                    P = onePageCanvas.clientHeight;
                                n > 0 && t.addPage(612, 791), t.setPage(n + 1), t.addImage(l, "PNG", 20, 40, .62 * S, .62 * P)
                            }
                            t.save(s)
                        }
                    })
                }
                for (var f = a, i = f[0].getAttribute("pdf-save-content"), r = t.pdfSaveContents, u = n.activePdfSaveId, s = n.activePdfSaveName || "default.pdf", c = 0; c < r.length; c++)
                    if (o(u, i)) {
                        var g = r[c],
                            p = g[0],
                            l = p.getAttribute("pdf-save-content");
                        if (o(l, u)) {
                            console.log("Id is same"), d(r, l);
                            break
                        }
                    }
            });
            e.$on("$destroy", o)
        }
    }
}]), angular.module("htmlToPdfSave").service("$pdfStorage", function() {
    this.pdfSaveButtons = [], this.pdfSaveContents = []
}).service("pdfSaveConfig", function() {
    this.pdfName = "default.pdf"
});