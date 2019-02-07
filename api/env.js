const crypto = require('crypto');
const dotenv = require('dotenv');

const defaults = {
  PORT: 8000,
  SESSION_SECRET: crypto.randomBytes(64).toString('hex'),
  SESSION_LIFETIME_MINUTES: 2880,
  NODE_ENV: 'development',
  LOG_LEVEL: 'info',
  LOG_FILE: 'false',
  LOG_CONSOLE: 'true',
  STORE_PATH: '',
  STORE_TYPE: 'null' // default to using the /dev/null store
};

// Check if there are any CloudFoundry user-provided services
// offering up environment variables.  If there are, extract
// them and merge them into our environment.
const upsEnv = {};
if (process.env.VCAP_SERVICES) {
  try {
    const vcap = JSON.parse(process.env.VCAP_SERVICES);
    if (Array.isArray(vcap['user-provided'])) {
      vcap['user-provided'].forEach(ups => {
        Object.entries(ups.credentials).forEach(([name, value]) => {
          upsEnv[name] = value;
        });
      });
    }
  } catch (e) {} // eslint-disable-line no-empty
}

dotenv.config();
process.env = Object.assign({}, defaults, upsEnv, process.env);

// Don't require this until process.env is finished setting up, since that
// defines how the logger works.
const logger = require('./logger')('env setup')

// Convert the SESSION_SECRET from a hex string to a bunch of bytes, if
// applicable.
if (process.env.SESSION_SECRET.match(/^[a-f0-9]+$/i)) {
  process.env.SESSION_SECRET = Buffer.from(process.env.SESSION_SECRET, 'hex');
} else {
  logger.warn('SESSION_SECRET should be a hex string')
}

if (process.env.SESSION_SECRET.length * 8 < 256) {
  logger.warn(`SESSION_SECRET is ${process.env.SESSION_SECRET.length * 8} bits - should be AT LEAST 256 bits [see: https://tools.ietf.org/html/rfc7518#section-3.2]`)
}