const {
  getDB,
  login,
  unauthenticatedTest
} = require('../../endpoint-tests/utils');

const url = '/me';

describe('me endpoint | PATCH', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('patch', url);

  describe('PATCH /me', () => {
    it('returns 200', async () => {
      const api = login('no-permissions');
      const response = await api.patch(url, { stateId: 'ma' });
      expect(response.status).toEqual(200);
    });

    it('sets the user.state property', async () => {
      const api = login('all-permissions');
      await api.patch(url, { stateId: 'fl' });
      const getMeResponse = await api.get('/me');
      const user = getMeResponse.data;
      expect(user.state.id).toEqual('fl');
    });
  });

  it('PATCH /me?stateId=zz returns 400', async () => {
    const api = login('no-permissions');
    const response = await api.patch(url, { stateId: 'zz' });
    expect(response.status).toEqual(400);
  });

});
