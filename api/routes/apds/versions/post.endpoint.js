const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../utils.endpoint');

describe('apd version create endpoint | POST /apds/:id/versions', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = id => getFullPath(`/apds/${id}/versions`);

  unauthenticatedTest('post', url(1));
  unauthorizedTest('post', url(1));

  let jar;
  beforeAll(async () => {
    jar = await login();
  });
  const json = true;

  it('when attempting to save non-draft APD', async () => {
    const { response, body } = await request.post(url(4002), { jar, json });
    const versions = await db('apd_versions').select();

    expect(response.statusCode).toEqual(400);
    expect(body).toMatchSnapshot();
    expect(versions.length).toEqual(0);
  });

  it('when attempting to save a draft APD', async () => {
    const { response, body } = await request.post(url(4000), { jar, json });
    const versions = await db('apd_versions').select();

    expect(response.statusCode).toEqual(204);
    expect(body).toMatchSnapshot();
    expect(versions.length).toEqual(1);
  });
});
