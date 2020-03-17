const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils.endpoint');

describe('APD endpoint | PATCH /apds/:id', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = apdID => getFullPath(`/apds/${apdID}`);

  unauthenticatedTest('patch', url(1));
  unauthorizedTest('patch', url(1));

  describe('when authenticated as a user with permission', () => {
    let cookies;
    beforeAll(async () => {
      cookies = await login();
    });

    it('with a non-existant apd ID', async () => {
      const { response, body } = await request.patch(url(9000), {
        jar: cookies,
        json: true
      });

      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it(`with an APD in a state other than the user's state`, async () => {
      const { response, body } = await request.patch(url(4001), {
        jar: cookies,
        json: true
      });

      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it(`with a body that is not valid`, async () => {
      const { response, body } = await request.patch(url(4000), {
        jar: cookies,
        json: [
          {
            doesNot: 'have op',
            path: 'does exist'
          }
        ]
      });

      expect(response.statusCode).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it(`with a patch that creates an invalid APD`, async () => {
      const { response, body } = await request.patch(url(4000), {
        jar: cookies,
        json: [
          {
            op: 'replace',
            path: '/stateProfile/medicaidDirector/name',
            value: 3
          }
        ]
      });

      expect(response.statusCode).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('with a valid patch that also attempts to update a readonly property', async () => {
      const { response, body } = await request.patch(url(4000), {
        jar: cookies,
        json: [
          {
            op: 'replace',
            path: '/stateProfile/medicaidDirector/name',
            value: 'Bob the Builder'
          },
          { op: 'replace', path: '/name', value: 'new APD name' },
          {
            op: 'replace',
            path: '/activities/1/costAllocation/2019/ffp/federal',
            value: 80
          }
        ]
      });

      // The updated date is the date/time stamp of when the APD is saved, so
      // it'll change with each test run.  Rather than figure out something
      // fancy with the snapshots, just pull out the date and test it with a
      // regex.
      const { updated } = body;
      delete body.updated;

      expect(response.statusCode).toEqual(200);
      expect(updated).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
      expect(body).toMatchSnapshot();
    });

    it(`patch succeeds with an invalid date`, async () => {
      const { response, body } = await request.patch(url(4000), {
        jar: cookies,
        json: [
          {
            op: 'replace',
            path: `/activities/0/plannedStartDate`,
            value: '9999-99-99'
          }
        ]
      });

      expect(response.statusCode).toEqual(200);
      expect(body).toMatchSnapshot();
    });

  });
});
