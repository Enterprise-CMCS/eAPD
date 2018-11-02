const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../utils.endpoint');

describe('APD activities endpoint | POST /apds/:apdID/activities', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = apdID => getFullPath(`/apds/${apdID}/activities`);

  unauthenticatedTest('post', url(1));
  unauthorizedTest('post', url(1));

  describe('when authenticated as a user with permission', async () => {
    let cookies;
    beforeAll(async () => {
      cookies = await login();
    });

    it('with a non-existant APD ID', async () => {
      const { response, body } = await request.post(url(9000), {
        jar: cookies,
        json: true
      });

      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it(`with an APD in a state other than the user's state`, async () => {
      const { response, body } = await request.post(url(4001), {
        jar: cookies,
        json: true
      });

      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    describe('when creating a single new activity', async () => {
      beforeAll(() => db.seed.run());

      it('with an activity name that already exists for the APD', async () => {
        const { response, body } = await request.post(url(4000), {
          jar: cookies,
          json: {
            name: 'Find Success'
          }
        });

        expect(response.statusCode).toEqual(400);
        expect(body).toMatchSnapshot();
      });

      it('with an empty activity name', async () => {
        const { response, body } = await request.post(url(4000), {
          jar: cookies,
          json: {
            name: ''
          }
        });

        expect(response.statusCode).toEqual(400);
        expect(body).toMatchSnapshot();
      });

      it('with a valid activity', async () => {
        const { response, body } = await request.post(url(4000), {
          jar: cookies,
          json: {
            name: 'new activity name',
            description: 'description is ignored when the activity is created'
          }
        });

        expect(response.statusCode).toEqual(200);
        expect(body).toMatchSnapshot();
      });
    });

    describe('when sending multiple activities', async () => {
      beforeAll(() => db.seed.run());

      it('when an activity has an invalid name', async () => {
        const { response, body } = await request.post(url(4000), {
          jar: cookies,
          json: [
            {
              name: 'hello'
            },
            {
              name: 1
            }
          ]
        });

        expect(response.statusCode).toEqual(400);
        expect(body).toMatchSnapshot();
      });

      it('when an activity has an existing name', async () => {
        const { response, body } = await request.post(url(4000), {
          jar: cookies,
          json: [
            {
              name: 'Find Success'
            },
            {
              name: 'hello'
            }
          ]
        });

        expect(response.statusCode).toEqual(400);
        expect(body).toMatchSnapshot();
      });

      it('with valid activities', async () => {
        const { response, body } = await request.post(url(4000), {
          jar: cookies,
          json: [
            {
              name: 'new activity name'
            },
            {
              id: 4101,
              name: 'activity new name'
            }
          ]
        });

        expect(response.statusCode).toEqual(200);
        expect(body).toMatchSnapshot();
      });
    });
  });
});
