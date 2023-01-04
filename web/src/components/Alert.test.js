import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';

import Alert from './Alert';

const setup = (props = {}, options = {}) => {
  return renderWithConnection(<Alert {...props} />, options);
};

describe('temporary alert/message', () => {
  beforeEach(() => {});

  afterAll(() => {});

  test('renders temporary message when apd created', async () => {
    const successMsg =
      'You have successfully created an APD. Select continue to fill out the rest of the APD.';

    setup(null, {
      initialState: {
        errors: {
          tempMessages: [
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
