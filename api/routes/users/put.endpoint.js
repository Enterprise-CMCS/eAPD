const {
  getDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

const url = userID => `/users/${userID}`;

describe('users endpoint | PUT /users/:userID', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('put', url(0));
  unauthorizedTest('put', url(0));

  describe('when authenticated', () => {
    const put = (id, data) => login().then(api => api.put(url(id), data));

    it('when sending a non-numeric ID', async () => {
      const response = await put('abc');

      expect(response.status).toEqual(400);
      expect(response.data).toMatchSnapshot();
    });

    it('when updating a non-existant user ID', async () => {
      const response = await put(0);

      expect(response.status).toEqual(404);
      expect(response.data).toMatchSnapshot();
    });

    describe('when updating a valid user ID', () => {
      it('...with an invalid state ID', async () => {
        const response = await put(2001, { state: 'xx' });

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });

      it('...with an invalid role name', async () => {
        const response = await put(2001, { role: 'fakey-fakey' });

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });

      it('...with an existing email address', async () => {
        const response = await put(2001, { username: 'no-permissions' });

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });

      it('...with a simple password', async () => {
        const response = await put(2001, { password: 'simple' });

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });

      it('...with no content', async () => {
        const response = await put(2001);

        expect(response.status).toEqual(204);
        expect(response.data).toMatchSnapshot();
      });

      // This makes sure the duplicate-email check doesn't flag accounts that
      // are keeping their email address the same.
      // https://github.com/CMSgov/eAPD/issues/1973
      it('...with new content but same email address', async () => {
        const { password: oldPasswordHash } = await db('users')
          .where({ id: 2001 })
          .first();

        const response = await put(2001, {
          username: 'all-permissions-no-state',
          name: 'test name',
          phone: '123',
          position: 'test position',
          state: 'hi',
          role: 'state coordinator',
          useless: 'is discarded'
        });

        expect(response.status).toEqual(204);
        expect(response.data).toMatchSnapshot();

        const user = await db('users')
          .where({ id: 2001 })
          .first();

        expect(user).toMatchObject({
          auth_role: 'state coordinator',
          email: 'all-permissions-no-state',
          name: 'test name',
          password: oldPasswordHash,
          phone: '123',
          position: 'test position',
          state_id: 'hi'
        });
      });

      it('...with all new content, plus some junk', async () => {
        const { password: oldPasswordHash } = await db('users')
          .where({ id: 2001 })
          .first();

        const response = await put(2001, {
          username: 'test email',
          junk: 'gets ignored',
          name: 'test name',
          password: '$Q^ki$^jw^KW%Kw46rtJSFGJ',
          phone: '123',
          position: 'test position',
          state: 'hi',
          role: 'state coordinator',
          useless: 'is discarded'
        });

        expect(response.status).toEqual(204);
        expect(response.data).toMatchSnapshot();

        const user = await db('users')
          .where({ id: 2001 })
          .first();

        expect(user).toMatchObject({
          auth_role: 'state coordinator',
          email: 'test email',
          name: 'test name',
          password: expect.stringMatching(/.+/),
          phone: '123',
          position: 'test position',
          state_id: 'hi'
        });
        expect(user.password).not.toEqual(oldPasswordHash);
      });

      it('...when updating self with all new content, role is ignored', async () => {
        const { password: oldPasswordHash } = await db('users')
          .where({ id: 2000 })
          .first();

        const response = await put(2000, {
          username: 'own email',
          name: 'test name',
          phone: '123',
          position: 'test position',
          state: 'hi',
          role: 'state SME'
        });

        expect(response.status).toEqual(204);
        expect(response.data).toMatchSnapshot();

        const user = await db('users')
          .where({ id: 2000 })
          .first();

        expect(user).toMatchObject({
          auth_role: 'admin',
          email: 'own email',
          name: 'test name',
          password: expect.stringMatching(/.+/),
          phone: '123',
          position: 'test position',
          state_id: 'hi'
        });
        expect(user.password).toEqual(oldPasswordHash);
      });
    });
  });
});
