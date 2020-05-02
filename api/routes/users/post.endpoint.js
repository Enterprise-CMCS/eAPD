const {
  authenticate,
  getDB,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

const newUsersInTheDatabase = async () => {
  // Get all users other than the originals.  User IDs 2000,
  // 2001, and 2010 are created when the database is seeded.
  const db = getDB();
  const users = (await db('users').select('*')).filter(
    user => ![2000, 2001, 2010].includes(user.id)
  );
  await db.destroy();

  return users.length ? users : false;
};

const url = '/users';

describe('users endpoint | POST /users', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('post', url);
  unauthorizedTest('post', url);

  const invalidCases = [
    {
      name: 'with no body'
    },
    {
      name: 'with an invalid body',
      data: { hello: 'world' }
    },
    {
      name: 'with an email but no password',
      data: { email: 'newuser@email.com' }
    },
    {
      name: 'with a password but no email',
      data: { password: 'newpassword' }
    }
  ];

  describe('when authenticated', () => {
    invalidCases.forEach(situation => {
      it(situation.name, async () => {
        const response = await authenticate()
          .then(api => api.post(url, situation.data))
          .then(res => res);

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
        const newUsers = await newUsersInTheDatabase();
        expect(newUsers).toBeFalsy();
      });
    });

    it('with existing email address', async () => {
      const response = await authenticate()
        .then(api =>
          api.post(url, {
            email: 'all-permissions-and-state',
            password: 'anything'
          })
        )
        .then(res => res);

      expect(response.status).toEqual(400);
      expect(response.data).toMatchSnapshot();
      const newUsers = await newUsersInTheDatabase();
      expect(newUsers).toBeFalsy();
    });

    it('with existing email address but different capitalization', async () => {
      const response = await authenticate()
        .then(api =>
          api.post(url, {
            email: 'All-Permissions-And-State',
            password: 'anything'
          })
        )
        .then(res => res);

      expect(response.status).toEqual(400);
      expect(response.data).toMatchSnapshot();
      const newUsers = await newUsersInTheDatabase();
      expect(newUsers).toBeFalsy();
    });

    it('with a weak password', async () => {
      const response = await authenticate()
        .then(api =>
          api.post(url, {
            email: 'weakuser@email.com',
            password: 'Newp@ssw0rd!'
          })
        )
        .then(res => res);

      expect(response.status).toEqual(400);
      expect(response.data).toMatchSnapshot();
      const newUsers = await newUsersInTheDatabase();
      expect(newUsers).toBeFalsy();
    });

    it('with a valid new user', async () => {
      const response = await authenticate()
        .then(api =>
          api.post(url, {
            email: 'newuser@email.com',
            password: 'Q%&jsruW$%Jaej'
          })
        )
        .then(res => res);

      expect(response.status).toEqual(200);
      expect(response.data).toMatchSnapshot();
      const newUsers = await newUsersInTheDatabase();
      expect(newUsers.length).toEqual(1);
    });
  });
});
