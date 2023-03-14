import {
  getDB,
  setupDB,
  teardownDB,
  apiAsFedAdmin,
  apiAsStateAdmin,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../endpoint-tests/utils.js';
import { getAllActiveRoles } from '../../../db/roles.js';

describe('Affiliations endpoint | PATCH', () => {
  const db = getDB();
  const api = apiAsStateAdmin;
  let stateStaffId = 0;
  beforeAll(async () => {
    await setupDB(db);
    const [{ id }] = await getAllActiveRoles(['eAPD State Staff'], { db });
    stateStaffId = id;
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  const url = (stateId, affiliationId) =>
    `/states/${stateId}/affiliations/${affiliationId}`;

  unauthenticatedTest('patch', url('ak', 4000));
  unauthorizedTest('patch', url('ak', 4000));

  describe('when authenticated', () => {
    ['approved', 'denied', 'revoked'].forEach(status => {
      it(`returns 200, when an affiliation is ${status}`, async () => {
        const response = await api.patch(url('ak', 4000), {
          status,
          roleId: stateStaffId
        });
        expect(response.status).toEqual(200);
      });
    });

    it('returns 400 when US state is incorrect for a fed admin', async () => {
      const response = await apiAsFedAdmin.patch(url('zz', 4000));
      expect(response.status).toEqual(400);
    });

    it('returns 403 when US state is not authorized', async () => {
      // This user does not have state zz in scope and is not a fed admin
      // validForState middleware should reject the request
      const response = await api.patch(url('zz', 4000));
      expect(response.status).toEqual(403);
    });

    it('returns 400 when affiliation id is invalid', async () => {
      const response = await api.patch(url('ak', 'NaN'));
      expect(response.status).toEqual(400);
    });

    it('returns 400 when status is invalid', async () => {
      const response = await api.patch(url('ak', 4000), {
        status: 'blarg',
        roleId: stateStaffId
      });
      expect(response.status).toEqual(400);
    });

    it('returns 400 when body is invalid', async () => {
      const response = await api.patch(url('ak', 4000), {
        status: undefined,
        roleId: undefined
      });
      expect(response.status).toEqual(400);
    });

    it(`returns 403, when user tries to change their status`, async () => {
      const response = await api.patch(url('ak', 4004), {
        status: 'approved',
        roleId: stateStaffId
      });
      expect(response.status).toEqual(400);
    });

    it(`returns 403, when user tries to change for a state they are not authorized for`, async () => {
      const response = await api.patch(url('az', 4020), {
        status: 'approved',
        roleId: stateStaffId
      });
      expect(response.status).toEqual(403);
    });
  });
});
