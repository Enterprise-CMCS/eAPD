/* eslint-disable */

import React, { Component } from 'react';

import { easeCubicOut } from 'd3-ease';
import { select, selectAll } from 'd3-selection';
import 'd3-transition';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const contains = (arr, el) => arr.indexOf(el) > -1;
const sample = arr => arr[rand(0, arr.length - 1)];

class UsaAnimated extends Component {
  componentDidMount() {
    let rects = selectAll('.usa-animated rect');
    let rectsArr = [...rects._groups[0]];
    let [data, active] = [[], []];

    rects.each(function() {
      var r = select(this);
      data.push({ x: +r.attr('x'), y: +r.attr('y') });
    });

    rects.data(data).on('mouseover', function() {
      flip(this);
    });

    setInterval(() => {
      flip(sample(rectsArr));
      flip(sample(rectsArr));
    }, 2000);

    function flip(a) {
      if (contains(active, a)) return;

      active.push(a);
      let b = sample(rectsArr.filter(r => !contains(active, r)));
      active.push(b);

      selectAll([a, b])
        .data([b.__data__, a.__data__])
        .transition()
        .ease(easeCubicOut)
        .duration(1000)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .call(complete, () => {
          active = active.filter(r => r !== a && r !== b);
        });
    }

    function complete(transition, callback) {
      let n = 0;
      transition.on('start', () => ++n).on('end', () => {
        if (!--n) callback.apply(this, arguments);
      });
    }
  }

  render() {
    return (
      <div className="inline-block mr1">
        <svg
          className="align-middle usa-animated"
          viewBox="0 0 324 196"
          width="162"
          height="98"
        >
          <rect x="0" y="40" width="12" height="12" />
          <rect x="0" y="64" width="12" height="12" />
          <rect x="0" y="88" width="12" height="12" />
          <rect x="24" y="16" width="12" height="12" />
          <rect x="24" y="40" width="12" height="12" />
          <rect x="24" y="64" width="12" height="12" />
          <rect x="24" y="88" width="12" height="12" />
          <rect x="24" y="112" width="12" height="12" />
          <rect x="48" y="16" width="12" height="12" />
          <rect x="48" y="40" width="12" height="12" />
          <rect x="48" y="64" width="12" height="12" />
          <rect x="48" y="88" width="12" height="12" />
          <rect x="48" y="112" width="12" height="12" />
          <rect x="48" y="136" width="12" height="12" />
          <rect x="72" y="16" width="12" height="12" />
          <rect x="72" y="40" width="12" height="12" />
          <rect x="72" y="64" width="12" height="12" />
          <rect x="72" y="88" width="12" height="12" />
          <rect x="72" y="112" width="12" height="12" />
          <rect x="72" y="136" width="12" height="12" />
          <rect x="96" y="16" width="12" height="12" />
          <rect x="96" y="40" width="12" height="12" />
          <rect x="96" y="64" width="12" height="12" />
          <rect x="96" y="88" width="12" height="12" />
          <rect x="96" y="112" width="12" height="12" />
          <rect x="96" y="136" width="12" height="12" />
          <rect x="120" y="16" width="12" height="12" />
          <rect x="120" y="40" width="12" height="12" />
          <rect x="120" y="64" width="12" height="12" />
          <rect x="120" y="88" width="12" height="12" />
          <rect x="120" y="112" width="12" height="12" />
          <rect x="120" y="136" width="12" height="12" />
          <rect x="120" y="160" width="12" height="12" />
          <rect x="144" y="16" width="12" height="12" />
          <rect x="144" y="40" width="12" height="12" />
          <rect x="144" y="64" width="12" height="12" />
          <rect x="144" y="88" width="12" height="12" />
          <rect x="144" y="112" width="12" height="12" />
          <rect x="144" y="136" width="12" height="12" />
          <rect x="144" y="160" width="12" height="12" />
          <rect x="144" y="184" width="12" height="12" />
          <rect x="168" y="16" width="12" height="12" />
          <rect x="168" y="40" width="12" height="12" />
          <rect x="168" y="64" width="12" height="12" />
          <rect x="168" y="88" width="12" height="12" />
          <rect x="168" y="112" width="12" height="12" />
          <rect x="168" y="136" width="12" height="12" />
          <rect x="168" y="160" width="12" height="12" />
          <rect x="192" y="16" width="12" height="12" />
          <rect x="192" y="40" width="12" height="12" />
          <rect x="192" y="64" width="12" height="12" />
          <rect x="192" y="88" width="12" height="12" />
          <rect x="192" y="112" width="12" height="12" />
          <rect x="192" y="136" width="12" height="12" />
          <rect x="192" y="160" width="12" height="12" />
          <rect x="216" y="40" width="12" height="12" />
          <rect x="216" y="64" width="12" height="12" />
          <rect x="216" y="88" width="12" height="12" />
          <rect x="216" y="112" width="12" height="12" />
          <rect x="216" y="136" width="12" height="12" />
          <rect x="216" y="160" width="12" height="12" />
          <rect x="240" y="64" width="12" height="12" />
          <rect x="240" y="88" width="12" height="12" />
          <rect x="240" y="112" width="12" height="12" />
          <rect x="240" y="136" width="12" height="12" />
          <rect x="240" y="160" width="12" height="12" />
          <rect x="264" y="40" width="12" height="12" />
          <rect x="264" y="64" width="12" height="12" />
          <rect x="264" y="88" width="12" height="12" />
          <rect x="264" y="112" width="12" height="12" />
          <rect x="264" y="136" width="12" height="12" />
          <rect x="264" y="160" width="12" height="12" />
          <rect x="264" y="184" width="12" height="12" />
          <rect x="288" y="16" width="12" height="12" />
          <rect x="288" y="40" width="12" height="12" />
          <rect x="288" y="64" width="12" height="12" />
          <rect x="288" y="88" width="12" height="12" />
          <rect x="312" y="0" width="12" height="12" />
        </svg>
      </div>
    );
  }
}

export default UsaAnimated;
