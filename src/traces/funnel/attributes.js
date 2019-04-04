/**
* Copyright 2012-2019, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var barAttrs = require('../bar/attributes');
var lineAttrs = require('../scatter/attributes').line;

module.exports = {
    x: barAttrs.x,
    x0: barAttrs.x0,
    dx: barAttrs.dx,
    y: barAttrs.y,
    y0: barAttrs.y0,
    dy: barAttrs.dy,

    hovertext: barAttrs.hovertext,
    hovertemplate: barAttrs.hovertemplate,

    text: barAttrs.text,
    textposition: barAttrs.textposition,
    textfont: barAttrs.textfont,
    insidetextfont: barAttrs.insidetextfont,
    outsidetextfont: barAttrs.outsidetextfont,
    constraintext: barAttrs.constraintext,

    cliponaxis: barAttrs.cliponaxis,
    orientation: barAttrs.orientation,

    width: barAttrs.width,

    marker: barAttrs.marker,

    connector: {
        line: {
            color: lineAttrs.color,
            width: lineAttrs.width,
            dash: lineAttrs.dash,
            editType: 'plot'
        },
        mode: {
            valType: 'enumerated',
            values: ['spanning', 'between'],
            dflt: 'between',
            role: 'info',
            editType: 'plot',
            description: [
                'Sets the shape of connector lines.'
            ].join(' ')
        },
        visible: {
            valType: 'boolean',
            dflt: true,
            role: 'info',
            editType: 'plot',
            description: [
                'Determines if connector lines are drawn. '
            ].join(' ')
        },
        editType: 'plot'
    },

    offsetgroup: barAttrs.offsetgroup,
    alignmentgroup: barAttrs.offsetgroup
};
