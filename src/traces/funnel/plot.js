/**
* Copyright 2012-2019, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var d3 = require('d3');
var Lib = require('../../lib');
var Drawing = require('../../components/drawing');
var barPlot = require('../bar/plot');

module.exports = function plot(gd, plotinfo, cdModule, traceLayer) {
    barPlot(gd, plotinfo, cdModule, traceLayer);
    plotConnectors(gd, plotinfo, cdModule, traceLayer);
};

function plotConnectors(gd, plotinfo, cdModule, traceLayer) {
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;

    Lib.makeTraceGroups(traceLayer, cdModule, 'trace bars').each(function(cd) {
        var plotGroup = d3.select(this);
        var cd0 = cd[0];
        var trace = cd0.trace;

        var group = Lib.ensureSingle(plotGroup, 'g', 'lines');

        if(!trace.connector || !trace.connector.visible) {
            group.remove();
            return;
        }

        var isHorizontal = (trace.orientation === 'h');
        var mode = trace.connector.mode;

        if(!plotinfo.isRangePlot) cd0.node3 = plotGroup;

        var connectors = group.selectAll('g.line').data(Lib.identity);

        connectors.enter().append('g')
            .classed('line', true);

        connectors.exit().remove();

        var len = connectors.size();

        connectors.each(function(di, i) {
            // don't draw lines between nulls
            if(i !== len - 1 && !di.cNext) return;

            var connector = d3.select(this);
            var shape = '';

            var x0, y0;
            var x1, y1;
            var x2, y2;
            var x3, y3;

            var sAxis = (isHorizontal) ? xa : ya;
            var pAxis = (isHorizontal) ? ya : xa;

            x0 = sAxis.c2p(di.s0, true);
            y0 = pAxis.c2p(di.p0, true);

            if(i + 1 < len) {
                x1 = sAxis.c2p(di.nextS0, true);
                y1 = pAxis.c2p(di.nextP0, true);
            }

            x2 = sAxis.c2p(di.s1, true);
            y2 = pAxis.c2p(di.p1, true);

            if(i + 1 < len) {
                x3 = sAxis.c2p(di.nextS1, true);
                y3 = pAxis.c2p(di.nextP1, true);
            }

            if(x3 !== undefined && y3 !== undefined) {
                if(mode === 'spanning') {
                    if(isHorizontal) {
                        shape += 'M' + x0 + ',' + y2 + 'L' + x1 + ',' + y3;
                        shape += 'M' + x2 + ',' + y2 + 'L' + x3 + ',' + y3;
                    } else {
                        shape += 'M' + y0 + ',' + x2 + 'L' + y1 + ',' + x3;
                        shape += 'M' + y2 + ',' + x2 + 'L' + y3 + ',' + x3;
                    }
                } else { // 'between'
                    if(isHorizontal) {
                        shape += 'M' + x0 + ',' + y2 + 'L' + x1 + ',' + y1;
                        shape += 'M' + x2 + ',' + y2 + 'L' + x3 + ',' + y1;
                    } else {
                        shape += 'M' + y0 + ',' + x2 + 'L' + y1 + ',' + x1;
                        shape += 'M' + y2 + ',' + x2 + 'L' + y3 + ',' + x1;
                    }
                }
            }

            Lib.ensureSingle(connector, 'path')
                .attr('d', shape)
                .call(Drawing.setClipUrl, plotinfo.layerClipId, gd);
        });
    });
}
