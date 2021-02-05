const { login } = require('../../endpoint-tests/utils');

const url = '/logout';

describe('/logout endpoint | POST', () => {
  it('when called, clears cookie', async () => {
    const api = login();
    const response = await api.post(url);

    expect(response.status).toEqual(200);
  });
});
