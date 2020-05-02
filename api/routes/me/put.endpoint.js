const hash = require('../../auth/passwordHash');
const {
  authenticate,
  getDB,
  unauthenticatedTest
} = require('../../endpoint-tests/utils');

const url = '/me';

const put = data => {
  return authenticate()
    .then(api => api.put(url, data))
    .then(res => res);
};

describe('/me endpoint | PUT', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('put', url);

  describe('when authenticated', () => {
    [
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

        const response = await put(data);

        const afterUser = await db('users')
          .where({ id: 2000 })
          .first();

        expect(afterUser).toMatchObject(beforeUser);
        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });
    });

    it('only updates the fields that were sent in', async () => {
      await db.seed.run();
      const beforeUser = await db('users')
        .where({ id: 2000 })
        .first();

      const response = await put({ position: 'cook' });

      const afterUser = await db('users')
        .where({ id: 2000 })
        .first();

      expect(afterUser).toMatchObject({
        ...beforeUser,
        position: 'cook'
      });
      expect(response.status).toEqual(200);
      expect(response.data).toMatchSnapshot();
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

      const response = await put(changes);

      const afterUser = await db('users')
        .where({ id: 2000 })
        .first();

      // validate that the state_id and auth_role weren't changed
      expect(afterUser).toMatchObject({
        ...beforeUser,
        name: 'Bob Belcher',
        password: expect.stringMatching(/.+/),
        position: 'cook',
        phone: '5554567890'
      });
      expect(hash.compareSync(password, afterUser.password)).toBe(true);
      expect(response.status).toEqual(200);
      expect(response.data).toMatchSnapshot();
    });
  });
});
