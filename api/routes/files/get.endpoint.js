const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest
} = require('../../utils.endpoint');

const url = id => getFullPath(`/files/${id}`);

const get = async id => {
  const jar = await login();
  return request.get(url(id), { jar });
};

describe('files endpoint | GET /files/:fileID', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('get', url(3));

  describe('when authenticated', async () => {
    it('with an invalid ID', async () => {
      const { response, body } = await get('hello');

      expect(response.statusCode).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('with a non-existant file ID', async () => {
      const { response, body } = await get(3);

      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it('with an existant file ID, but file does not exist in the store', async () => {
      const { response, body } = await get(5004);
      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    describe('with an existant file ID, but without access', async () => {
      it('file is attached to inaccessible activity', async () => {
        const { response, body } = await get(5001);

        expect(response.statusCode).toEqual(404);
        expect(body).toMatchSnapshot();
      });

      it('file is attached to inaccessible contractor', async () => {
        const { response, body } = await get(5003);

        expect(response.statusCode).toEqual(404);
        expect(body).toMatchSnapshot();
      });
    });

    describe('with an existant file ID, and with access', async () => {
      it('file is attached to accessible activity', async () => {
        const { response, body } = await get(5000);

        expect(response.statusCode).toEqual(200);
        expect(body).toMatchSnapshot();
      });

      it('file is attached to accessible contractor', async () => {
        const { response, body } = await get(5002);

        expect(response.statusCode).toEqual(200);
        expect(body).toMatchSnapshot();
      });
    });
  });
});
