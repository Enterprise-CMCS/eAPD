import { api } from '../../endpoint-tests/utils.js';
import openApi from './index.js';

// Get rid of any undefineds in the OpenAPI object
// by stringifying and then parsing again
const openAPI = JSON.parse(JSON.stringify(openApi));

it('open-api endpoint | GET /open-api', async () => {
  const response = await api.get('/open-api');

  expect(response.status).toEqual(200);
  expect(response.data).toMatchSnapshot();
  expect(response.data).toMatchObject(openAPI);
});
