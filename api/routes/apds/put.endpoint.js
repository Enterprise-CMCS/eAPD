const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils.endpoint');

describe('APD endpoint | PUT /apds/:id', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = apdID => getFullPath(`/apds/${apdID}`);

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

    it(`with an APD in a state other than the user's state`, async () => {
      const { response, body } = await request.put(url(4001), {
        jar: cookies,
        json: true
      });

      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it('with a valid update', async () => {
      const { response, body } = await request.put(url(4000), {
        jar: cookies,
        json: {
          programOverview: 'new overview'
        }
      });

      expect(response.statusCode).toEqual(200);
      expect(body).toMatchSnapshot();
    });
  });
});
