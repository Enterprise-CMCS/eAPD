const logger = require('../../../logger')('apd activites route index');
const post = require('./post');
const put = require('./put');
const goals = require('./goals/put');
const expenses = require('./expenses/put');

module.exports = (
  app,
  postEndpoint = post,
  putEndpoint = put,
  goalsEndpoints = goals,
  expensesEndpoints = expenses
) => {
  logger.silly('setting up POST endpoint');
  postEndpoint(app);
  logger.silly('setting up PUT endpoint');
  putEndpoint(app);
  logger.silly('settin up goals endpoints');
  goalsEndpoints(app);
  logger.silly('settin up expenses endpoints');
  expensesEndpoints(app);
};
