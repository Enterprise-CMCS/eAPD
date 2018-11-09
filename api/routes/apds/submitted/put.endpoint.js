const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../utils.endpoint');

describe('APD endpoint | PUT /apds/:id/status', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = apdID => getFullPath(`/apds/${apdID}/status`);

  unauthenticatedTest('put', url(1));
  unauthorizedTest('put', url(1));

  describe('when authenticated as a user with permission', async () => {
    let cookies;
    beforeAll(async () => {
      cookies = await login();
    });

    it('with a non-existant apd ID', async () => {
      const { response, body } = await request.put(url(9000), {
        jar: cookies,
        json: true
      });

      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it('with an apd that is in draft', async () => {
      const { response, body } = await request.put(url(4000), {
        jar: cookies,
        json: true
      });

      expect(response.statusCode).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('with an invalid status', async () => {
      const { response, body } = await request.put(url(4002), {
        jar: cookies,
        json: {
          status: 'some stuff'
        }
      });

      expect(response.statusCode).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('with a valid status', async () => {
      const { response, body } = await request.put(url(4002), {
        jar: cookies,
        json: {
          status: 'approved'
        }
      });

      expect(response.statusCode).toEqual(204);
      expect(body).toMatchSnapshot();
    });
  });
});
