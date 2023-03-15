import React from 'react';
import { render, screen } from 'apd-testing-library';
import CostAllocationRows, { CostSummaryRows } from './CostAllocationRows';
import { APD_TYPE } from '@cms-eapd/common';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

const defaultProps = {
  ffy: '1990',
  years: {
    1990: {
      contractorResources: [
        {
          description: 'contractor 2.1',
          totalCost: 2000,
          unitCost: null,
          units: null
        },
        {
          description: 'contractor 2.2',
          totalCost: 2001,
          unitCost: 20,
          units: '20 hours'
        }
      ],
      contractorResourcesTotal: 1000,
      federalPercent: 1001,
      federalShare: 90,
      keyPersonnel: [
        {
          description: 'key person (APD Key Personnel)',
          totalCost: 1002,
          unitCost: null,
          units: '100% time'
        }
      ],
      medicaidShare: 1003,
      nonPersonnel: [
        {
          description: 'costly costs',
          totalCost: 3000,
          unitCost: null,
          units: null
        }
      ],
      nonPersonnelTotal: 1004,
      otherFunding: 1005,
      statePercent: 10,
      statePersonnel: [
        {
          description: 'personnel role',
          totalCost: 4000,
          unitCost: 40,
          units: '0.5 FTE'
        }
      ],
      statePersonnelTotal: 1006,
      stateShare: 1007,
      totalCost: 1008
    },
    1991: {
      contractorResources: [
        {
          description: 'contractor 2.1',
          totalCost: 6000,
          unitCost: null,
          units: null
        },
        {
          description: 'contractor 2.2',
          totalCost: 6001,
          unitCost: 60,
          units: '60 hours'
        }
      ],
      contractorResourcesTotal: 7000,
      federalPercent: 7001,
      federalShare: 50,
      keyPersonnel: [
        {
          description: 'key person (APD Key Personnel)',
          totalCost: 8002,
          unitCost: null,
          units: '100% time'
        }
      ],
      medicaidShare: 7003,
      nonPersonnel: [
        {
          description: 'costly costs',
          totalCost: 9000,
          unitCost: null,
          units: null
        }
      ],
      nonPersonnelTotal: 7004,
      otherFunding: 7005,
      statePercent: 50,
      statePersonnel: [
        {
          description: 'personnel role',
          totalCost: 9000,
          unitCost: 90,
          units: '0.5 FTE'
        }
      ],
      statePersonnelTotal: 7006,
      stateShare: 7007,
      totalCost: 7008
    }
  }
};

const otherFunding = {
  1990: {
    statePersonnel: 100,
    expenses: 200,
    contractors: 350,
    total: 650
  },
  1991: {
    statePersonnel: 400,
    expenses: 700,
    contractors: 150,
    total: 1250
  }
};

const setupCostAllocationRows = async (props = {}) => {
  return render(
    <table>
      <tbody>
        <CostAllocationRows {...defaultProps} {...props} />
      </tbody>
    </table>
  );
};

const setupCostSummaryRows = async (props = {}) => {
  return render(<CostSummaryRows {...props} />);
};

/* eslint-disable testing-library/no-node-access */
describe('renders correctly', () => {
  beforeEach(() => {
    // reset before each test case
    resetLDMocks();
    mockFlags({ emptyBudgetWording: false });
  });

  it('renders correctly without otherFunding', async () => {
    await setupCostAllocationRows();
    expect(screen.queryAllByText(/Other Funding/).length).toEqual(0);
  });

  it('renders correctly with otherFunding', async () => {
    await setupCostAllocationRows({ otherFunding });
    expect(screen.getAllByText(/Other Funding/).length).toEqual(3);
  });

  it('renders key state personnel for HITECH', async () => {
    await setupCostAllocationRows({ apdType: APD_TYPE.HITECH });
    expect(
      screen.getAllByText(/key person \(APD Key Personnel\)/i).length
    ).toEqual(1);
  });

  it('does not render key state personnel for MMIS', async () => {
    await setupCostAllocationRows({ apdType: APD_TYPE.MMIS });
    expect(
      screen.queryAllByText(/key person \(APD Key Personnel\)/i).length
    ).toEqual(0);
  });

  it('renders internal cost summary rows component', async () => {
    await setupCostSummaryRows({
      items: [
        {
          // shows unit cost, units, and math symbols
          description: 'item 1',
          totalCost: 100,
          unitCost: 10,
          units: '10 items'
        },
        {
          // shows none of those things
          description: 'item 2',
          totalCost: 200,
          unitCost: null,
          units: null
        },
        {
          // show medicaid share %
          description: 'share percent',
          totalCost: 200,
          unitCost: 1,
          units: 'fte',
          medicaidShare: '50'
        }
      ]
    });
    expect(screen.getByText(/item 1/).closest('tr')).toHaveTextContent(
      'item 1$10×10 items=$100'
    );
    expect(screen.getByText(/item 2/).closest('tr')).toHaveTextContent(
      'item 2$200'
    );
    expect(screen.getByText(/share percent/).closest('tr')).toHaveTextContent(
      'share percent$1×fte× 50%=$200'
    );
  });

  it('renders internal cost summary rows component with empty items array', async () => {
    await setupCostSummaryRows({
      items: [],
      defaultMessage: 'State staff not specified.'
    });
    expect(
      screen.getByText(/State staff not specified/).closest('tr')
    ).toHaveTextContent('State staff not specified.$0');
  });
});
