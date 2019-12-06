String.prototype.defaultDateFormat = function () {
    try
    {
    	var dateTime = this.toString();
    	
        if (dateTime == undefined || dateTime == "" || dateTime.substr(0, 10) == "1900-01-01")
            return "";

        var date = new Date(dateTime);
        var months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

        return ("0" + date.getDate()).substr(-2) + " " + months[date.getMonth()] + " " + date.getFullYear();
    }
    catch (err)
    {
        return err;
    }
}

Date.prototype.defaultDateFormat = function () {
    try
    {
        var date = this;
        
        if (date.toString() === (new Date(null)).toString())
            return "";

        return ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear();
    }
    catch (err)
    {
        return err;
    }
}

String.prototype.defaultDateFormat2 = function () {
    try
    {
    	var dateTime = this.toString();
    	
        if (dateTime == undefined || dateTime == "" || dateTime.substr(0, 10) == "1900-01-01")
            return "";

        var date = new Date(dateTime);

        return ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear();
    }
    catch (err)
    {
        return err;
    }
}

Date.prototype.defaultDateFormat2 = function () {
    try
    {
        var date = this;
        
        var months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

        if (date.toString() === (new Date(null)).toString())
            return "";

        return ("0" + date.getDate()).substr(-2) + " " + months[date.getMonth()] + " " + date.getFullYear();
    }
    catch (err)
    {
        return err;
    }
}

String.prototype.defaultDateTimeFormat = function () {
    try {
        var dateTime = this.toString();

        if (dateTime == undefined || dateTime == "" || dateTime.substr(0, 10) == "1900-01-01")
            return "";

        var date = new Date(dateTime);
        var months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

        return ("0" + date.getDate()).substr(-2) + " " + months[date.getMonth()] + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
    catch (err) {
        return err;
    }
}

Date.prototype.defaultDateTimeFormat = function () {
    try {
        var date = this;
        var months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

        if (date.toString() === (new Date(null)).toString())
            return "";

        return ("0" + date.getDate()).substr(-2) + " " + months[date.getMonth()] + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
    catch (err) {
        return err;
    }
}

String.prototype.toDate = function () {
    try
    {
        var date = this;
        if (this == undefined || this == null || this == "")
            return null;
            //date = null;

        return new Date(date);
    }
    catch (err)
    {
        return err; 
    }
}

Date.prototype.toDate = function () {
    try {
        var date = this.toString();
        if (this == undefined || this == null || this == "")
            return null;
            //date = null;

        return new Date(date);
    }
    catch (err) {
        return err;
    }
}

String.prototype.toNullableDate = function () {
    try
    {
        if (this == undefined || this.toString() == "")
            return null;
        return new Date(this);
    }
    catch (err)
    {
        return err; 
    }
}

Date.prototype.toNullableDate = function () {
    try {
        if (this == undefined || this.toString() == "")
            return null;
        return new Date(this.toString());
    }
    catch (err) {
        return err;
    }
}

String.prototype.toYaTidak = function () {
    try
    {
    	return this == "Y" ? "Ya" : "Tidak";
    }
    catch (err)
    {
        return err; 
    }
}

String.prototype.toGenderName = function () {
    try {
        return this == "L" ? "Laki-laki" : "P" ? "Perempuan" : "";
    }
    catch (err) {
        return err;
    }
}

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "," : d, 
    t = t == undefined ? "." : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

Number.prototype.toLabelProgress = function () {
    try {

        var n = this;

        if (n >= 100)
            return "Complete";
        
        if (n > 0)
            return "In Progress";

        return "Not Started";

    } catch (e) {
        return "";
    }
};