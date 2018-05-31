'use strict'

const D3Node = require('d3-node')
const d3 = require('d3')
const topojson = require('topojson')

module.exports.plot = (event, context, callback) => {
  const us = require('./us.json')

  // adapted from: https://bl.ocks.org/mbostock/6406992
  var options = {
    svgStyles:'.mesh{fill: none;stroke: #333;stroke-width: .5px;stroke-linejoin: round;}',
    d3Module: d3
  }
  var d3n = new D3Node(options)

  var width = 960,
    height = 500

  var projection = d3.geoMercator()

  var path = d3.geoPath()
    .projection(projection)

  var svg = d3n.createSVG(width, height)

  svg.append('path')
    .datum(topojson.mesh(us))
    .attr('class', 'mesh')
    .attr('d', path)

/*
  svg.selectAll(".start")
      .data(us.arcs)
    .enter().append("circle")
      .attr("class", "start")
      .attr("transform", function(d) { return "translate(" + transform(d[0]) + ")"; })
      .attr("r", 2.5);

  function transform(point) {
    return [
      point[0] * us.transform.scale[0] + us.transform.translate[0],
      point[1] * us.transform.scale[1] + us.transform.translate[1]
    ];
  }
*/

  const response = {
    statusCode: 200,
    headers: {
     "Content-Type" : "image/svg+xml"
    },
    body: d3n.svgString()
  }

  callback(null, response)
}
