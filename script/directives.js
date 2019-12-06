mainApp.directive('sgNumberInput', ['$filter', '$locale', 'Helper', function ($filter, $locale, Helper) {
    return {
        require: 'ngModel',
        restrict: "A",
        link: function ($scope, element, attrs, ctrl) {
            var fractionSize = parseInt(attrs['fractionSize']) || 0;
            var numberFilter = $filter('number');
            //format the view value
            ctrl.$formatters.push(function (modelValue) {
                var retVal = numberFilter(modelValue, fractionSize);
                var isValid = isNaN(modelValue) == false;
                ctrl.$setValidity(attrs.name, isValid);
                return retVal;
            });
            //parse user's input
            ctrl.$parsers.push(function (viewValue) {
                var caretPosition = getCaretPosition(element[0]), nonNumericCount = countNonNumericChars(viewValue);
                viewValue = viewValue || '';
                var trimFormula = $locale.NUMBER_FORMATS.GROUP_SEP == '.' ? /\./g : /,/g;
                //Replace all possible group separators
                //var trimmedValue = viewValue.trim().replace(/,/g, '').replace(/`/g, '').replace(/'/g, '').replace(/\u00a0/g, '').replace(/ /g, '');
                var trimmedValue = viewValue.trim().replace(trimFormula, '').replace(/`/g, '').replace(/'/g, '').replace(/\u00a0/g, '').replace(/ /g, '');
                //If numericValue contains more decimal places than is allowed by fractionSize, then numberFilter would round the value up
                //Thus 123.109 would become 123.11
                //We do not want that, therefore I strip the extra decimal numbers
                var separator = $locale.NUMBER_FORMATS.DECIMAL_SEP;
                var arr = trimmedValue.split(separator);
                var decimalPlaces = arr[1];
                if (decimalPlaces != null && decimalPlaces.length > fractionSize) {
                    //Trim extra decimal places
                    decimalPlaces = decimalPlaces.substring(0, fractionSize);
                    trimmedValue = arr[0] + '.' + decimalPlaces;
                }

                var numericValue = parseFloat(trimmedValue.replace($locale.NUMBER_FORMATS.DECIMAL_SEP, '.'));
                var isEmpty = numericValue == null || viewValue.trim() === "";
                var isRequired = attrs.required || false;
                var isValid = true;
                if (isEmpty && isRequired) {
                    isValid = false;
                }
                if (isEmpty == false && isNaN(numericValue)) {
                    isValid = false;
                }
                ctrl.$setValidity(attrs.name, isValid);
                if (isNaN(numericValue) == false && isValid) {
                    var newViewValue = numberFilter(numericValue, fractionSize);
                    element.val(newViewValue);
                    var newNonNumbericCount = countNonNumericChars(newViewValue);
                    var diff = newNonNumbericCount - nonNumericCount;
                    var newCaretPosition = caretPosition + diff;
                    if (nonNumericCount == 0 && newCaretPosition > 0) {
                        newCaretPosition--;
                    }
                    setCaretPosition(element[0], newCaretPosition);
                }
                return isNaN(numericValue) == false ? numericValue : null;
            });
        } //end of link function
    };
    //#region helper methods
    function getCaretPosition(inputField) {
        // Initialize
        var position = 0;
        // IE Support
        if (document.selection) {
            inputField.focus();
            // To get cursor position, get empty selection range
            var emptySelection = document.selection.createRange();
            // Move selection start to 0 position
            emptySelection.moveStart('character', -inputField.value.length);
            // The caret position is selection length
            position = emptySelection.text.length;
        }
        else if (inputField.selectionStart || inputField.selectionStart == 0) {
            position = inputField.selectionStart;
        }
        return position;
    }
    function setCaretPosition(inputElement, position) {
        if (inputElement.createTextRange) {
            var range = inputElement.createTextRange();
            range.move('character', position);
            range.select();
        }
        else {
            if (inputElement.selectionStart) {
                inputElement.focus();
                inputElement.setSelectionRange(position, position);
            }
            else {
                inputElement.focus();
            }
        }
    }
    function countNonNumericChars(value) {
        return (value.match(/[^a-z0-9]/gi) || []).length;
    }
    //#endregion helper methods
}]);

mainApp.directive('onFinishRender', ['$timeout', '$parse', function ($timeout, $parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                    if (!!attr.onFinishRender) {
                        $parse(attr.onFinishRender)(scope);
                    }
                });
            }
        }
    }
}]);

mainApp.directive('datepickerLocaldate', ['$parse', function ($parse) {
    var directive = {
        restrict: 'A',
        require: ['ngModel'],
        link: link
    };
    return directive;

    function link(scope, element, attr, ctrls) {
        var ngModelController = ctrls[0];

        // called with a JavaScript Date object when picked from the datepicker
        ngModelController.$parsers.push(function (viewValue) {
            // undo the timezone adjustment we did during the formatting
            if (viewValue != undefined)
                viewValue.setMinutes(viewValue.getMinutes() - viewValue.getTimezoneOffset());
            // we just want a local date in ISO format
            //return viewValue.toISOString().substring(0, 10);
            return viewValue;
        });

        // called with a 'yyyy-mm-dd' string to format
        ngModelController.$formatters.push(function (modelValue) {
            if (!modelValue)
                return undefined;

            // date constructor will apply timezone deviations from UTC (i.e. if locale is behind UTC 'dt' will be one day behind)
            var dt = new Date(modelValue);
            // 'undo' the timezone offset again (so we end up on the original date again)
            dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
            return dt;
        });
    }
}]);