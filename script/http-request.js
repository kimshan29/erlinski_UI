//Http Request

var webServiceBaseUrl = "https://api.myerlinski.com";
// var webServiceBaseUrl = "http://localhost/api-canteen/index.php";

mainApp.factory("HttpRequest", function ($http, $q) {
    var get = function (query) {
        return $http.get(webServiceBaseUrl + query);

    };
    var post = function (query, data) {
        return $http.post(webServiceBaseUrl + query, data);
    };
    var put = function (query, data) {
        return $http.put(webServiceBaseUrl + query, data);
    }
    var del = function (query) {
        return $http.delete(webServiceBaseUrl + query);
    };

    return {
        get: get,
        post: post,
        del: del,
        put: put
    };
});