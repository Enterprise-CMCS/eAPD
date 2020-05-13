const fs = require('fs');
const FormData = require('form-data');
const {
  buildForm,
  getDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

describe('APD files endpoints', () => {
  describe('Get a file associated with an APD | GET /apds/:id/files/:fileID', () => {
    const db = getDB();
    beforeAll(() => db.seed.run());
    afterAll(() => db.destroy());

    const url = (apdID, fileID) => `/apds/${apdID}/files/${fileID}`;

    unauthenticatedTest('get', url(0, 0));
    unauthorizedTest('get', url(0, 0));

    describe('when authenticated as a user with permission', () => {
      let api;

      beforeAll(async () => {
        api = await login();
      });

      it('with a non-existant apd ID', async () => {
        const response = await api
          .get(url(9000, '74aa0d06-ae6f-472f-8999-6ca0487c494f'));

        expect(response.status).toEqual(404);
        expect(response.data).toMatchSnapshot();
      });

      it(`with an APD in a state other than the user's state`, async () => {
        const response = await api
          .get(url(4001, '74aa0d06-ae6f-472f-8999-6ca0487c494f'));

        expect(response.status).toEqual(404);
        expect(response.data).toMatchSnapshot();
      });

      it('with an APD that is not associated with the file', async () => {
        const response = await api
          .get(url(4002, '74aa0d06-ae6f-472f-8999-6ca0487c494f'));

        expect(response.status).toEqual(404);
        expect(response.data).toMatchSnapshot();
      });

      it('with a valid request', async () => {
        const response = await api
          .get(url(4000, '74aa0d06-ae6f-472f-8999-6ca0487c494f'));

        expect(response.status).toEqual(200);
        expect(response.data).toMatchSnapshot();
      });
    });
  });

  describe('Upload a file associated with an APD | POST /apds/:id/files', () => {
    const db = getDB();
    beforeAll(() => db.seed.run());
    afterAll(() => db.destroy());

    const url = id => `/apds/${id}/files`;
    const form = buildForm({ file: 'this is my new file' });

    unauthenticatedTest('post', url(0));
    unauthorizedTest('post', url(0));

    describe('when authenticated as a user with permission', () => {
      let api;
      beforeAll(async () => {
        api = await login();
      });

      it('with a non-existant apd ID', async () => {
        const response = await api.post(url(9000), form);

        expect(response.status).toEqual(404);
        expect(response.data).toMatchSnapshot();
      });

      it(`with an APD in a state other than the user's state`, async () => {
        const response = await api.post(url(4001), form);

        expect(response.status).toEqual(404);
        expect(response.data).toMatchSnapshot();
      });

      it('with an APD that is not in draft', async () => {
        const response = await api.post(url(4002), form);

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });

      it('with a valid request', async () => {
        const filePath = `${process.cwd()}/test-data/files/upload.txt`;
        expect(fs.existsSync(filePath)).toBeTruthy();

        const formData = new FormData();
        formData.append('file', fs.readFileSync(filePath), 'upload.txt');
        const options = {
          headers: {
            ...formData.getHeaders()
          }
        };

        const response = await api
          .post(url(4000), formData.getBuffer(), options);

        expect(response.status).toEqual(200);

        expect(response.data.url).toEqual(
          expect.stringMatching(/apds\/4000\/files\/[a-f0-9]{64}/)
        );

        const filename = response.data.url.match(
          /apds\/4000\/files\/([a-f0-9]{64})/
        )[1];
        expect(fs.existsSync(`test-data/files/${filename}`)).toEqual(true);
      });
    });
  });
});
