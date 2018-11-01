const { getFullPath, request } = require('../../utils.endpoint');

// Get rid of any undefineds in the OpenAPI object
// by stringifying and then parsing again
const openAPI = JSON.parse(JSON.stringify(require('../../routes/openAPI')));

it('open-api endpoint | GET /open-api', async () => {
  const { response, body } = await request.get(getFullPath('/open-api'));

  expect(response.statusCode).toEqual(200);
  expect(JSON.parse(body)).toMatchSnapshot();
  expect(JSON.parse(body)).toMatchObject(openAPI);
});
