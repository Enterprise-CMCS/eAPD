const LaunchDarkly = require('launchdarkly-node-server-sdk');
const LaunchDarklyMock = require('./launchDarklyMock');
const logger = require('../logger')('apds/submissions get');

const { LD_API_KEY } = process.env;
const options = {
  streamUri: 'https://stream.launchdarkly.us',
  baseUri: 'https://app.launchdarkly.us',
  eventsUri: 'https://events.launchdarkly.us'
};

let client = null;

const waitForInitialization = async () => {
  try {
    if (!client && LD_API_KEY && LD_API_KEY !== '') {
      client = LaunchDarkly.init(LD_API_KEY, options);
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

if (process.env.NODE_ENV === 'test') {
  module.exports = LaunchDarklyMock;
} else {
  module.exports = {
    waitForInitialization,
    getLaunchDarklyFlag
  };
}
