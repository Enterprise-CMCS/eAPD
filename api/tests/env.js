const tap = require('tap');

tap.beforeEach((done) => {
  delete require.cache[require.resolve('../env')];
  process.env = { };
  done();
});

tap.test('environment setup', (envTest) => {
  const knownEnvironmentVariables = [
    { name: 'PORT', type: 'number' }
  ];

  envTest.test('sets default values for known environment variables', (setsDefaultTest) => {
    require('../env'); // eslint-disable-line global-require
    knownEnvironmentVariables.forEach((envVar) => {
      setsDefaultTest.type(process.env[envVar.name], envVar.type, `sets the ${envVar.name} to a ${envVar.type}`);
    });
    setsDefaultTest.end();
  });

  envTest.test('does not override environment variables that have been set externally', (doesNotOverrideTest) => {
    knownEnvironmentVariables.forEach((envVar) => {
      process.env[envVar.name] = 'test-value';
    });

    require('../env'); // eslint-disable-line global-require
    knownEnvironmentVariables.forEach((envVar) => {
      doesNotOverrideTest.same(process.env[envVar.name], 'test-value', `does not override the ${envVar.name} variable`);
    });
    doesNotOverrideTest.end();
  });
  envTest.done();
});
