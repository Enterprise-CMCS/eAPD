// Sets up dotenv, sets default environment
// variables if not defined
require('./env');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const multer = require('multer');
const uuid = require('uuid/v1');
const logger = require('./logger')('main');
const auth = require('./auth');
const routes = require('./routes');
const endpointCoverage = require('./endpointCoverageMiddleware');

const server = express();

// Turn off the X-Powered-By header that reveals information about the server
// architecture. No need just giving away all the information, though this
// code IS on Github, so I reckon folks could figure it out easily enough...
// But hey, it reduces the value of automated malicious scans, so there's that.
server.disable('x-powered-by');

endpointCoverage.registerCoverageMiddleware(server);

if (process.env.PROXY_TRUST !== 'false') {
  // If there is a non-false PROXY_TRUST value, use it. If the value is 'true',
  // convert to a boolean to trust everything. This will use the left-most
  // value in X-FORWARDED-FOR as the requestor IP address.
  server.set(
    'trust proxy',
    process.env.PROXY_TRUST === 'true' || process.env.PROXY_TRUST
  );
}

// This endpoint doesn't do anything, but lets us verify that the server is
// online without triggering any other processing - e.g., no authentication,
// no cookie/token processing, etc.
logger.silly('setting up heartbeat endpoint');
server.get('/heartbeat', (_, res) => {
  res.status(204).end();
});

server.use((_, res, next) => {
  // Disallow proxies from cacheing anything ("private"); instruct browsers to
  // validate the content with etags before using their own caches ("no-cache")
  res.header('Cache-Control', 'private, no-cache');

  // Instruct the browser to use HTTPS for this domain and its subdomains for
  // the next year.
  res.header(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );

  // Instruct browsers to use the content-type indicated by the server rather
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

server.use((req, res, next) => {
  req.id = uuid();
  req.meta = {};
  logger.verbose(req, `got ${req.method} request to ${req.path}`);
  return next();
});

logger.silly('setting global middleware');
server.use(compression());
server.use(express.urlencoded({ extended: true }));
server.use(cors({ credentials: true, origin: true }));
server.use(bodyParser.json({ limit: '5mb' }));
server.use(multer().single('file'));

// Registers Passport, related handlers, and
// login/logout endpoints
logger.silly('setting up authentication');
auth.setup(server);

logger.silly('setting up routes');
routes(server);

logger.silly('starting the server');
server.listen(process.env.PORT, () => {
  logger.verbose(`server listening on :${process.env.PORT}`);
});
