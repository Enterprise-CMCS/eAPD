import LaunchDarkly from 'launchdarkly-node-server-sdk';

const { LD_API_KEY } = process.env;
const options = {
  streamUri: 'https://stream.launchdarkly.us',
  baseUri: 'https://app.launchdarkly.us',
  eventsUri: 'https://events.launchdarkly.us'
};

const client =
  LD_API_KEY && LD_API_KEY !== ''
    ? LaunchDarkly.init(LD_API_KEY, options)
    : null;

export const waitForInitialization = async () => {
  // Using "await" instead, within an async function
  try {
    if (client) {
      await client.waitForInitialization();
      // Initialization complete
    }
  } catch (err) {
    // Initialization failed
  }
};

/**
 * To use the flag:
 * import { getLaunchDarklyFlag } from '../../middleware/launchDarkly';
 *
 * const validation = await getLaunchDarklyFlag(
 *    'validation',
 *    { key: 'anonymous', anonymous: true },
 *    false
 *  );
 */
export const getLaunchDarklyFlag = async (flagName, user, defaultValue) => {
  if (client) {
    return client.variation(flagName, user, defaultValue);
  }
  return defaultValue;
};
