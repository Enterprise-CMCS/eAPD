import LaunchDarkly from 'launchdarkly-node-server-sdk';
import { FileDataSource } from 'launchdarkly-node-server-sdk/integrations';
import loggerFactory from '../logger/index.js';

const logger = loggerFactory('apds/submissions get');

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

export const waitForInitialization = async () => {
  // Using "await" instead, within an async function
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
