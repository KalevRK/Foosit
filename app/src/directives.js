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

          // Mouseover function for SVG circles
          function mouseOverFunction() {
            // Highlight circle
            var circle = d3.select(this);
            circle
              .style("fill", "#B3F29D")
              .style("fill-opacity", 0.5);

            // Find links which have circle as source and highlight
            svg.selectAll(".link")
              .filter(function(d) {
                return d.source.name === circle[0][0].__data__.name;
              })
              .style("stroke", "#B3F29D");

            // Find labels which have circle as source and highlight
            svg.selectAll(".label")
              .filter(function(d) {
                if (d.name) {
                  return d.name === circle[0][0].__data__.name;
                } else {
                  return d.source.name === circle[0][0].__data__.name;
                }
              })
              .style("fill","#B3F29D");
          }

          function mouseOutFunction() {
            // Restore original styling of circle
            var circle = d3.select(this);
            circle
              .style("fill", "black")
              .style("fill-opacity", 0.1);

            // Find links which have circle as source and restore original styling
            svg.selectAll(".link")
              .filter(function(d) {
                return d.source.name === circle[0][0].__data__.name;
              })
              .style("stroke", "#999");
              
            // Find labels which have circle as source and restore original styling
            svg.selectAll(".label")
              .filter(function(d) {
                if (d.name) {
                  return d.name === circle[0][0].__data__.name;
                } else {
                  return d.source.name === circle[0][0].__data__.name;
                }
              })
              .style("fill","black");
          }

          // Remove any previously rendered SVG elements
          d3.select("svg").remove();

          // Define the characteristics of the force layout
          var force = d3.layout.force()
            .charge(-200)
            .linkDistance(150)
            .size([width, height])
            .nodes(data.nodes)
            .links(data.links)
            .start();

          // Create a SVG element on the DOM
          var svg = d3.select(element[0])
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("border", 1);

          // Draw a border around the SVG element
          var borderPath = svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", height)
            .style("stroke", "black")
            .style("fill", "none")
            .style("stroke-width", 1);

          // Define an arrow marker for lines
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

          // Bind link data to SVG line elements and draw new lines
          var link = svg.selectAll(".link")
            .data(data.links)
            .enter().append("g")
            .attr("class", "link")
            .append("line")
            .style("stroke-width", 2)
            .attr("marker-end", "url(#arrow)");

          // Bind node data to SVG circle elements and draw new circles
          var node = svg.selectAll(".node")
            .data(data.nodes)
            .enter().append("g")
            .attr("class", "node")
            .append("circle")
            .style("r", 20)
            .on("mouseover", mouseOverFunction)
            .on("mouseout", mouseOutFunction)
            .call(force.drag);

          // Label nodes with player names
          var nodeTexts = svg.selectAll(".node").append("text")
            .attr("class", "label")
            .style("font-size", 20)
            .style("stroke-width", "1px")
            .style("stroke", "black")
            .style("fill", "black")
            .style("fill-opacity", 1)
            .text(function(d) { return d.name });

          // Label links with the win count for the source player vs. the target player
          var linkTexts = svg.selectAll(".link").append("text")
            .attr("class", "label")
            .style("font-size", 16)
            .style("stroke-width", "1px")
            .style("stroke", "black")
            .style("fill", "black")
            .style("fill-opacity", 1)
            .text(function(d) { return d.value });          

          // Update the layout over time
          force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x < d.target.x ? d.source.x + 10 : d.source.x - 10 })
                .attr("y1", function(d) { return d.source.y < d.target.y ? d.source.y + 10 : d.source.y - 10 })
                .attr("x2", function(d) { return d.target.x < d.source.x ? d.target.x + 10 : d.target.x - 10 })
                .attr("y2", function(d) { return d.target.y < d.source.y ? d.target.y + 10 : d.target.y - 10 });

            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });

            nodeTexts.attr("transform", function(d) {
              return "translate(" + (d.x - 35) + "," + (d.y - 25) + ")";
            });

            linkTexts.attr("transform", function(d) {
              return "translate(" + (d.target.x - ((d.target.x-d.source.x)/3)) + "," + (d.target.y - ((d.target.y-d.source.y)/3)) + ")";
            });

          });

        };

      }
    }
  }]);