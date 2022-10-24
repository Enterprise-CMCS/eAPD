const { TestData } = require('launchdarkly-node-server-sdk/integrations');
const LaunchDarkly = require('launchdarkly-node-server-sdk');
// const InMemoryFeatureStore = require('launchdarkly-node-server-sdk/feature_store');
const logger = require('../logger')('apds/submissions get');

// const { LD_API_KEY } = process.env;
// const options = {
//   streamUri: 'https://stream.launchdarkly.us',
//   baseUri: 'https://app.launchdarkly.us',
//   eventsUri: 'https://events.launchdarkly.us'
// };

let client = null;
let td;

const stubEventProcessor = () => {
  const eventProcessor = {
    events: [],
    sendEvent: event => {
      eventProcessor.events.push(event);
    },
    // eslint-disable-next-line consistent-return
    flush: callback => {
      if (callback) {
        setImmediate(callback);
      } else {
        return Promise.resolve(null);
      }
    },
    close: () => {}
  };
  return eventProcessor;
};

function stubLogger() {
  return {
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {}
  };
}

function stubUpdateProcessor() {
  const updateProcessor = {
    start(callback) {
      if (updateProcessor.shouldInitialize) {
        setImmediate(callback, updateProcessor.error);
      }
    },
    shouldInitialize: true
  };
  return updateProcessor;
}

function createClient(overrideOptions) {
  const defaults = {
    eventProcessor: stubEventProcessor(),
    updateProcessor: stubUpdateProcessor(),
    logger: stubLogger()
  };
  return LaunchDarkly.init('secret', { ...defaults, ...overrideOptions });
}

// /**
//  *
//  * @param {String} flagName The name of the flag to update
//  * @param {*} newValue The new value of the flag
//  * @param {Number | Boolean} [fallThruValue] Specifies the fallthrough variation for a flag, if used with user,
//  * ifMatch, or ifNotMatch it is used as the default when the special cases aren't matched, defaults to false
//  * @param {Boolean} [clearRules] If true, removes any existing rules from the flag
//  * @param {Boolean} [clearUserTargets] If true, removes any existing user targets from the flag
//  * @param {*[]} [variations] Sets the allowable variation values for the flag.
//  * @param {String[userAttribute, values...]} [ifMatch]  Starts defining a flag rule using the "is one of" operator
//  * @param {String[userAttribute, values...]} [ifNotMatch] Starts defining a flag rule using the "is not one of" operator
//  * @param {Number | Boolean} [offVariation] Specifies the off variation for a flag that is returned whenever targeting is off.
//  * @param {Boolean} [on] Sets targeting to be on or off for this flag.
//  * @param {String} [user] Sets the flag to return the specified variation for a specific user key when targeting is on
//  * for more details see: https://launchdarkly.github.io/node-server-sdk/interfaces/_launchdarkly_node_server_sdk_integrations_.TestDataFlagBuilder.html
//  */
// const setLaunchDarklyTestFlag = async ({
//   flagName,
//   newValue,
//   fallThruValue = false,
//   clearRules = false,
//   clearUserTargets = false,
//   variations = null,
//   ifMatch = null,
//   ifNotMatch = null,
//   user = null,
//   offVariation = null,
//   on = null
// }) => {
//   console.log('checking for td to update flags');
//   if (!td || !client) {
//     await waitForInitialization();
//   }
//   console.log(`updating ${flagName} to ${newValue}`);
//   let flagUpdate = td.flag(flagName);
//   // if (clearRules) {
//   //   flagUpdate = flagUpdate.clearRules();
//   // }
//   // if (clearUserTargets) {
//   //   flagUpdate = flagUpdate.clearUserTargets();
//   // }
//   // if (variations) {
//   //   flagUpdate = flagUpdate.variations(variations);
//   // }
//   // if (offVariation) {
//   //   flagUpdate = flagUpdate.offVariation(offVariation);
//   // }
//   // if (on) {
//   //   flagUpdate = flagUpdate.on(on);
//   // }
//   // console.log({ ifMatch });
//   // if (ifMatch && Array.isArray(ifMatch)) {
//   //   console.log('setting ifMatch');
//   //   flagUpdate = flagUpdate
//   //     .ifMatch(...ifMatch)
//   //     .thenReturn(newValue)
//   //     .fallthroughVariation(fallThruValue);
//   // }
//   // if (ifNotMatch && Array.isArray(ifMatch)) {
//   //   flagUpdate = flagUpdate
//   //     .ifNotMatch(...ifNotMatch)
//   //     .thenReturn(newValue)
//   //     .fallthroughVariation(fallThruValue);
//   // }
//   // if (typeof newValue === 'boolean') {
//   //   flagUpdate = flagUpdate.booleanFlag();
//   // }
//   // if (!ifMatch && !ifNotMatch) {
//   if (typeof newValue === 'boolean') {
//     flagUpdate = user
//       ? flagUpdate
//           .variationForUser(user, newValue)
//           .fallthroughVariation(fallThruValue)
//       : flagUpdate.variationForAllUsers(newValue);
//   } else {
//     flagUpdate = flagUpdate.valueForAllUsers(newValue);
//   }
//   // }

//   console.log({ flagUpdate });
//   // console.log(`rules ${JSON.stringify(flagUpdate._rules, null, 2)}`);
//   td.update(flagUpdate);
// };

const updateLDIdentity = user => {
  if (client) {
    client.identify(user);
  }
};

const createTestData = () => {
  td = TestData();
  return td;
};

const createLDClient = () => {
  if (!td) {
    td = TestData();
  }
  client = createClient({ updateProcessor: td });
  return client;
};

const waitForInitialization = async () => {
  try {
    if (!client) {
      createLDClient();
    }
    if (client) {
      await client.waitForInitialization();
      logger.silly('LaunchDarkly test client initialized');
    }
  } catch (err) {
    logger.error(`Error connecting to test LaunchDarkly: ${err}`);
  }
  return client;
};

const getLaunchDarklyFlag = async (flagName, user, defaultValue) => {
  console.log('getting LD mock flag');
  if (!client || !td) {
    console.log('reinitialize');
    await waitForInitialization();
  }
  if (client) {
    console.log('getting flag value from client');
    return client.variation(flagName, user, 'purple');
  }
  console.log('returning default');
  return defaultValue;
};

const disconnectLaunchDarkly = () => {
  if (client) {
    client.close();
    client = null;
    td = null;
  }
};

module.exports = {
  createTestData,
  createLDClient,
  waitForInitialization,
  getLaunchDarklyFlag,
  // setLaunchDarklyTestFlag,
  updateLDIdentity,
  disconnectLaunchDarkly
};
