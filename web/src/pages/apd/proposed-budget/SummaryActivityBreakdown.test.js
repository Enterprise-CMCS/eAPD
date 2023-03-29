import { shallow } from 'enzyme';
import React from 'react';
import {
  plain as SummaryActivityBreakdownTable,
  mapStateToProps
} from './SummaryActivityBreakdown';
import { APD_TYPE } from '@cms-eapd/common';

const props = {
  ffy: '2016',
  activityIndex: 2,
  activityName: 'activity name',
  costSummary: {
    total: {
      federalShare: 100,
      medicaidShare: 200,
      otherFunding: 300,
      stateShare: 400,
      totalCost: 500
    },
    years: {
      2016: {
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
      2017: {
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
  },
  otherFunding: {
    2016: {
      statePersonnel: 100,
      expenses: 200,
      contractors: 350,
      total: 650
    },
    2017: {
      statePersonnel: 400,
      expenses: 700,
      contractors: 150,
      total: 1250
    }
  },
  fundingSource: 'HIE'
};

describe('State and Contractor Cost Breakdown Table renders correctly', () => {
  it('renders correctly', () => {
    const component = shallow(<SummaryActivityBreakdownTable {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('maps redux state to component props', () => {
    const getActivity = jest.fn();
    getActivity.mockReturnValue({ key: 'activity key', name: 'activity name' });

    const getCostSummary = jest.fn();
    getCostSummary.mockReturnValue('cost summary');

    const getApdType = jest.fn();
    getApdType.mockReturnValue(APD_TYPE.HITECH);

    expect(
      mapStateToProps(
        'my state object',
        { activityIndex: 0 },
        { getActivity, getCostSummary, getApdType }
      )
    ).toEqual({
      activityName: 'activity name',
      costSummary: 'cost summary',
      apdType: APD_TYPE.HITECH
    });

    expect(getActivity).toHaveBeenCalledWith('my state object', {
      activityIndex: 0
    });
    expect(getCostSummary).toHaveBeenCalledWith('my state object', {
      activityIndex: 0
    });

    // Now test that it builds a default activity name if none is provided
    getActivity.mockReturnValue({ key: 'activity key', name: '' });

    getApdType.mockReturnValue(APD_TYPE.MMIS);

    expect(
      mapStateToProps(
        'my state object',
        { activityIndex: 0 },
        { getActivity, getCostSummary, getApdType }
      )
    ).toEqual({
      activityName: '',
      costSummary: 'cost summary',
      apdType: APD_TYPE.MMIS
    });
  });
});
