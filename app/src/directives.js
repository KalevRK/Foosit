angular.module('foositDirectives', ['d3'])
  .directive('foositGraph', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {

        var width = 960;
        var height = 500;

        var color = d3.scale.category20();

        var force = d3.layout.force()
          .charge(-120)
          .linkDistance(30)
          .size([width, height]);

        var svg = d3.select(element[0])
          .append("svg")
          .attr("width", width)
          .attr("height", height);

        scope.$watch('data', function(newData) {
          scope.render(newData);
        }, true);

        scope.render = function(data) {
          console.log('Data:', data);
        };

      }
    }
  }]);