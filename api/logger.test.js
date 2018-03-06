const tap = require('tap');
const loggerCreator = require('./logger');

let originalEnv;
let originalArgs;

tap.test('logger', async (loggerTests) => {
  loggerTests.beforeEach(async () => {
    originalEnv = process.env;
    originalArgs = process.argv;
  });
  loggerTests.afterEach(async () => {
    process.env = originalEnv;
    process.argv = originalArgs;
  });

  loggerTests.test(
    'sets up a silent console transport if console logging is disabled',
    async (test) => {
      process.env.LOG_CONSOLE = 'false';
      const logger = loggerCreator('no-console-test');

      test.ok(logger.transports.console, 'creates a console logging transport');
      test.ok(logger.transports.console.silent, 'transport is silenced');
    }
  );

  loggerTests.test(
    'sets up a console transport if console logging is enabled',
    async (consoleTest) => {
      consoleTest.beforeEach(async () => {
        process.env.LOG_CONSOLE = 'true';
      });

      consoleTest.test(
        'and it is silent if the --silent argument is supplied',
        async (test) => {
          process.argv = ['--silent'];
          const logger = loggerCreator('silent-console-test');

          test.ok(
            logger.transports.console,
            'creates a console logging transport'
          );
          test.ok(logger.transports.console.silent, 'transport is silenced');
        }
      );

      consoleTest.test(
        'it is not silent if the --silent argument is not supplied',
        async (test) => {
          process.argv = [];
          const logger = loggerCreator('regular-console-test');

          test.ok(
            logger.transports.console,
            'creates a console logging transport'
          );
          test.notOk(
            logger.transports.console.silent,
            'transport is not silenced'
          );
        }
      );
    }
  );

  loggerTests.test(
    'sets up a file transport if file logging is enabled',
    async (test) => {
      process.env.LOG_FILE = 'true';
      const logger = loggerCreator('regular-file-test');

      test.ok(logger.transports.file, 'creates a file logging transport');
      test.notOk(logger.transports.file.silent, 'transport is not silenced');
    }
  );

  loggerTests.test(
    'sets the log level on all transports to the value specified in the LOG_LEVEL environment variable',
    async (test) => {
      process.env.LOG_FILE = 'true';
      process.env.LOG_CONSOLE = 'true';
      process.env.LOG_LEVEL = 'test-level';
      const logger = loggerCreator('log-level-test');

      test.equal(
        logger.transports.file.level,
        'test-level',
        'sets the file log level'
      );
      test.equal(
        logger.transports.console.level,
        'test-level',
        'sets the console log level'
      );
    }
  );
});
