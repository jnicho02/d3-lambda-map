'use strict'

const D3Node = require('d3-node')
const d3 = require('d3');
const canvasModule = require('canvas');
const topojson = require('topojson');

module.exports.plot = (event, context, callback) => {
  const us = require('./us-states.json');
//  const D3Node = require('./../index');

  // adapted from: https://bl.ocks.org/mbostock/6406992
  var options = {
    svgStyles:'.mesh{fill: none;stroke: #333;stroke-width: .5px;stroke-linejoin: round;}',
    d3Module: d3
  };

  var d3n = new D3Node(options);

  var width = 960,
    height = 500;

  var path = d3.geoPath()
    .projection(null);

  var svg = d3n.createSVG(width, height)
    .append('path')
    .datum(topojson.mesh(us))
    .attr('class', 'mesh')
    .attr('d', path);

  const response = {
    statusCode: 200,
    headers: {
     "Content-Type" : "image/svg+xml"
    },
    body: d3n.svgString(),
  }

  callback(null, response)
}
