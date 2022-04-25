import React from 'react';
import { render } from '@testing-library/react';
import { setCookie } from '../util/auth';
import * as mockAuth from '../util/auth';

import DocumentUpload from './DocumentUpload';

// const defaultHandleFileChange = fileUrl => {
//   dispatch({ type: 'update', field: 'fileUrl', payload: fileUrl });
// };

const defaultProps = {
  endpoint: 'placeholder',
  fileTypes: ['.doc', '.docx', '.pdf'],
  handleFileChange: jest.fn()
};

const setup = (props = {}) => {
  render(<DocumentUpload {...defaultProps} {...props} />);
};

describe('the DocumentUpload component', () => {
  beforeEach(() => {
    setCookie(mockAuth);
  });

  it('should upload a file', () => {
    setup();
  });
});
