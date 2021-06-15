import React from 'react';
import { render, screen } from 'apd-testing-library'

import ApdStateProfile from './ApdStateProfile';

describe('APD Summary/viewOnly component', () => {
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
    expect(screen.queryByText(/No response was provided/i)).toBeNull();
    expect(screen.queryByText(/123 Street St/i)).toBeTruthy();
  });

  test('renders the correct message when no address is provided', () => {
    const stateProfile = {
      medicaidOffice: {
        address1: "",
        address2: "",
        state: "",
        city: "",
        zip: ""
      },
      medicaidDirector: {
        name: 'Test'
      }
    };
    render(<ApdStateProfile stateProfile={stateProfile} keyPersonnel={[]} />);

    expect(screen.queryByText(/No reponse was provided/i)).toBeTruthy();
  });
});