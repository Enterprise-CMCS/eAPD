const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../utils.endpoint');

const url = id => getFullPath(`/apds/${id}/versions`);

describe('apd version withdraw endpoint | DELETE /apds/:id/versions', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('delete', url(1));
  unauthorizedTest('delete', url(1));

  it('when attempting to withdraw an APD', async () => {
    const jar = await login();
    const json = true;

    // Change the APD's status before attempting to withdraw
    // so we can make sure it is changed back.
    await db('apds')
      .where({ id: 4000 })
      .update({ status: 'not draft' });

    const { response, body } = await request.delete(url(4000), { jar, json });
    const apd = await db('apds')
      .where({ id: 4000 })
      .select();

    expect(response.statusCode).toEqual(204);
    expect(body).toMatchSnapshot();
    expect(apd[0].status).toEqual('draft');
  });
});
