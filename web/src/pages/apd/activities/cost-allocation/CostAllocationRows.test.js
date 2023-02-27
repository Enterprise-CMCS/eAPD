import { mount, shallow } from 'enzyme';
import React from 'react';
import CostAllocationRows, { CostSummaryRows } from './CostAllocationRows';

const props = {
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

describe('renders correctly', () => {
  it('renders correctly without otherFunding', () => {
    const component = mount(
      <table>
        <tbody>
          <CostAllocationRows {...props} />
        </tbody>
      </table>
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with otherFunding', () => {
    const component = mount(
      <table>
        <tbody>
          <CostAllocationRows {...props} otherFunding={otherFunding} />
        </tbody>
      </table>
    );
    expect(component).toMatchSnapshot();
  });

  it('renders internal cost summary rows component', () => {
    expect(
      shallow(
        <CostSummaryRows
          items={[
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
          ]}
        />
      )
    ).toMatchSnapshot();
  });
});
