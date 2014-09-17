;(function () {
  var flex = angular.module('flex', []);

  var spark = {};
  spark.SolidColor = function (color, alpha) {
    this.color = angular.isNumber(color) ? "#" + color.toString(16) : (color || "#000000");
    this.alpha = alpha || 0;
  };

  spark.SolidColorStroke = function (color, weight, alpha) {
    this.color = angular.isNumber(color) ? "#" + color.toString(16) : (color || "#000000");
    this.weight = weight;
    this.alpha = alpha;
  };

  var sVisualElementScope = {
    width: "=?",
    height: "=?",
    x: "=?",
    y: "=?",
    left: "=?",
    right: "=?",
    top: "=?",
    bottom: "=?"
  };

  var sVisualElementProps = {
    x: "left",
    y: "top",
    left: "left",
    top: "top",
    right: "right",
    bottom: "bottom",
    width: "width",
    height: "height"
  };

  flex.directive("sVisualelement", function () {
    return {
      restrict: "A",
      link: function ($scope, $element) {
        $element.css('position', 'absolute');
        $element.css('overflow', 'hidden');
        angular.forEach(sVisualElementProps, function (cssProperty, flexProperty) {
          $scope.$watch(flexProperty, function (value) {
            $element.css(cssProperty, angular.isNumber(value) ? value + "px" : value);
          });
        });
      }
    }
  });


  flex.directive("sGroup", function () {
    return {
      restrict: "E",
      transclude: true,
      template: "<div s:VisualElement ng-transclude></div>",
      scope: angular.extend({}, sVisualElementScope)
    }
  });

  flex.directive("sSolidcolorstroke", function () {
    return {
      restrict: "E",
      require: "^sRect",

      scope: {
        alpha: "=?",
        color: "@?",
        weight: "=?"
      },
      controller: function ($scope) {
        $scope.alpha = $scope.alpha || 1;
        $scope.color = $scope.color || "#000000";
        $scope.weight = $scope.weight || 1;
      },
      link: function ($scope, $element, $attrs, $rectCtlr) {
        $rectCtlr.setStroke(new spark.SolidColorStroke($scope.color, $scope.weight, $scope.alpha));
      }
    };
  });


  flex.directive("sSolidcolor", function () {
    return {
      restrict: "E",
      require: "^sRect",

      scope: {
        alpha: "=?",
        color: "@?"
      },
      controller: function ($scope) {
        $scope.alpha = $scope.alpha || 1;
        $scope.color = $scope.color || "#000000";
      },
      link: function ($scope, $element, $attrs, $rectCtlr) {
        $rectCtlr.setFill(new spark.SolidColor($scope.color, $scope.alpha));
      }
    };
  });

  flex.directive("sRect", function () {
    return {
      restrict: "E",
      transclude: true,
      scope: angular.extend({
        fill: "=?",
        stroke: "=?"
      }, sVisualElementScope),
      template: "<!--compiled:svg-->" +
        "<svg s:VisualElement width='100%' height='100%'>" +
        "  <rect width='100%' height='100%' x='0' y='0' " +
        "        fill='{{fill.color}}' fill-opacity='{{fill.alpha}}'" +
        "        stroke='{{stroke.color}}' stroke-width='{{stroke.weight}}' stroke-opacity='{{stroke.alpha}}'/>" +
        "</svg>" +
        "<!--end of svg-->",

      controller: function ($scope, $element, $attrs, $transclude) {
        this.setFill = function (fill) {
          $scope.fill = fill;
        };
        this.setStroke = function (stroke) {
          $scope.stroke = stroke;
        };
        $transclude(function (clone) {
          $element.append(clone);
        });
      },

      link: function ($scope) {
        $scope.fill = $scope.fill || new spark.SolidColor(0, 1);
      }
    }
  });
})();