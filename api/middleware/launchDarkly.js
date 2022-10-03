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
    await client.waitForInitialization();
    // Initialization complete
  } catch (err) {
    // Initialization failed
  }
};

/**
 * To use the flag:
 * const { ldClient } = require('../../middleware/launchDarkly');
 *
 * const shouldValidate = await ldClient.variation(
 *   'validation',
 *   { key: 'anonymous', anonymous: true },
 *   false
 * );
 */

module.exports = {
  ldClient: client,
  waitForInitialization
};
