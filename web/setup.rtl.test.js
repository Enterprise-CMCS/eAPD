// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import '@testing-library/jest-dom/extend-expect';

jest.mock('./src/file-loader', () => ({
  importFiles: () => {
    return 'file-path-mock';
  }
}));
