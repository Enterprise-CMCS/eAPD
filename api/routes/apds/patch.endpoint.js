const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

describe('APD endpoint | PATCH /apds/:id', () => {
  const db = getDB();
  beforeAll(() => setupDB(db));
  afterAll(() => teardownDB(db));

  const url = apdID => `/apds/${apdID}`;

  unauthenticatedTest('patch', url(1));
  unauthorizedTest('patch', url(1));

  describe('when authenticated as a user with permission', () => {
    let api;
    beforeAll(async () => {
      api = login('state-admin');
    });

    it('with a non-existant apd ID', async () => {
      const response = await api.patch(url(9000));

      expect(response.status).toEqual(400);
      expect(response.data).toMatchSnapshot();
    });

    it(`with an APD in a state other than the user's state`, async () => {
      const response = await api.patch(url(4000));

      expect(response.status).toEqual(403);
      expect(response.data).toMatchSnapshot();
    });

    it(`with a body that is not valid`, async () => {
      const data = [
        {
          doesNot: 'have op',
          path: 'does exist'
        }
      ];

      const response = await api.patch(url(4001), data);
      delete response.data.updated;

      expect(response.status).toEqual(400);
      expect(response.data).toMatchSnapshot();
    });

    it(`with a patch that creates an invalid APD`, async () => {
      const data = [
        {
          op: 'replace',
          path: '/stateProfile/medicaidDirector/name',
          value: 3
        }
      ];

      const response = await api.patch(url(4001), data);
      delete response.data.updated;

      expect(response.status).toEqual(400);
      expect(response.data).toMatchSnapshot();
    });

    it('with a valid patch that also attempts to update a readonly property', async () => {
      const data = [
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
      ];

      const response = await api.patch(url(4001), data);

      // The updated date is the date/time stamp of when the APD is saved, so
      // it'll change with each test run.  Rather than figure out something
      // fancy with the snapshots, just pull out the date and test it with a
      // regex.
      const { updated } = response.data;
      delete response.data.updated;

      expect(response.status).toEqual(200);
      expect(updated).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
      expect(response.data).toMatchSnapshot();
    });

    it(`patch succeeds with an invalid date`, async () => {
      const data = [
        {
          op: 'replace',
          path: `/activities/0/plannedStartDate`,
          value: '9999-99-99'
        }
      ];

      const response = await api.patch(url(4001), data);

      // The updated date is the date/time stamp of when the APD is saved, so
      // it'll change with each test run.  Rather than figure out something
      // fancy with the snapshots, just pull out the date and test it with a
      // regex.
      const { updated } = response.data;
      delete response.data.updated;

      expect(response.status).toEqual(200);
      expect(updated).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
      expect(response.data).toMatchSnapshot();
    });

    it('prevents a dangerous value from being stored', async () => {
      const data = [
        {
          op: 'replace',
          path: `/programOverview`,
          value:
            '<svg><a xlink:href="javascript:alert(document.domain)"><text x="20" y="20">XSS</text></a>'
        }
      ];

      const response = await api.patch(url(4001), data);
      const { programOverview } = response.data;
      delete response.data.updated;

      expect(response.status).toEqual(200);
      expect(programOverview).toEqual('<a>XSS</a>');
      expect(response.data).toMatchSnapshot();
    });
  });
});
