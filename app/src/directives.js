'use strict';

angular.module('foositDirectives', ['d3'])
  .directive('foositGraph', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {

        // Create the SVG element to contain the graph
        var width = 960;
        var height = 500;

        var color = d3.scale.category20();

        // Watch the data attribute for changes
        // Takes time for the data to be retrieved from the server
        // so only want to render the graph once it is available
        scope.$watch('data', function(newData) {
          scope.render(newData);
        }, true);

        // Render the graph with the provided node and link data
        scope.render = function(data) {

          // If there is no data available then return
          if (!data) {
            return;
          }

          // remove any previously rendered SVG elements
          d3.select("svg").remove();

          var force = d3.layout.force()
            .charge(-120)
            .linkDistance(150)
            .size([width, height])
            .nodes(data.nodes)
            .links(data.links)
            .start();

          var svg = d3.select(element[0])
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("border", 1);

          var borderPath = svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", height)
            .style("stroke", "black")
            .style("fill", "none")
            .style("stroke-width", 1);

          // Define arrow marker for lines
          var defs = svg.append('defs');
          defs.append("svg:marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", "10")
            .attr("refY", "5")
            .attr("markerUnits", "strokeWidth")
            .attr("markerWidth", "10")
            .attr("markerHeight", "5")
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M 0 0L 10 5 L 0 10 z")
            .attr("fill", "#000");

          var link = svg.selectAll(".link")
            .data(data.links)
            .enter().append("g")
            .attr("class", "link")
            .append("line")
            .style("stroke-width", 2)
            .attr("marker-end", "url(#arrow)");

          var node = svg.selectAll(".node")
            .data(data.nodes)
            .enter().append("g")
            .attr("class", "node")
            .append("circle")
            .style("r", 20)
            .call(force.drag);

          var nodeTexts = svg.selectAll(".node").append("text")
            .attr("class", "label")
            .style("font-size", 20)
            .style("stroke-width", "1px")
            .style("stroke", "black")
            .style("fill", "black")
            .style("fill-opacity", 1)
            .text(function(d) { return d.name });

          var linkTexts = svg.selectAll(".link").append("text")
            .attr("class", "label")
            .style("font-size", 16)
            .style("stroke-width", "1px")
            .style("stroke", "black")
            .style("fill", "black")
            .style("fill-opacity", 1)
            .text(function(d) { return d.value });          

          force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x })
                .attr("y1", function(d) { return d.source.y })
                .attr("x2", function(d) { return d.target.x })
                .attr("y2", function(d) { return d.target.y });

            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });

            nodeTexts.attr("transform", function(d) {
              return "translate(" + (d.x - 35) + "," + (d.y - 25) + ")";
            });

            linkTexts.attr("transform", function(d) {
              return "translate(" + (d.target.x - ((d.target.x-d.source.x)/2)) + "," + (d.target.y - ((d.target.y-d.source.y)/2)) + ")";
            });

          });

        };

      }
    }
  }]);