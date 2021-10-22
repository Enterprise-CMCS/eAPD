---
to: api/routes/<%= httpPath %>/<%= httpVerb %>.endpoint.js
---
const {
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');


describe('<%= httpVerb.upperCase %> /<%= httpPath %>', () => {
    unauthenticatedTest('get', '/<%= httpPath %>');
    unauthorizedTest('get', '/<%= httpPath %>');

    it('returns 200', async () => {
      const api = login('all-permissions');
      const response = await api.<%= httpVerb %>('/<%= httpPath %>');
      expect(response.status).toEqual(200);
    });
})
