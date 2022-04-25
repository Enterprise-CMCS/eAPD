import React from 'react';
import {
  // act
  screen
  // within,
  // waitFor
} from 'apd-testing-library';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
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

// USER EVENT .UPLOAD TO UPLOAD!!!!!!

const setup = (props = {}) => {
  render(<DelegateStateAdminForm {...defaultProps} {...props} />);
};

describe('the DelegateStateAdminForm component', () => {
  beforeEach(() => {
    // jest.resetAllMocks();
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
    userEvent.type(
      screen.getByLabelText('State employee email address'),
      defaultProps.email
    );

    userEvent.type(
      screen.getByLabelText('State employee phone number'),
      defaultProps.phone
    );

    userEvent.selectOptions(screen.getByRole('combobox'), 'New Mexico');

    expect(screen.getByRole('radio', { name: 'FFY 2022' })).toBeChecked();

    expect(screen.getByLabelText('State employee email address')).toHaveValue(
      defaultProps.email
    );

    expect(screen.getByLabelText('State employee email address')).toHaveValue(
      defaultProps.email
    );

    expect(
      screen.getByRole('textbox', {
        name: 'Name of State employee to be delegated as eAPD State Adminstrator Cannot be a contractor'
      })
    ).toHaveValue(defaultProps.name);

    expect(screen.getByRole('combobox')).toHaveValue(defaultProps.state);
  });
});
