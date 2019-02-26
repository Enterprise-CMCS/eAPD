const bcrypt = require('bcryptjs');
const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest
} = require('../../utils.endpoint');

const url = getFullPath('/me');

const put = async data => {
  const cookies = await login();
  return request.put(url, { jar: cookies, json: data });
};

describe('/me endpoint | PUT', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('put', url);

  describe('when authenticated', () => {
    [
      [
        'rejects when changing email address to something held by another account',
        { email: 'no-permissions' }
      ],
      [
        'rejects when changing password to something insufficiently complex',
        { password: 'abc123' }
      ],
      [
        'rejects when changing phone number to something over 10 digits',
        { phone: '123456789123' }
      ]
    ].forEach(([message, data]) => {
      it(message, async () => {
        const beforeUser = await db('users')
          .where({ id: 2000 })
          .first();

        const {
          response: { statusCode },
          body
        } = await put(data);

        const afterUser = await db('users')
          .where({ id: 2000 })
          .first();

        expect(afterUser).toMatchObject(beforeUser);
        expect(statusCode).toEqual(400);
        expect(body).toMatchSnapshot();
      });
    });

    it('only updates the fields that were sent in', async () => {
      await db.seed.run();
      const beforeUser = await db('users')
        .where({ id: 2000 })
        .first();

      const {
        response: { statusCode },
        body
      } = await put({ email: 'bob@burgers.com', position: 'cook' });

      const afterUser = await db('users')
        .where({ id: 2000 })
        .first();

      expect(afterUser).toMatchObject({
        ...beforeUser,
        email: 'bob@burgers.com',
        position: 'cook'
      });
      expect(statusCode).toEqual(200);
      expect(body).toMatchSnapshot();
    });

    it('does not update uneditable fields', async () => {
      await db.seed.run();
      const beforeUser = await db('users')
        .where({ id: 2000 })
        .first();

      const password = 'ASHae5u#&#%&ejswhar';
      const changes = {
        email: 'bob@burgers.com',
        name: 'Bob Belcher',
        password,
        position: 'cook',
        phone: '555-456-7890',
        state: 'ia',
        state_id: 'md',
        role: 'admin',
        auth_role: 'admin'
      };

      const {
        response: { statusCode },
        body
      } = await put(changes);

      const afterUser = await db('users')
        .where({ id: 2000 })
        .first();

      // validate that the state_id and auth_role weren't changed
      expect(afterUser).toMatchObject({
        ...beforeUser,
        email: 'bob@burgers.com',
        name: 'Bob Belcher',
        password: expect.stringMatching(/.+/),
        position: 'cook',
        phone: '5554567890'
      });
      expect(bcrypt.compareSync(password, afterUser.password)).toBe(true);
      expect(statusCode).toEqual(200);
      expect(body).toMatchSnapshot();
    });
  });
});
