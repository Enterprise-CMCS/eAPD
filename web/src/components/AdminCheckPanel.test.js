import React from 'react';
import { renderWithConnection, screen, fireEvent } from 'apd-testing-library';

// eslint-disable-next-line import/no-named-as-default
import AdminCheckPanel from './AdminCheckPanel';

// Note: this data is mocked in the app as well until the backend is
// providing the data and handling frontend updates.
const mockedData = [
  {
    section: 'APD Overview',
    link: 'apd-overview',
    fieldDescription: 'Please fill out name'
  },
  {
    section: 'Key State Personnel',
    link: 'state-profile',
    fieldDescription: 'Provide the email address of the Medicaid Director'
  },
  {
    section: 'Key State Personnel',
    link: 'state-profile',
    fieldDescription: 'Provide the phone number of the Medicaid Director'
  },
  {
    section: 'Activity 1',
    link: 'activity/0/overview',
    fieldDescription: 'Provide a short overview of the Activity'
  },
  {
    section: 'Activity 2',
    link: 'activity/1/oms',
    fieldDescription: 'Add at least one outcome for this activity'
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
          adminCheck: {
            errors: mockedData,
            enabled: true,
            collapsed: false,
            complete: false
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
          adminCheck: {
            errors: mockedData,
            enabled: true,
            collapsed: false,
            complete: false
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
          adminCheck: {
            errors: [],
            enabled: true,
            collapsed: false,
            complete: true
          }
        }
      }
    });

    expect(screen.getByText('Administrative Check is Complete')).toBeTruthy();
  });
});
