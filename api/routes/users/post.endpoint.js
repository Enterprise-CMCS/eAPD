const {
  getDB,
  request,
  getFullPath,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils.endpoint');

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

describe('users endpoint | POST /users', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = getFullPath('/users');

  unauthenticatedTest('post', url);
  unauthorizedTest('post', url);

  const invalidCases = [
    {
      name: 'with no body'
    },
    {
      name: 'with an invalid body',
      body: { hello: 'world' }
    },
    {
      name: 'with an email but no password',
      body: { email: 'newuser@email.com' }
    },
    {
      name: 'with a password but no email',
      body: { password: 'newpassword' }
    }
  ];

  describe('when authenticated', async () => {
    let cookies;
    beforeAll(async () => {
      cookies = await login();
    });

    invalidCases.forEach(situation => {
      it(situation.name, async () => {
        const { response, body } = await request.post(url, {
          jar: cookies,
          json: situation.body || true
        });
        expect(response.statusCode).toEqual(400);
        expect(body).toMatchSnapshot();
        const newUsers = await newUsersInTheDatabase();
        expect(newUsers).toBeFalsy();
      });
    });

    it('with existing email address', async () => {
      const { response, body } = await request.post(url, {
        jar: cookies,
        json: { email: 'all-permissions-and-state', password: 'anything' }
      });
      expect(response.statusCode).toEqual(400);
      expect(body).toMatchSnapshot();
      const newUsers = await newUsersInTheDatabase();
      expect(newUsers).toBeFalsy();
    });

    it('with a weak password', async () => {
      const { response, body } = await request.post(url, {
        jar: cookies,
        json: { email: 'weakuser@email.com', password: 'Newp@ssw0rd!' }
      });

      expect(response.statusCode).toEqual(400);
      expect(body).toMatchSnapshot();
      const newUsers = await newUsersInTheDatabase();
      expect(newUsers).toBeFalsy();
    });

    it('with a valid new user', async () => {
      const { response, body } = await request.post(url, {
        jar: cookies,
        json: { email: 'newuser@email.com', password: 'Q%&jsruW$%Jaej' }
      });

      expect(response.statusCode).toEqual(200);
      expect(body).toMatchSnapshot();
      const newUsers = await newUsersInTheDatabase();
      expect(newUsers.length).toEqual(1);
    });
  });
});
