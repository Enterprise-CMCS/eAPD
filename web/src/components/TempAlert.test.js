import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';

import TempAlert from './TempAlert';
import { fireEvent } from '@testing-library/react';

const successMsg =
  'You have successfully created an APD. Select continue to fill out the rest of the APD.';

const successState = {
  alerts: {
    messages: [
      {
        apdId: '1234',
        message: successMsg,
        variation: 'success'
      },
      {
        apdId: '5678',
        message: successMsg,
        variation: 'success'
      }
    ]
  },
  apd: {
    data: {
      id: '1234'
    }
  }
};

const setup = (props = {}, options = {}) => {
  return renderWithConnection(<TempAlert {...props} />, options);
};

describe('temporary alert/message', () => {
  beforeEach(() => {});

  afterAll(() => {});

  test('renders temporary message when apd created', async () => {
    setup(null, { initialState: successState });

    expect(await screen.findByText(successMsg)).toBeTruthy();
    expect(screen.getAllByRole('button').length).toBe(1);
  });

  test('removes message when close button clicked', () => {
    setup(null, { initialState: successState });
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText(successMsg)).toBeFalsy();
  });
});
