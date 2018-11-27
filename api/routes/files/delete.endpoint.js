const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest
} = require('../../utils.endpoint');

const url = (contractorID, fileID) =>
  getFullPath(`/files/contractor/${contractorID}/${fileID}`);

const del = async (contractorID, fileID) => {
  const jar = await login();
  return request.delete(url(contractorID, fileID), { jar });
};

describe('files endpoint | DELETE /files/contractor/:contractorID/:fileID', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('delete', url(3, 3));

  describe('when authenticated', async () => {
    it('with an invalid contractor ID', async () => {
      const { response, body } = await del(9000, 'whatever');

      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it('with a contractor ID in an APD the user cannot access', async () => {
      const { response, body } = await del(9900, 'whatever');

      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it('valid contractor ID', async () => {
      const { response, body } = await del(4300, 5002);

      expect(response.statusCode).toEqual(204);
      expect(body).toMatchSnapshot();
    });
  });
});
