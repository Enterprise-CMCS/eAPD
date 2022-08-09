const { setup } = require('./db/mongodb');
require('@babel/register');

module.exports = async () => setup();
