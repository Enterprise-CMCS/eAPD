const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const { getFullPath, request } = require('../utils');

// Get rid of any undefineds in the OpenAPI object
// by stringifying and then parsing again
const openAPI = JSON.parse(JSON.stringify(require('../../routes/openAPI')));

tap.test('open-api endpoint | GET /open-api', async test => {
  const { response, body } = await request.get(getFullPath('/open-api'));

  test.equal(response.statusCode, 200, 'gives a 200 status code');
  test.match(JSON.parse(body), openAPI, 'gives back OpenAPI');
});
