/**
* Copyright 2012-2019, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var Funnel = {};

Funnel.attributes = require('./attributes');
Funnel.layoutAttributes = require('./layout_attributes');
Funnel.supplyDefaults = require('./defaults').supplyDefaults;
Funnel.crossTraceDefaults = require('./defaults').crossTraceDefaults;
Funnel.supplyLayoutDefaults = require('./layout_defaults');
Funnel.calc = require('./calc');
Funnel.crossTraceCalc = require('./cross_trace_calc');
Funnel.plot = require('./plot');
Funnel.style = require('./style').style;
Funnel.hoverPoints = require('./hover');
Funnel.selectPoints = require('../bar/select');

Funnel.moduleType = 'trace';
Funnel.name = 'funnel';
Funnel.basePlotModule = require('../../plots/cartesian');
Funnel.categories = ['cartesian', 'svg', 'oriented', 'showLegend', 'zoomScale'];
Funnel.meta = {
    description: [
        'Draws funnel trace.',
        '"Funnel charts are a type of chart, often used to represent stages in a sales process',
        'and show the amount of potential revenue for each stage. This type of chart can also',
        'be useful in identifying potential problem areas in an organization’s sales processes.',
        'A funnel chart is similar to a stacked percent bar chart." (https://en.wikipedia.org/wiki/Funnel_chart)'
    ].join(' ')
};

module.exports = Funnel;
