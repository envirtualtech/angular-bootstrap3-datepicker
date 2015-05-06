var dp;

dp = angular.module('ng-bs3-datepicker', []);

dp.directive('ngBs3Datepicker', function($compile) {
  return {
    restrict: 'E',
    replace: true,
    template: "<div class='input-group date'>\n  <input type='text' class='form-control'/>\n  <span class='input-group-addon'>\n    <span class='fa fa-calendar'></span>\n  </span>\n</div>",
    link: function($scope, element, attr) {
      var attributes, dateFormat, input, resetValue;
      dateFormat = "";
      attributes = element.prop("attributes");
      input = element.find("input");
      resetValue = false;
      angular.forEach(attributes, function(e) {
        if (e.name !== "class") {
          input.attr(e.name, e.value);
        }
        if (e.name === "date-format") {
          return dateFormat = e.value;
        }
      });
      $scope.$watch(attr.language, function(value) {
        var language;
        language = value ? value : input.attr('language');
        return input.datetimepicker({
          language: language,
          pickTime: false,
          format: dateFormat,
          icons: {
            time: 'fa fa-clock-o',
            date: 'fa fa-calendar',
            up: 'fa fa-arrow-up',
            down: 'fa fa-arrow-down'
          }
        });
      });
      element.find('.input-group-addon').on('click', function(e) {
        return element.find('input').focus();
      });
      element.on("change.dp", function(e) {
        return $scope.$apply(function() {
          var i, obj, objPath, path, _i, _len, _results;
          if (e.date) {
            objPath = attr.ngModel.split(".");
            obj = $scope;
            _results = [];
            for (i = _i = 0, _len = objPath.length; _i < _len; i = ++_i) {
              path = objPath[i];
              if (!obj[path]) {
                obj[path] = {};
              }
              if (i === objPath.length - 1) {
                if (resetValue) {
                  resetValue = false;
                  _results.push(obj[path] = null);
                } else {
                  _results.push(obj[path] = e.date.format(dateFormat));
                }
              } else {
                _results.push(obj = obj[path]);
              }
            }
            return _results;
          }
        });
      });
      $scope.$watch(attr.ngModel, function(newValue, oldValue) {
        if (oldValue && !newValue) {
          return resetValue = true;
        }
      });
      return $compile(input)($scope);
    }
  };
});
