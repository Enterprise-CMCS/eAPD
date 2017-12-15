const tap = require('tap');

tap.beforeEach((done) => {
  process.env = { };
  done();
});

tap.test('environment setup', (envTest) => {
  envTest.test('handles the PORT environment variable', (hostTest) => {
    hostTest.test('sets default', (defaultTest) => {
      require('../env'); // eslint-disable-line global-require
      defaultTest.type(process.env.PORT, 'number', 'sets the PORT to a number');
      defaultTest.end();
    });

    hostTest.test('does not override', (overrideTest) => {
      process.env.PORT = 'test-value';
      require('../env'); // eslint-disable-line global-require
      overrideTest.same(process.env.PORT, 'test-value', 'does not override the PORT variable');
      overrideTest.end();
    });

    hostTest.end();
  });
  envTest.end();
});
