const {
  authenticate,
  getDB,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

describe('APD endpoint', () => {
  describe('Delete/archive APD endpoint | DELETE /apds/:id', () => {
    const db = getDB();
    beforeAll(() => db.seed.run());
    afterAll(() => db.destroy());

    const url = id => `/apds/${id}`;

    unauthenticatedTest('delete', url(0));
    unauthorizedTest('delete', url(0));

    describe('when authenticated as a user with permission', () => {
      it('with a non-existant apd ID', async () => {
        const response = await authenticate()
          .then(api => api.delete(url(9000)))
          .then(res => res);

        expect(response.status).toEqual(404);
        expect(response.data).toMatchSnapshot();
      });

      it(`with an APD in a state other than the user's state`, async () => {
        const response = await authenticate()
          .then(api => api.delete(url(4001)))
          .then(res => res);

        expect(response.status).toEqual(404);
        expect(response.data).toMatchSnapshot();
      });

      it('with an APD that is not in draft', async () => {
        const response = await authenticate()
          .then(api => api.delete(url(4002)))
          .then(res => res);

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });

      it('with a valid update', async () => {
        const response = await authenticate()
          .then(api =>
            api.delete(url(4000), { programOverview: 'new overview' })
          )
          .then(res => res);

        expect(response.status).toEqual(204);
        expect(response.data).toMatchSnapshot();
      });
    });
  });
});
