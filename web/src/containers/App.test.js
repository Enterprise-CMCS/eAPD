import { renderWithConnection } from '../shared/apd-testing-library';
import React from 'react';

import App from './App';

describe('App component', () => {
  test('renders correctly', () => {
    const utils = renderWithConnection(<App />, {
      initialState: {
        user: {
          data: {
            username: 'test'
          }
        }
      }
    });
    expect(utils.container).toMatchSnapshot();
  });
});
