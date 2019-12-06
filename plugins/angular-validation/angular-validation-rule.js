(function() {
  angular
    .module('validation.rule', ['validation'])
    .config(['$validationProvider', function ($validationProvider) {
      var expression = {
        required: function(value) {
          return !!value;
        },
        requiredNumber: function (value) {
            return value == 0 || !!value;
        },
        url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
        email: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
        number: /^\d+$/,
        minlength: function(value, scope, element, attrs, param) {
          return value && value.length >= param;
        },
        maxlength: function(value, scope, element, attrs, param) {
          return !value || value.length <= param;
        },
        emptyGuid: function (value) {
            return !value || (value && value != "00000000-0000-0000-0000-000000000000");
        },
        dateLower: function (value, scope, element, attrs, param) { //Belum benar
            var fromDate = angular.copy(value);
            var toDate = parseToDate(attrs.dateCompare);

            if (fromDate != undefined && fromDate.toString().length == 10)
                fromDate = parseToDate(angular.copy(value));

            return dateCompare(fromDate, toDate, "lt");
        },
        dateLowerOrEquals: function (value, scope, element, attrs, param) {
            var fromDate = angular.copy(value);
            var toDate = parseToDate(attrs.dateCompare);
            //console.log("invoked", fromDate);
            if (fromDate != undefined && fromDate.toString().length == 10)
                fromDate = parseToDate(angular.copy(value));

            return dateCompare(fromDate, toDate, "ltoe");
        },
        dateGreater: function (value, scope, element, attrs, param) {
            var fromDate = angular.copy(value);
            var toDate = parseToDate(attrs.dateCompare);

            if (fromDate != undefined && fromDate.toString().length == 10)
                fromDate = parseToDate(angular.copy(value));

            return dateCompare(fromDate, toDate, "gt");
        },
        dateGreaterOrEquals: function (value, scope, element, attrs, param) {
            var fromDate = angular.copy(value);
            var toDate = parseToDate(attrs.dateCompare);
            //console.log("invoked", fromDate);
            if (fromDate != undefined && fromDate.toString().length == 10)
                fromDate = parseToDate(angular.copy(value));

            return dateCompare(fromDate, toDate, "gtoe");
        }
      };

      var defaultMsg = {
        required: {
          error: 'This field is required!',
          success: ''
        },
        requiredNumber: {
            error: 'This field is required!',
            success: ''
        },
        url: {
          error: 'Invalid url',
          success: ''
        },
        email: {
          error: 'Invalid email',
          success: ''
        },
        number: {
          error: 'This should be number',
          success: ''
        },
        minlength: {
          error: 'This should be longer',
          success: ''
        },
        maxlength: {
          error: 'This should be shorter',
          success: ''
        },
        emptyGuid: {
            error: 'This field is required!',
            success: ''
        },
        dateLower: {
            error: 'From Date must be lower than To Date',
            success: ''
        },
        dateLowerOrEquals: {
            error: 'From Date must be lower than or equals To Date',
            success: ''
        },
        dateGreater: {
            error: 'To Date must be greater than From Date',
            success: ''
        },
        dateGreaterOrEquals: {
            error: 'To Date must be greater than or equals From Date',
            success: ''
        }
      };
      
      var isValidDate = function (dateStr) {
          try {

              if (dateStr == undefined)
                  return false;

              var dateTime = Date.parse(dateStr);

              if (isNaN(dateTime))
                  return false;
              
              return true;

          } catch (e) {
              return false;
          }
      };

      var parseToDate = function (dateStr) {
          try {

              if (dateStr == undefined)
                  return null;

              var splitDateStr = dateStr.split('/');

              if (dateStr.length != 10 && splitDateStr.length != 3)
                  return null;

              var date = new Date(splitDateStr[2], splitDateStr[1] - 1, splitDateStr[0]);

              if (isNaN(date))
                  return null;

              return date;

          } catch (e) {
              return null;
          }
      };
       
      var isValidDateRange = function (fromDate, toDate) {
          
          if (fromDate == "" || fromDate == undefined || toDate == "" || toDate == undefined)
              return true;

          if (!isValidDate(fromDate))
              return false;

          if (isValidDate(toDate)) {
              var fDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
              var tDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
              
              var days = getDayDiff(fDate, tDate);
              if (days < 0)
                  return false;
          }
          return true;
      };

      var dateCompare = function (fromDate, toDate, comparison) {

          if (fromDate == "" || fromDate == undefined || toDate == "" || toDate == undefined)
              return true;

          if (!isValidDate(fromDate))
              return false;

          if (isValidDate(toDate)) {

              var fDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
              var tDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());

              var days = getDayDiff(fDate, tDate);

              if (comparison == "lt") //lowerThan
                  return days > 0;
              if (comparison == "ltoe") //lowerThanOrEquals
                  return days >= 0;
              if (comparison == "gt") //greaterThan
                  return days < 0;
              if (comparison == "gtoe") //greaterThanOrEquals
                  return days <= 0;
          }
          return true;
      };

      var getDateDifference = function (fromDate, toDate) {
          return Date.parse(toDate) - Date.parse(fromDate);
      };

      var getDayDiff = function (fromDate, toDate) {
          return Math.round((Date.parse(toDate) - Date.parse(fromDate)) / (1000 * 60 * 60 * 24));
      };

      $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
    }]);
}).call(this);
