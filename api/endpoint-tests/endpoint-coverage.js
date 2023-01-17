#!/usr/bin/env node// The point of this script is to write stuff to the console.
/* eslint-disable no-console */

import colors from 'colors'; // eslint-disable-line import/no-extraneous-dependencies
import fs from 'fs';
import openApi from '../routes/openAPI/index.js';
import path from 'path';

const __dirname = path.resolve();

let endpoints = [];

console.log(`looking for file: ${__dirname}/endpoint-data.json`);
if (fs.existsSync(`${__dirname}/endpoint-data.json`)) {
  endpoints = JSON.parse(fs.readFileSync(`${__dirname}/endpoint-data.json`));
}

// Treat it the same as the outside world will see it.  If we
// don't do this, the object could contain undefineds, which
// can mess up our reporting.  Stringifying and parsing will
// strip out the undefineds, since those don't survive stringing
const openAPI = JSON.parse(JSON.stringify(openApi));

Object.entries(openAPI.paths).forEach(([path, pathObj]) => {
  if (!endpoints.some(e => e.openAPIPath === path)) {
    endpoints.push({ path, openAPIPath: path, methods: {} });
  }

  const endpoint = endpoints.find(e => e.openAPIPath === path);

  Object.entries(pathObj).forEach(([method, methodObj]) => {
    if (!endpoint.methods[method]) {
      endpoint.methods[method] = { registered: false, statuses: {} };
    }

    Object.keys(methodObj.responses).forEach(statusCode => {
      if (!endpoint.methods[method].statuses[statusCode]) {
        endpoint.methods[method].statuses[statusCode] = {};
      }
      endpoint.methods[method].statuses[statusCode].documented = true;
    });
  });
});

const pad = (str, len) =>
  `${str}${[...Array(len - str.length)].map(() => ' ').join('')}`;

const mark = v => (v ? colors.green('✔') : colors.red('✗'));

const report = [];
const maxPath = Math.max(...endpoints.map(e => e.openAPIPath.length));

const header = `| Method | ${pad(
  'Path',
  maxPath
)} | Status | Registered | Tested | Documented |`;
const divider = [...Array(header.length)].map(() => '-').join('');

console.log(divider);
console.log(header);
console.log(divider);

endpoints.forEach(endpoint => {
  Object.entries(endpoint.methods).forEach(([method, methodObj]) => {
    Object.entries(methodObj.statuses).forEach(
      ([statusCode, { tested, documented }]) => {
        console.log(
          `| ${pad(method.toUpperCase(), 6)} | ${pad(
            endpoint.openAPIPath,
            maxPath
          )} | ${statusCode}    | ${mark(
            methodObj.registered
          )}          | ${mark(tested)}      | ${mark(documented)}          |`
        );
        report.push({
          method,
          path: endpoint.openAPIPath,
          status: statusCode,
          registered: methodObj.registered ? '✔' : '✗',
          tested: tested ? '✔' : '✗',
          documented: documented ? '✔' : '✗'
        });
      }
    );
  });
});
console.log(divider);
