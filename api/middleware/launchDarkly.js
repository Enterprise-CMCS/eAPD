const LaunchDarkly = require('launchdarkly-node-server-sdk');

const { LD_API_KEY } = process.env;
const options = {
  streamUri: 'https://stream.launchdarkly.us',
  baseUri: 'https://app.launchdarkly.us',
  eventsUri: 'https://events.launchdarkly.us'
};

const client = LaunchDarkly.init(LD_API_KEY, options);

const waitForInitialization = async () => {
  // Using "await" instead, within an async function
  try {
    if (LD_API_KEY && LD_API_KEY !== '') {
      await client.waitForInitialization();
      // Initialization complete
    }
  } catch (err) {
    // Initialization failed
  }
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
 * const shouldValidate = await getLaunchDarklyFlag(
 *   'validation',
 *   { key: 'anonymous', anonymous: true },
 *   false
 * );
 */

module.exports = {
  ldClient: client,
  waitForInitialization,
  getLaunchDarklyFlag
};
