/* eslint-disable no-shadow, global-require, import/no-dynamic-require */
const tap = require('tap');
const { validateApd } = require('../../schemas');

const apdFiles = ['01-mnAPD.json', '02-akAPD.json', '03-finalAPD.json'];

tap.test('test APD seed documents', async t => {
  apdFiles.forEach(filename => {
    const document = require(`./${filename}`);
    t.test(`document '${document.name}' within '${filename}'`, async t => {
      t.ok(validateApd(document), 'is valid, according to apd.json schema');
      t.notOk(validateApd.errors, 'has no reported errors');

      // Determine the specific erroneous document properties.
      if (validateApd.errors) {
        t.equal(validateApd.errors.length, 0, 'has zero errors');
        t.equal([], validateApd.errors, 'has empty array of errors');
      }
    });
  });
});
