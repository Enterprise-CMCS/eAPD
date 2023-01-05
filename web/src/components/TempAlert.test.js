import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';

import TempAlert from './TempAlert';

const setup = (props = {}, options = {}) => {
  return renderWithConnection(<TempAlert {...props} />, options);
};

describe('temporary alert/message', () => {
  beforeEach(() => {});

  afterAll(() => {});

  test('renders temporary message when apd created', async () => {
    const successMsg =
      'You have successfully created an APD. Select continue to fill out the rest of the APD.';

    setup(null, {
      initialState: {
        alerts: {
          messages: [
            {
              message: successMsg,
              variation: 'success'
            }
          ]
        }
      }
    });

    expect(await screen.findByText(successMsg)).toBeTruthy();
  });
});
