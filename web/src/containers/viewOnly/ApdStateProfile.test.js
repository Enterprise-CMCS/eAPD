import React from 'react';
import { render, screen } from 'apd-testing-library';

import ApdStateProfile from './ApdStateProfile';

describe('APD Summary/viewOnly component', () => {
  test('renders the correct message when no key personnel are provided', () => {
    const stateProfile = {
      medicaidOffice: {
        address1: '123 Street St',
        state: 'MD'
      },
      medicaidDirector: {
        name: 'Test'
      }
    };
    render(<ApdStateProfile stateProfile={stateProfile} keyPersonnel={[]} />);
    expect(screen.queryByText(/No response was provided/i)).toBeTruthy();
  });

  test('renders key personnel when provided', () => {
    const stateProfile = {
      medicaidOffice: {},
      medicaidDirector: {}
    };
    const keyPersonnel = [
      {
        isPrimary: true,
        name: 'Primary Person Name'
      }
    ];
    render(
      <ApdStateProfile
        stateProfile={stateProfile}
        keyPersonnel={keyPersonnel}
      />
    );
    expect(screen.queryByText(/Primary Person Name/i)).toBeTruthy();
    expect(screen.queryByText(/Primary APD Point of Contact/i)).toBeTruthy();
  });

  test('renders the correct state medicaid office address when provided', () => {
    const stateProfile = {
      medicaidOffice: {
        address1: '123 Street St',
        state: 'MD'
      },
      medicaidDirector: {
        name: 'Test'
      }
    };
    render(<ApdStateProfile stateProfile={stateProfile} keyPersonnel={[]} />);
    expect(screen.queryByText(/123 Street St/i)).toBeTruthy();
  });

  test('renders the correct message when no address is provided', () => {
    const stateProfile = {
      medicaidOffice: {
        address1: '',
        address2: '',
        state: '',
        city: '',
        zip: ''
      },
      medicaidDirector: {
        name: 'Test'
      }
    };
    const keyPersonnel = [
      {
        isPrimary: true,
        name: 'Primary Person Name'
      }
    ];
    render(
      <ApdStateProfile
        stateProfile={stateProfile}
        keyPersonnel={keyPersonnel}
      />
    );
    expect(screen.queryByText(/No response was provided/i)).toBeTruthy();
  });
});
