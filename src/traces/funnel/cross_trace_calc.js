/**
* Copyright 2012-2019, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var setGroupPositions = require('../bar/cross_trace_calc').setGroupPositions;

module.exports = function crossTraceCalc(gd, plotinfo) {
    var fullLayout = gd._fullLayout;
    var fullData = gd._fullData;
    var calcdata = gd.calcdata;
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;
    var funnels = [];
    var funnelsVert = [];
    var funnelsHorz = [];
    var cd, i;

    for(i = 0; i < fullData.length; i++) {
        var fullTrace = fullData[i];

        if(
            fullTrace.visible === true &&
            fullTrace.xaxis === xa._id &&
            fullTrace.yaxis === ya._id &&
            fullTrace.type === 'funnel'
        ) {
            cd = calcdata[i];

            if(fullTrace.orientation === 'h') {
                funnelsHorz.push(cd);
            } else {
                funnelsVert.push(cd);
            }

            funnels.push(cd);
        }
    }

    // funnel version of 'barmode', 'bargap' and 'bargroupgap'
    var mockGd = {
        _fullLayout: {
            _axisMatchGroups: fullLayout._axisMatchGroups,
            _alignmentOpts: fullLayout._alignmentOpts,
            barmode: fullLayout.funnelmode,
            bargap: fullLayout.funnelgap,
            bargroupgap: fullLayout.funnelgroupgap
        }
    };

    setGroupPositions(mockGd, xa, ya, funnelsVert);
    setGroupPositions(mockGd, ya, xa, funnelsHorz);
};
