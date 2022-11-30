import tap from 'tap';
import './env.js';

const initialProcessEnv = JSON.parse(JSON.stringify(process.env));

tap.beforeEach(() => {
  process.env = { ...initialProcessEnv };
});

tap.test('environment setup', async envTest => {
  const knownEnvironmentVariables = [
    { name: 'FILE_PATH', type: 'string' },
    { name: 'FILE_STORE', type: 'string' },
    { name: 'PORT', type: 'number' },
    { name: 'NODE_ENV', type: 'string' },
    { name: 'LOG_LEVEL', type: 'string' },
    { name: 'LOG_FILE', type: 'string' },
    { name: 'LOG_CONSOLE', type: 'string' }
  ];

  envTest.test(
    'sets default values for known environment variables',
    async test => {
      knownEnvironmentVariables.forEach(envVar => {
        test.type(
          process.env[envVar.name],
          envVar.type,
          `sets the ${envVar.name} to a ${envVar.type}`
        );
      });
    }
  );

  envTest.test(
    'does not override environment variables that have been set externally',
    async test => {
      knownEnvironmentVariables.forEach(envVar => {
        process.env[envVar.name] = 'test-value';
      });

      process.env.VCAP_SERVICES = JSON.stringify({
        'user-provided': [
          {
            credentials: knownEnvironmentVariables.reduce(
              (obj, env) => ({ ...obj, [env.name]: 'from cf ' }),
              {}
            )
          }
        ]
      });

      knownEnvironmentVariables.forEach(envVar => {
        test.same(
          process.env[envVar.name],
          'test-value',
          `does not override the ${envVar.name} variable`
        );
      });
    }
  );
});
