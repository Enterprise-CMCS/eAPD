const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils.endpoint');

describe('APD endpoint', () => {
  describe('Delete/archive APD endpoint | DELETE /apds/:id', async () => {
    const db = getDB();
    beforeAll(() => db.seed.run());
    afterAll(() => db.destroy());

    const url = id => getFullPath(`/apds/${id}`);

    unauthenticatedTest('delete', url(0));
    unauthorizedTest('delete', url(0));

    describe('when authenticated as a user with permission', async () => {
      let cookies;
      beforeAll(async () => {
        cookies = await login();
      });

      it('with a non-existant apd ID', async () => {
        const { response, body } = await request.delete(url(9000), {
          jar: cookies,
          json: true
        });

        expect(response.statusCode).toEqual(404);
        expect(body).toMatchSnapshot();
      });

      it(`with an APD in a state other than the user's state`, async () => {
        const { response, body } = await request.delete(url(4001), {
          jar: cookies,
          json: true
        });

        expect(response.statusCode).toEqual(404);
        expect(body).toMatchSnapshot();
      });

      it('with an APD that is not in draft', async () => {
        const { response, body } = await request.delete(url(4002), {
          jar: cookies,
          json: true
        });

        expect(response.statusCode).toEqual(400);
        expect(body).toMatchSnapshot();
      });

      it('with a valid update', async () => {
        const { response, body } = await request.delete(url(4000), {
          jar: cookies,
          json: {
            programOverview: 'new overview'
          }
        });

        expect(response.statusCode).toEqual(204);
        expect(body).toMatchSnapshot();
      });
    });
  });
});
