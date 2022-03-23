// Sets up dotenv, sets default environment
// variables if not defined
require('./env');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const { v4: uuidv4 } = require('uuid');
const logger = require('./logger')('main');
const { requestLoggerMiddleware } = require('./logger/morgan');
const jsonWebTokenMiddleware = require('./auth/jwtMiddleware');
const routes = require('./routes');
const endpointCoverage = require('./middleware/endpointCoverage');
const errorHandler = require('./middleware/errorHandler');

const { setup: mongoSetup } = require('./db/mongodb');
const me = require('./routes/me/index');

try {
  mongoSetup();
} catch (err) {
  logger.error(`Error setting up MongoDB: ${err}`);
}

// deepcode ignore UseCsurfForExpress: we need a larger ticket to implement csurf
const api = express();
api.use(helmet());

// Turn off the X-Powered-By header that reveals information about the api
// architecture. No need just giving away all the information, though this
// code IS on Github, so I reckon folks could figure it out easily enough...
// But hey, it reduces the value of automated malicious scans, so there's that.
api.disable('x-powered-by');

endpointCoverage.registerCoverageMiddleware(api);

if (process.env.PROXY_TRUST !== 'false') {
  // If there is a non-false PROXY_TRUST value, use it. If the value is 'true',
  // convert to a boolean to trust everything. This will use the left-most
  // value in X-FORWARDED-FOR as the requestor IP address.
  api.set(
    'trust proxy',
    process.env.PROXY_TRUST === 'true' || process.env.PROXY_TRUST
  );
}

api.use((_, res, next) => {
  // Disallow proxies from cacheing anything ("private"); instruct browsers to
  // validate the content with etags before using their own caches ("no-cache")
  res.header('Cache-Control', 'private, no-cache');

  // Instruct the browser to use HTTPS for this domain and its subdomains for
  // the next year.
  res.header(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );

  // Instruct browsers to use the content-type indicated by the api rather
  // than ignore that and try to guess the content-type from the response body
  // (IE used to do this and would sometimes decide that things were executable
  // and then run them, with I'm sure HILARIOUS results)
  res.header('X-Content-Type-Options', 'nosniff');

  // Don't allow this URL to be embedded in frames on any sites that aren't on
  // this same domain. Not super useful for an API, but the scanners will be
  // looking for it.
  res.header('X-Frame-Options', 'sameorigin');

  // Trigger browsers' built-in cross-site scripting protection. It's usually
  // on by default, but let's be explicit. Also not super useful for an API.
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

api.use((req, res, next) => {
  req.id = uuidv4();
  req.meta = {};
  logger.verbose({
    id: req.id,
    message: `got ${req.method} request to ${req.path}`
  });
  return next();
});

logger.debug('setting global middleware');
api.use(requestLoggerMiddleware);
api.use(cors({ credentials: true, origin: true }));
api.use(compression());
api.use(express.urlencoded({ extended: true }));
api.use(bodyParser.json({ limit: '5mb' }));

// This endpoint doesn't do anything, but lets us verify that the api is
// online without triggering any other processing - e.g., no authentication,
// no cookie/token processing, etc.
logger.debug('setting up heartbeat endpoint');
api.get('/heartbeat', (_, res) => {
  res.status(204).end();
});

// Registers Passport, related handlers, and
// login/logout endpoints
logger.debug('setting up routes for me');
// Me endpoints are for token exchange and use Okta tokens, not eAPD tokens
me(api);
logger.debug('setting up authentication');
api.use(jsonWebTokenMiddleware);

logger.debug('setting up routes');
routes(api);

// Requests for undefined resources result in a 404 status
api.all('*', (_, res) => {
  res.status(404).end();
});

// Respond to api errors, accordingly. Must be loaded last.
api.use(errorHandler);

module.exports = api;
