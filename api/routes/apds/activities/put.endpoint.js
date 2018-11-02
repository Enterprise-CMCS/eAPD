const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../utils.endpoint');

describe('APD activities endpoint | PUT /activities/:id', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = getFullPath('/activities');

  unauthenticatedTest('put', `${url}/1`);
  unauthorizedTest('put', `${url}/1`);

  describe('when authenticated as a user with permission', async () => {
    let cookies;
    beforeAll(async () => {
      cookies = await login();
    });

    it('with a non-existant activity ID', async () => {
      const { response, body } = await request.put(`${url}/9000`, {
        jar: cookies,
        json: true
      });

      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it(`with an activity on an APD in a state other than the user's state`, async () => {
      const { response, body } = await request.put(`${url}/4110`, {
        jar: cookies,
        json: true
      });

      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it('with an activity name that already exists for the APD', async () => {
      const { response, body } = await request.put(`${url}/4100`, {
        jar: cookies,
        json: {
          name: 'My Second Activity'
        }
      });

      expect(response.statusCode).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('with an empty activity name', async () => {
      const { response, body } = await request.put(`${url}/4100`, {
        jar: cookies,
        json: {
          name: ''
        }
      });

      expect(response.statusCode).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('with a valid activity', async () => {
      const { response, body } = await request.put(`${url}/4100`, {
        jar: cookies,
        json: {
          name: 'updated name',
          description: 'updated description'
        }
      });

      expect(response.statusCode).toEqual(200);
      expect(body).toMatchSnapshot();
    });
  });
});
