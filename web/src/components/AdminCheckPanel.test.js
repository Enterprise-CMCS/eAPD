import React from 'react';
import { renderWithConnection, screen, fireEvent } from 'apd-testing-library';

// eslint-disable-next-line import/no-named-as-default
import AdminCheckPanel from './AdminCheckPanel';

// Note: this data is mocked in the app as well until the backend is
// providing the data and handling frontend updates.
const mockedData = [
  {
    section: 'APD Overview',
    subSection: null,
    link: 'apd-overview',
    fieldDescription: 'Please fill out name',
    complete: false
  },
  {
    section: 'Key State Personnel',
    subSection: null,
    link: 'state-profile',
    fieldDescription: 'Provide the email address of the Medicaid Director',
    complete: false
  },
  {
    section: 'Key State Personnel',
    subSection: null,
    link: 'state-profile',
    fieldDescription: 'Provide the phone number of the Medicaid Director',
    complete: false
  },
  {
    section: 'Activity 1',
    subSection: 'Overview',
    link: 'activity/0/overview',
    fieldDescription: 'Provide a short overview of the Activity',
    complete: false
  },
  {
    section: 'Activity 2',
    subSection: 'Outcomes and Metrics',
    link: 'activity/1/oms',
    fieldDescription: 'Add at least one outcome for this activity',
    complete: false
  }
];

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
          adminCheckCollapsed: false,
          adminCheckComplete: false,
          data: {
            adminCheck: mockedData
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
          adminCheckCollapsed: false,
          adminCheckComplete: false,
          data: {
            adminCheck: mockedData
          }
        }
      }
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Stop Administrative Check' })
    );

    expect(screen.queryByText('Administrative Check')).not.toBeTruthy();
  });

  test('renders the completed message', () => {
    setup(null, {
      initialState: {
        apd: {
          adminCheck: true,
          adminCheckCollapsed: false,
          adminCheckComplete: true,
          data: {
            adminCheck: []
          }
        }
      }
    });

    expect(screen.getByText('Administrative Check is Complete')).toBeTruthy();
  });
});
