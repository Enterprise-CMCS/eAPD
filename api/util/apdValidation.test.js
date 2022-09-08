const tap = require('tap');

const { validateAPDDoc } = require('./apdValidation');

tap.test('apd document validation', async apdValidationTests => {
  apdValidationTests.test('test import', async test => {
    const testApd = 'abc';
    const results = validateAPDDoc(testApd);
    test.same(results, testApd);
  });
});
