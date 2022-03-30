import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  within,
  waitFor,
  prettyDOM
} from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import { plain as StatePersonForm } from './StatePersonForm';

const defaultProps = {
  activityIndex: 42,
  index: 1,
  item: {
    title: "Project Assistant",
    description: "Coordination and document management support daily administrative support such as meeting minutes and scribe, manages project library, scheduling, and correspondence tracking.",
    years: {
      2022: {
        amt: 100000,
        perc: 1
      },
      2023: {
        amt: 125000,
        perc: 2
      }
    },
    key: "1bf11abc"
  },
  savePersonnel: jest.fn(),
  setFormValid: jest.fn()
};

const setup = async (props = {}) => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  const renderUtils = await act(async () => {
    renderWithConnection(<StatePersonForm {...defaultProps} {...props} />);
  });
  return renderUtils;
};

describe('the ContractorResourceForm component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  test('renders correctly with default props', async () => {
    await setup();
    expect(screen.getByLabelText(/Personnel title/i)).toHaveValue(defaultProps.item.title);
    expect(screen.getByLabelText(/Description/i)).toHaveValue(defaultProps.item.description);
    // Object.keys(defaultProps.item.years).forEach(year => {
    //   expect(screen.getByLabelText(`FFY ${year} Cost`)).toHaveValue(`FFY ${year} Cost`);
    // })
  });
  
  // renders error when no title is provided
  
  // renders error when no description is provided
  
  // renders error when no number is provided for cost
  
  // renders error when a negative number is provided for cost
  
  // renders error when no number of FTEs is provided
});