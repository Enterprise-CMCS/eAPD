import React from 'react';
import { render, screen } from 'apd-testing-library';
import { APD_TYPE, FUNDING_CATEGORY_TYPE } from '@cms-eapd/common';

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

  test('renders HITECH key personnel when provided', () => {
    const keyPersonnel = [
      {
        name: 'Polly Shelby',
        position: 'ES Director',
        email: 'polly.shelby@peakyblinders.com',
        isPrimary: true,
        fte: {
          2022: 1,
          2023: 1
        },
        hasCosts: true,
        costs: {
          2022: 25000,
          2023: 25000
        },
        split: {
          2022: {
            federal: 90,
            state: 10,
            fundingCategory: FUNDING_CATEGORY_TYPE.DDI
          },
          2023: {
            federal: 90,
            state: 10,
            fundingCategory: FUNDING_CATEGORY_TYPE.DDI
          }
        },
        medicaidShare: {
          2022: 90,
          2023: 90
        },
        id: null,
        key: '6794cbcf'
      }
    ];
    const keyStatePersonnel = {
      medicaidOffice: {},
      medicaidDirector: {},
      keyPersonnel: keyPersonnel
    };
    render(
      <ApdStateProfile
        keyStatePersonnel={keyStatePersonnel}
        apdType={APD_TYPE.HITECH}
      />
    );
    expect(screen.getByText(/FFY 2022 Cost/i)).toBeTruthy();
    expect(screen.getByText(/FFY 2023 Cost/i)).toBeTruthy();
    expect(screen.queryByText(/Total Computable Medicaid Cost/)).toBeNull();
  });

  test('renders MMIS key personnel when provided', () => {
    const keyPersonnel = [
      {
        name: 'Polly Shelby',
        position: 'ES Director',
        email: 'polly.shelby@peakyblinders.com',
        isPrimary: true,
        fte: {
          2022: 1,
          2023: 1
        },
        hasCosts: true,
        costs: {
          2022: 25000,
          2023: 25000
        },
        split: {
          2022: {
            federal: 90,
            state: 10,
            fundingCategory: FUNDING_CATEGORY_TYPE.DDI
          },
          2023: {
            federal: 90,
            state: 10,
            fundingCategory: FUNDING_CATEGORY_TYPE.DDI
          }
        },
        medicaidShare: {
          2022: 90,
          2023: 90
        },
        id: null,
        key: '6794cbcf'
      }
    ];
    const keyStatePersonnel = {
      medicaidOffice: {},
      medicaidDirector: {},
      keyPersonnel: keyPersonnel
    };
    render(
      <ApdStateProfile
        keyStatePersonnel={keyStatePersonnel}
        apdType={APD_TYPE.MMIS}
      />
    );
    expect(screen.getByText(/FFY 2022 Cost/i)).toBeTruthy();
    expect(screen.getByText(/FFY 2023 Cost/i)).toBeTruthy();
    expect(screen.getAllByText(/Total Computable Medicaid Cost/).length).toBe(
      2
    );
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
