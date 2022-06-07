import React from 'react';
import { renderWithConnection, screen, fireEvent } from 'apd-testing-library';

// eslint-disable-next-line import/no-named-as-default
import AdminCheckPanel from './AdminCheckPanel';

// Note: this data is mocked in the app as well until the backend is
// providing the data and handling frontend updates.
const mockedMetadata = {
  incomplete: 2,
  todo: {
    overview: {
      name: 'APD Overview',
      incomplete: 1,
      link: 'apd-overview',
      fields: [
        {
          name: 'APD Name',
          description: 'please include a name'
        }
      ]
    },
    keyStatePersonnel: {
      name: 'Key State Personnel',
      incomplete: 1,
      link: 'state-profile',
      fields: [
        {
          name: 'Phone Number',
          description: 'Provide the phone number of the Medicaid Director'
        }
      ]
    }
  },
  recents: [
    {
      page: 'Activity 1- State Costs',
      section: 'State Costs',
      link: 'activity/0/state-costs'
    },
    {
      page: 'Private Contractor Costs',
      section: 'Private Contractor Costs',
      link: 'activity/0/contractor-costs'
    }
  ]
};

const setup = (props = {}, options = {}) => {
  return renderWithConnection(<AdminCheckPanel {...props} />, options);
};

describe('admin check panel', () => {
  beforeEach(() => {});

  afterAll(() => {});

  test('renders panel heading when admin check is on', () => {
    setup(null, {
      initialState: {
        apd: {
          adminCheck: true,
          adminCheckMini: false,
          adminCheckComplete: false,
          data: {
            metadata: mockedMetadata
          }
        }
      }
    });

    expect(screen.getByText('Administrative Check')).toBeTruthy();
  });

  test('should close the panel when admin check is stopped', () => {
    setup(null, {
      initialState: {
        apd: {
          adminCheck: true,
          adminCheckMini: false,
          adminCheckComplete: false,
          data: {
            metadata: mockedMetadata
          }
        }
      }
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Stop Administrative Check' })
    );

    expect(screen.queryByText('Administrative Check')).not.toBeTruthy();
  });

  test('toggles the mini check on and off', () => {
    setup(null, {
      initialState: {
        apd: {
          adminCheck: true,
          adminCheckMini: false,
          adminCheckComplete: false,
          data: {
            metadata: mockedMetadata
          }
        }
      }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Collapse' }));

    // Todo: update this when we have live data for the mini check
    expect(
      screen.getByText('Continue to Results of Previous Activities')
    ).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Expand' }));

    // Todo: update this when we have live data for the mini check
    expect(
      screen.queryByText('Continue to Results of Previous Activities')
    ).not.toBeTruthy();
  });

  test('renders the completed message', () => {
    setup(null, {
      initialState: {
        apd: {
          adminCheck: true,
          adminCheckMini: false,
          adminCheckComplete: true,
          data: {
            metadata: mockedMetadata
          }
        }
      }
    });

    expect(screen.getByText('Administrative Check is Complete')).toBeTruthy();
  });

  test('renders the completed message in mini check mode', () => {
    setup(null, {
      initialState: {
        apd: {
          adminCheck: true,
          adminCheckMini: true,
          adminCheckComplete: true,
          data: {
            metadata: mockedMetadata
          }
        }
      }
    });

    expect(
      screen.getByText('Well Done! The Administrative Check is complete.')
    ).toBeTruthy();
  });
});
