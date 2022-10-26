const { FileDataSource } = require('launchdarkly-node-server-sdk/integrations');
const LaunchDarkly = require('launchdarkly-node-server-sdk');
// const LaunchDarklyMock = require('./launchDarklyMock');
const logger = require('../logger')('apds/submissions get');

const { LD_API_KEY } = process.env;
const options = {
  streamUri: 'https://stream.launchdarkly.us',
  baseUri: 'https://app.launchdarkly.us',
  eventsUri: 'https://events.launchdarkly.us'
};

const testOptions = {
  updateProcessor: FileDataSource({
    paths: ['./test-data/test_feature_flags.json']
  })
};

let client = null;

const createLDClient = () => {
  if (LD_API_KEY && LD_API_KEY !== '') {
    if (process.env.NODE_ENV === 'test') {
      client = LaunchDarkly.init(LD_API_KEY, {
        ...options,
        ...testOptions
      });
      return client;
    }
    client = LaunchDarkly.init(LD_API_KEY, options);
    return client;
  }
  return null;
};

const waitForInitialization = async () => {
  try {
    if (!client) {
      createLDClient();
    }
    if (client) {
      await client.waitForInitialization();
      logger.silly('LaunchDarkly client initialized');
    }
  } catch (err) {
    logger.error(`Error connecting to LaunchDarkly: ${err}`);
  }
  return client;
};

const getLaunchDarklyFlag = async (flagName, user, defaultValue) => {
  if (client) {
    return client.variation(flagName, user, defaultValue);
  }
  return defaultValue;
};

/**
 * To use the flag:
 * const { getLaunchDarklyFlag } = require('../../middleware/launchDarkly');
 *
 * const validation = await getLaunchDarklyFlag(
 *    'validation',
 *    { key: 'anonymous', anonymous: true },
 *    false
 *  );
 */

module.exports = {
  createLDClient,
  waitForInitialization,
  getLaunchDarklyFlag
};
