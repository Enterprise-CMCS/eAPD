const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest
} = require('../../utils.endpoint');

const { invalid: invalidData } = require('../../test-data/state');

describe('states endpoint | PUT /states', async () => {
  const url = getFullPath('/states');

  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('put', url);

  it('when authenticated as a user without an associated state', async () => {
    const cookies = await login('all-permissions-no-state', 'password');
    const { response: { statusCode }, body } = await request.put(url, {
      jar: cookies,
      json: true
    });

    expect(statusCode).toEqual(401);
    expect(body).toMatchSnapshot();
  });

  describe('when authenticated as a user with an associated state', async () => {
    let cookies;
    beforeAll(async () => {
      cookies = await login();
    });

    invalidData.forEach(scenario => {
      it(scenario.name, async () => {
        const { response: { statusCode }, body } = await request.put(url, {
          jar: cookies,
          json: scenario.body
        });

        expect(statusCode).toEqual(400);
        expect(body).toMatchSnapshot();
      });
    });

    it('with a valid update', async () => {
      const { response: { statusCode }, body } = await request.put(url, {
        jar: cookies,
        json: { program_benefits: 'new program benefits' }
      });

      expect(statusCode).toEqual(200);
      expect(body).toMatchSnapshot();
    });
  });
});
