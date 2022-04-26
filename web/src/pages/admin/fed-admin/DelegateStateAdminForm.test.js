import React from 'react';
import { screen } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';
import { setCookie } from '../../../util/auth';
import * as mockAuth from '../../../util/auth';

import DelegateStateAdminForm from './DelegateStateAdminForm';

const defaultProps = {
  ffy: 2022,
  name: 'Walter White',
  email: 'walter@white.com',
  phone: '9876543210',
  state: 'nm',
  fileUrl: ''
};

const setup = (props = {}) => {
  render(<DelegateStateAdminForm {...defaultProps} {...props} />);
};

describe('the DelegateStateAdminForm component', () => {
  beforeEach(() => {
    setCookie(mockAuth);
  });

  test('handles entering data', async () => {
    setup();
    userEvent.click(screen.getByRole('radio', { name: 'FFY 2022' }));

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'Name of State employee to be delegated as eAPD State Adminstrator Cannot be a contractor'
      }),
      defaultProps.name
    );

    userEvent.selectOptions(screen.getByLabelText('State'), 'New Mexico');

    userEvent.type(
      screen.getByLabelText('State employee email address'),
      defaultProps.email
    );

    userEvent.type(
      screen.getByLabelText('State employee phone number'),
      defaultProps.phone
    );

    expect(screen.getByRole('radio', { name: 'FFY 2022' })).toBeChecked();

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
