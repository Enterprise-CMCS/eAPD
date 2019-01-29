#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

// Treat it the same as the outside world will see it.  If we
// don't do this, the object could contain undefineds, which
// can mess up our reporting.  Stringifying and parsing will
// strip out the undefineds, since those don't survive stringing
const openAPI = JSON.parse(JSON.stringify(require('../routes/openAPI')));

const getOpenApiUrl = url => {
  let last = url.replace(/\/:(.+?)(\/|$)/g, '/{$1}$2');
  let out = last.replace(/\/:(.+?)(\/|$)/g, '/{$1}$2');

  while (out !== last) {
    last = out;
    out = last.replace(/\/:(.+?)(\/|$)/g, '/{$1}$2');
  }
  return out;
};

const allEndpoints = JSON.parse(
  fs.readFileSync(`${__dirname}/endpoints-all.txt`)
).reduce((acc, { path, method }) => {
  const methodStatus = {
    tested: false,
    documented: false
  };
  if (acc[path]) {
    acc[path][method] = methodStatus;
  } else {
    acc[path] = {
      [method]: methodStatus
    };
  }

  const openAPIpath = getOpenApiUrl(path);
  const oa = openAPI.paths[openAPIpath];
  if (oa && oa[method] && oa[method].responses) {
    acc[path][method].documented = Object.keys(oa[method].responses)
      .map(r => +r)
      .sort();
  }

  return acc;
}, {});

const hitsStream = fs.createReadStream(`${__dirname}/endpoints-hit.txt`);
const hitsReader = readline.createInterface({ input: hitsStream });

hitsReader.on('line', line => {
  const { path, method, status } = JSON.parse(line);
  const endpoint = allEndpoints[path][method.toLowerCase()];

  if (!endpoint.tested) {
    endpoint.tested = [];
  }
  if (!endpoint.tested.includes(status)) {
    endpoint.tested.push(status);
  }
  endpoint.tested.sort();
});

hitsReader.on('close', () => {
  const messages = [];
  const methodMessages = [];

  Object.keys(allEndpoints).forEach(path => {
    messages.length = 0;

    Object.keys(allEndpoints[path]).forEach(method => {
      methodMessages.length = 0;
      const tests = allEndpoints[path][method].tested;
      const docs = allEndpoints[path][method].documented;

      if (!tests) {
        methodMessages.push(`    not tested`);
      }
      if (!docs) {
        methodMessages.push(`    not documented`);
      }

      if (methodMessages.length) {
        messages.push(`  ${method}`, ...methodMessages);
        return;
      }

      tests.forEach(status => {
        if (!docs.includes(status)) {
          methodMessages.push(
            `     tests for status ${status}, but that status is not documented`
          );
        }
      });
      docs.forEach(status => {
        if (!tests.includes(status)) {
          methodMessages.push(
            `     documents status ${status}, but that status is not tested`
          );
        }
      });

      if (methodMessages.length) {
        messages.push(`  ${method}`, ...methodMessages);
      }
    });

    if (messages.length) {
      console.log(`\n${path}`);
      console.log(messages.join('\n'));
    }
  });
  // console.log(JSON.stringify(allEndpoints, false, 2));
});
