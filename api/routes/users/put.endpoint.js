const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils.endpoint');

const url = userID => getFullPath(`/users/${userID}`);

describe('users endpoint | PUT /users/:userID', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('put', url(0));
  unauthorizedTest('put', url(0));

  describe('when authenticated', async () => {
    let cookies;
    beforeAll(async () => {
      cookies = await login();
    });
    const put = (id, body) =>
      request.put(url(id), {
        jar: cookies,
        json: body
      });

    it('when sending a non-numeric ID', async () => {
      const { response, body } = await put('abc');

      expect(response.statusCode).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('when updating a non-existant user ID', async () => {
      const { response, body } = await put(0);

      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    describe('when updating a valid user ID', async () => {
      it('...with an invalid state ID', async () => {
        const { response, body } = await put(2001, { state: 'xx' });

        expect(response.statusCode).toEqual(400);
        expect(body).toMatchSnapshot();
      });

      it('...with an invalid role name', async () => {
        const { response, body } = await put(2001, { role: 'fakey-fakey' });

        expect(response.statusCode).toEqual(400);
        expect(body).toMatchSnapshot();
      });

      it('...with an existing email address', async () => {
        const { response, body } = await put(2001, { email: 'no-permissions' });

        expect(response.statusCode).toEqual(400);
        expect(body).toMatchSnapshot();
      });

      it('...with no content', async () => {
        const { response, body } = await put(2001);

        expect(response.statusCode).toEqual(204);
        expect(body).toMatchSnapshot();
      });

      it('...with all new content, plus some junk', async () => {
        const {
          response: { statusCode },
          body
        } = await put(2001, {
          email: 'test email',
          junk: 'gets ignored',
          name: 'test name',
          phone: '123',
          position: 'test position',
          state: 'hi',
          role: 'state SME',
          useless: 'is discarded'
        });

        expect(statusCode).toEqual(204);
        expect(body).toMatchSnapshot();

        const user = await db('users')
          .where({ id: 2001 })
          .first();

        expect(user).toMatchObject({
          auth_role: 'state SME',
          email: 'test email',
          name: 'test name',
          password: expect.stringMatching(/.+/),
          phone: '123',
          position: 'test position',
          state_id: 'hi'
        });
      });

      it('...when updating self with all new content, role is ignored', async () => {
        const {
          response: { statusCode },
          body
        } = await put(2000, {
          email: 'own email',
          name: 'test name',
          phone: '123',
          position: 'test position',
          state: 'hi',
          role: 'state SME'
        });

        expect(statusCode).toEqual(204);
        expect(body).toMatchSnapshot();

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
      });
    });
  });
});
