import fs from 'fs';
import FormData from 'form-data';
import {
  buildForm,
  login,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../../endpoint-tests/utils.js';

describe('auth/certifications/files endpoints', () => {
  describe('Upload a state certification letter/file | POST /auth/certifications/files', () => {
    const form = buildForm({ file: 'this is my file' });
    const url = '/auth/certifications/files';

    unauthenticatedTest('post', url);
    unauthorizedTest('post', url);

    describe('when authenticated as a user with permission', () => {
      let api;
      beforeAll(() => {
        api = login();
      });

      it('with a non-existant apd ID', async () => {
        const response = await api.post(url, form);

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });

      it('with an invalid request (txt file)', async () => {
        const textPath = `${process.cwd()}/test-data/files/upload.txt`;
        expect(fs.existsSync(textPath)).toBeTruthy();

        const formData = new FormData();
        formData.append('file', fs.readFileSync(textPath), 'upload.txt');
        const options = {
          headers: {
            ...formData.getHeaders()
          }
        };

        api.post(url, formData.getBuffer(), options).catch(e => {
          expect(e.response.status).toEqual(415);
          expect(e.response.data).toMatchSnapshot();
        });
      });

      it('with an invalid request (jpg)', async () => {
        const imagePath = `${process.cwd()}/test-data/files/eAPD_logo.jpg`;
        expect(fs.existsSync(imagePath)).toBeTruthy();

        const formData = new FormData();
        formData.append('file', fs.readFileSync(imagePath), 'eAPD_logo.jpg');
        const options = {
          headers: {
            ...formData.getHeaders()
          }
        };

        const response = await api.post(url, formData.getBuffer(), options);

        expect(response.status).toEqual(415);
        expect(response.data).toMatchSnapshot();
      });

      it('with a valid pdf', async () => {
        const pdfPath = `${process.cwd()}/test-data/files/eAPD_logo.pdf`;
        expect(fs.existsSync(pdfPath)).toBeTruthy();

        const formData = new FormData();
        formData.append('file', fs.readFileSync(pdfPath), 'eAPD_logo.pdf');
        const options = {
          headers: {
            ...formData.getHeaders()
          }
        };

        const response = await api.post(url, formData.getBuffer(), options);

        expect(response.status).toEqual(200);
        expect(response.data).toMatchSnapshot();
      });
    });
  });
});
