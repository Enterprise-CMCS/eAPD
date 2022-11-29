import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} from '../../endpoint-tests/utils.js';
import { mnAPDId, akAPDId, badAPDId } from '../../seeds/test/apds.js';

describe('APD endpoint | PATCH /apds/:id', () => {
  const db = getDB();
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  const url = apdID => `/apds/${apdID}`;

  unauthenticatedTest('patch', url(1));
  unauthorizedTest('patch', url(1));

  describe('when authenticated as a user with permission', () => {
    let api;
    beforeAll(() => {
      api = login('state-admin');
    });

    it('with a non-existant apd ID', async () => {
      const response = await api.patch(url(badAPDId));

      expect(response.status).toEqual(404);
      expect(response.data).toMatchSnapshot();
    });

    it(`with an APD in a state other than the user's state`, async () => {
      const response = await api.patch(url(mnAPDId));

      expect(response.status).toEqual(403);
      expect(response.data).toMatchSnapshot();
    });

    it(`with a body that is not valid`, async () => {
      const data = 'update something';

      const response = await api.patch(url(akAPDId), data);

      expect(response.status).toEqual(400);
      expect(response.data.errors).not.toBeNull();
      expect(response.data).toMatchSnapshot();
    });

    it(`with a patch that creates an invalid APD`, async () => {
      const data = [
        {
          op: 'replace',
          path: '/activities/0/schedule/0/endDate',
          value: '2022-13-12'
        }
      ];

      const response = await api.patch(url(akAPDId), data);

      expect(response.status).toEqual(200);
      expect(response.data).toMatchSnapshot({
        apd: {
          updated: expect.stringMatching(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
          ),
          activities: expect.any(Array),
          budget: expect.any(Object)
        }
      });
    });

    it('with a valid patch that also attempts to update a readonly property', async () => {
      const data = [
        {
          op: 'replace',
          path: '/keyStatePersonnel/medicaidDirector/name',
          value: 'Bob the Builder'
        },
        { op: 'replace', path: '/name', value: 'new APD name' },
        {
          op: 'replace',
          path: '/activities/0/costAllocation/2022/ffp/federal',
          value: 75
        }
      ];

      const response = await api.patch(url(akAPDId), data);

      // The updated date is the date/time stamp of when the APD is saved, so
      // it'll change with each test run.  Rather than figure out something
      // fancy with the snapshots, just pull out the date and test it with a
      // regex.
      expect(response.status).toEqual(200);
      expect(response.data).toMatchSnapshot({
        apd: {
          updated: expect.stringMatching(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
          ),
          activities: expect.any(Array),
          budget: expect.any(Object)
        }
      });
    });

    it(`patch succeeds with an invalid date`, async () => {
      const data = [
        {
          op: 'replace',
          path: `/activities/0/plannedStartDate`,
          value: '9999-99-99'
        },
        {
          op: 'replace',
          path: '/keyStatePersonnel/keyPersonnel/2',
          value: {
            costs: { 2022: 50, 2023: 45 },
            email: 'test@email.com',
            expanded: true,
            hasCosts: true,
            isPrimary: false,
            fte: { 2022: 0.75, 2023: 1 },
            name: 'Test User',
            position: 'Tester',
            key: '1a1abbbb'
          }
        }
      ];

      const response = await api.patch(url(akAPDId), data);

      // The updated date is the date/time stamp of when the APD is saved, so
      // it'll change with each test run.  Rather than figure out something
      // fancy with the snapshots, just pull out the date and test it with a
      // regex.
      expect(response.status).toEqual(200);
      expect(response.data).toMatchSnapshot({
        apd: {
          updated: expect.stringMatching(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
          ),
          activities: expect.any(Array),
          budget: expect.any(Object)
        }
      });
    });

    it('prevents a dangerous value from being stored', async () => {
      const data = [
        {
          op: 'replace',
          path: `/apdOverview/programOverview`,
          value:
            '<svg><a xlink:href="javascript:alert(document.domain)"><text x="20" y="20">XSS</text></a>'
        }
      ];

      const response = await api.patch(url(akAPDId), data);
      const { apd: { apdOverview: { programOverview } } = {} } = response.data;

      expect(response.status).toEqual(200);
      expect(programOverview).toEqual('<a>XSS</a>');
    });

    it('with a valid patch that also attempts to update a readonly property', async () => {
      const data = [
        {
          op: 'replace',
          path: '/keyStatePersonnel/medicaidDirector/name',
          value: 'Bob the Builder'
        },
        { op: 'replace', path: '/status', value: 'submitted' },
        {
          op: 'replace',
          path: '/activities/1/costAllocation/2022/ffp/federal',
          value: 80
        }
      ];

      const response = await api.patch(url(akAPDId), data);

      // The updated date is the date/time stamp of when the APD is saved, so
      // it'll change with each test run.  Rather than figure out something
      // fancy with the snapshots, just pull out the date and test it with a
      // regex.

      expect(response.status).toEqual(200);
      expect(response.data.apd.status).toEqual('draft');
      expect(response.data).toMatchSnapshot({
        apd: {
          updated: expect.stringMatching(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
          ),
          activities: expect.any(Array),
          budget: expect.any(Object)
        }
      });
    });
  });
});
