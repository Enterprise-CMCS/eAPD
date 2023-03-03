import React from 'react';
import { render, screen } from 'apd-testing-library';

import ApdStateProfile from './KeyStatePersonnelReadOnly';

describe('APD Summary/viewOnly component', () => {
  test('renders the correct message when no key personnel are provided', () => {
    const keyStatePersonnel = {
      medicaidOffice: {
        address1: '123 Street St',
        state: 'MD'
      },
      medicaidDirector: {
        name: 'Test'
      },
      keyPersonnel: []
    };
    render(<ApdStateProfile keyStatePersonnel={keyStatePersonnel} />);
    expect(
      screen.getByText(/No key state personnel was provided/i)
    ).toBeTruthy();
  });

  test('renders key personnel when provided', () => {
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
    const keyStatePersonnel = {
      medicaidOffice: {
        address1: '123 Street St',
        state: 'MD'
      },
      medicaidDirector: {
        name: 'Test'
      },
      keyPersonnel: []
    };
    render(<ApdStateProfile keyStatePersonnel={keyStatePersonnel} />);
    expect(screen.getByText(/123 Street St/i)).toBeTruthy();
  });

  test('renders the correct message when no address is provided', () => {
    const keyPersonnel = [
      {
        isPrimary: true,
        name: 'Primary Person Name'
      }
    ];
    const keyStatePersonnel = {
      medicaidOffice: {
        address1: '',
        address2: '',
        state: '',
        city: '',
        zip: ''
      },
      medicaidDirector: {
        name: 'Test'
      },
      keyPersonnel: keyPersonnel
    };
    render(<ApdStateProfile keyStatePersonnel={keyStatePersonnel} />);
    expect(screen.getByText(/No Medicaid office was provided/i)).toBeTruthy();
  });

  test('renders the correct state medicaid director when provided', () => {
    const keyStatePersonnel = {
      medicaidOffice: {
        address1: '123 Street St',
        state: 'MD'
      },
      medicaidDirector: {
        name: 'Test Medicaid Director'
      },
      keyPersonnel: []
    };
    render(<ApdStateProfile keyStatePersonnel={keyStatePersonnel} />);
    expect(screen.getByText(/Test Medicaid Director/i)).toBeTruthy();
  });

  test('renders the correct message when no medicaid director is provided', () => {
    const keyPersonnel = [
      {
        isPrimary: true,
        name: 'Primary Person Name'
      }
    ];
    const keyStatePersonnel = {
      medicaidOffice: {
        address1: '123 Street St',
        state: 'MD'
      },
      medicaidDirector: {
        name: ''
      },
      keyPersonnel: keyPersonnel
    };
    render(<ApdStateProfile keyStatePersonnel={keyStatePersonnel} />);
    expect(screen.getByText(/No Medicaid director was provided/i)).toBeTruthy();
  });
});
