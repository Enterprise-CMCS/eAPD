#!/usr/bin/env node

/*
  converts topology json data for each state into individual svg elements
  (in case we don't want to do this on the fly)
*/

import fs from 'fs';
import path from 'path';

import { geoPath } from 'd3-geo'; // eslint-disable-line import/no-extraneous-dependencies
import { feature } from 'topojson-client'; // eslint-disable-line import/no-extraneous-dependencies

const gPath = geoPath().projection(null);
const file = path.join(__dirname, '../src/data/state-icons.json');
const data = JSON.parse(fs.readFileSync(file));

const makeSvg = (dPath, size = 100, color = '#0C4D82') =>
  `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <path d="${dPath}" fill="${color}"></path>
</svg>`;

Object.keys(data).forEach(id => {
  const state = data[id];
  const geo = feature(state, state.objects.icon);

  const dest = path.join(__dirname, `../src/static/img/states/${id}.svg`);
  const svg = makeSvg(gPath(geo));

  fs.writeFileSync(dest, svg);
});
