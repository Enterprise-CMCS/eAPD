import React from 'react';
import { screen } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';
import { setCookie } from '../../../util/auth';
import * as mockAuth from '../../../util/auth';
import axios from '../../../util/api';
import MockAdapter from 'axios-mock-adapter';

import { plain as DelegateStateAdminForm } from './DelegateStateAdminForm';

const defaultProps = {
  ffy: '2023',
  name: 'Walter White',
  email: 'walter@white.com',
  phone: '987-654-3210',
  state: 'nm',
  fileUrl: ''
};

const setup = (props = {}, options = {}) => {
  const utils = render(
    <DelegateStateAdminForm {...defaultProps} {...props} />,
    options
  );
  const user = userEvent.setup();
  return {
    utils,
    user
  };
};

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

describe('the DelegateStateAdminForm component', () => {
  beforeEach(() => {
    setCookie(mockAuth);
  });

  test('handles entering data', async () => {
    const { user } = setup();
    fetchMock.onPost('/auth/certifications').reply(200);

    await user.click(screen.getByRole('radio', { name: 'FFY 2023' }));

    expect(screen.getByRole('radio', { name: 'FFY 2023' })).toBeChecked();

    expect(
      screen.getByRole('textbox', {
        name: 'Name of State employee to be delegated as eAPD State Adminstrator Cannot be a contractor'
      })
    ).toHaveValue(defaultProps.name);

    expect(screen.getByLabelText('State')).toHaveValue(defaultProps.state);

    expect(screen.getByLabelText('State employee email address')).toHaveValue(
      defaultProps.email
    );

    expect(screen.getByLabelText('State employee phone number')).toHaveValue(
      defaultProps.phone
    );

    const file = new File(['hello'], 'hello.pdf', { type: 'pdf' });
    const upload = screen.getByRole('button', {
      name: 'Drag files here or choose from folder'
    });

    fireEvent.drop(upload, {
      dataTransfer: {
        files: [file]
      }
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Add State Admin Letter' })
    );
  });
});
