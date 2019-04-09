// These files commented out for eAPD Builder "Layer 1" pilot.
//
// See https://github.com/18F/cms-hitech-apd/pull/1415
//
// We opted to leave all the code here so it'd be faster to get this
// functionalityturned back on in the future.

const logger = require('../../logger')('files route index');
// const del = require('./delete');
// const get = require('./get');
// const post = require('./post');

module.exports = () =>
  // app,
  // delEndpoint = del,
  // getEndpoint = get,
  // postEndpoint = post
  {
    logger.warn('files endpoints are commented out');
    // logger.silly('setting up DELETE endpoint');
    // delEndpoint(app);
    // logger.silly('setting up GET endpoint');
    // getEndpoint(app);
    // logger.silly('setting up POST endpoint');
    // postEndpoint(app);
  };
