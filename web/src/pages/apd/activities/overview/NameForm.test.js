import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  waitFor
} from 'apd-testing-library';

import { plain as NameForm } from './NameForm';

const defaultProps = {
  index: 1,
  item: {
    key: 'key 1',
    name: 'Buying bikes for Huey, Dewey, and Louie'
  },
  setName: jest.fn()
};

const setup = async (props = {}) => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  const utils = await act(async () =>
    renderWithConnection(<NameForm {...defaultProps} {...props} />)
  );
  await waitFor(() => screen.findByText(/Activity Name/i));
  return utils;
};

describe('the NameForm component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('it renders correctly', async () => {
    await setup();
    expect(screen.getByLabelText(/Activity name/i)).toHaveValue(
      defaultProps.item.name
    );
  });
});
