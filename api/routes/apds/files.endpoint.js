const fs = require('fs');
const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils.endpoint');

describe('APD files endpoints', () => {
  describe('Get a file associated with an APD | GET /apds/:id/files/:fileID', () => {
    const db = getDB();
    beforeAll(() => db.seed.run());
    afterAll(() => db.destroy());

    const url = (apdID, fileID) =>
      getFullPath(`/apds/${apdID}/files/${fileID}`);

    unauthenticatedTest('get', url(0, 0));
    unauthorizedTest('get', url(0, 0));

    describe('when authenticated as a user with permission', () => {
      let cookies;
      beforeAll(async () => {
        cookies = await login();
      });

      it('with a non-existant apd ID', async () => {
        const { response, body } = await request.get(
          url(9000, '74aa0d06-ae6f-472f-8999-6ca0487c494f'),
          { jar: cookies }
        );

        expect(response.statusCode).toEqual(404);
        expect(body).toMatchSnapshot();
      });

      it(`with an APD in a state other than the user's state`, async () => {
        const { response, body } = await request.get(
          url(4001, '74aa0d06-ae6f-472f-8999-6ca0487c494f'),
          { jar: cookies }
        );

        expect(response.statusCode).toEqual(404);
        expect(body).toMatchSnapshot();
      });

      it('with an APD that is not associated with the file', async () => {
        const { response, body } = await request.get(
          url(4002, '74aa0d06-ae6f-472f-8999-6ca0487c494f'),
          { jar: cookies }
        );

        expect(response.statusCode).toEqual(404);
        expect(body).toMatchSnapshot();
      });

      it('with a valid request', async () => {
        const { response, body } = await request.get(
          url(4000, '74aa0d06-ae6f-472f-8999-6ca0487c494f'),
          { jar: cookies }
        );

        expect(response.statusCode).toEqual(200);
        expect(body).toMatchSnapshot();
      });
    });
  });

  describe('Upload a file associated with an APD | POST /apds/:id/files', () => {
    const db = getDB();
    beforeAll(() => db.seed.run());
    afterAll(() => db.destroy());

    const url = id => getFullPath(`/apds/${id}/files`);

    unauthenticatedTest('post', url(0));
    unauthorizedTest('post', url(0));

    describe('when authenticated as a user with permission', () => {
      let cookies;
      beforeAll(async () => {
        cookies = await login();
      });

      it('with a non-existant apd ID', async () => {
        const { response, body } = await request.post(url(9000), {
          jar: cookies,
          formData: { file: 'this is my new file' }
        });

        expect(response.statusCode).toEqual(404);
        expect(body).toMatchSnapshot();
      });

      it(`with an APD in a state other than the user's state`, async () => {
        const { response, body } = await request.post(url(4001), {
          jar: cookies,
          formData: { file: 'this is my new file' }
        });

        expect(response.statusCode).toEqual(404);
        expect(body).toMatchSnapshot();
      });

      it('with an APD that is not in draft', async () => {
        const { response, body } = await request.post(url(4002), {
          jar: cookies,
          formData: { file: 'this is my new file' }
        });

        expect(response.statusCode).toEqual(400);
        expect(body).toMatchSnapshot();
      });

      it('with a valid request', async () => {
        const { response, body } = await request.post(url(4000), {
          jar: cookies,
          json: true,
          formData: {
            file: {
              value: Buffer.from('this is my new file'),
              options: {
                filename: 'upload.txt',
                contentType: 'application/octet-stream'
              }
            }
          }
        });

        expect(response.statusCode).toEqual(200);

        expect(body.url).toEqual(
          expect.stringMatching(/apds\/4000\/files\/[a-f0-9]{64}/)
        );

        const filename = body.url.match(/apds\/4000\/files\/([a-f0-9]{64})/)[1];
        expect(fs.existsSync(`test-data/files/${filename}`)).toEqual(true);
      });
    });
  });
});
