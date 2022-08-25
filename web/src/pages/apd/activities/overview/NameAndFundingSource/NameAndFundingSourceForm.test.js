import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  waitFor
} from 'apd-testing-library';

import { plain as NameAndFundingSourceForm } from './NameAndFundingSourceForm';

const defaultProps = {
  index: 1,
  item: {
    fundingSource: 'Uncle Scrooge',
    key: 'key 1',
    name: 'Buying bikes for Huey, Dewey, and Louie'
  },
  setFundingSource: jest.fn(),
  setName: jest.fn()
};

const setup = async (props = {}) => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  const utils = await act(async () =>
    renderWithConnection(
      <NameAndFundingSourceForm {...defaultProps} {...props} />
    )
  );
  await waitFor(() => screen.findByText(/Activity Name/i));
  return utils;
};

describe('the NameAndFundingSourceForm component', () => {
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
