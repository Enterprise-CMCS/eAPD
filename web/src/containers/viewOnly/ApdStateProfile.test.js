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
    render(<ApdStateProfile keyStatePersonnel={keyStatePersonnel} />);
    expect(screen.getByText(/No response was provided/i)).toBeTruthy();
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
    const keyStatePersonnel = {
      medicaidOffice: {},
      medicaidDirector: {},
      keyPersonnel: keyPersonnel
    };
    render(<ApdStateProfile keyStatePersonnel={keyStatePersonnel} />);
    expect(screen.getByText(/Primary Person Name/i)).toBeTruthy();
    expect(screen.getByText(/Primary APD Point of Contact/i)).toBeTruthy();
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
    render(<ApdStateProfile keyStatePersonnel={keyStatePersonnel} />);
    expect(screen.getByText(/123 Street St/i)).toBeTruthy();
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
    render(<ApdStateProfile keyStatePersonnel={keyStatePersonnel} />);
    expect(screen.getByText(/No response was provided/i)).toBeTruthy();
  });
});
