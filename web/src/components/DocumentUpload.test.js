import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { setCookie } from '../util/auth';
import * as mockAuth from '../util/auth';
import { screen } from 'apd-testing-library';

import DocumentUpload from './DocumentUpload';

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

    const file = new File(['hello'], 'hello.doc', { type: 'doc' });
    const upload = screen.getByRole('button', {
      name: 'Drag files here or choose from folder'
    });

    fireEvent.drop(upload, {
      dataTransfer: {
        files: [file]
      }
    });
  });
});
