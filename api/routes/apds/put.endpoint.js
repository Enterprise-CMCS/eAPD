const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils.endpoint');

describe('APD endpoint | PUT /apds/:id', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = apdID => getFullPath(`/apds/${apdID}`);

  unauthenticatedTest('put', url(1));
  unauthorizedTest('put', url(1));

  describe('when authenticated as a user with permission', () => {
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

      // The updated date is the date/time stamp of when the APD is saved, so
      // it'll change with each test run.  Rather than figure out something
      // fancy with the snapshots, just pull out the name and test it with a
      // regex.
      const { updated } = body;
      delete body.updated;

      expect(response.statusCode).toEqual(200);
      expect(updated).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
      expect(body).toMatchSnapshot();
    });
  });
});
