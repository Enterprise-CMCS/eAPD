import { shallow } from 'enzyme';
import React from 'react';
import {
  plain as CostAllocateFFP,
  AllFFYsSummaryNarrative,
  mapStateToProps,
  mapDispatchToProps
} from './CostAllocateFFP';
import { setCostAllocationFFPFundingSplit } from '../../../../actions/editActivity';

describe('the CostAllocateFFP component', () => {
  const props = {
    activityIndex: 0,
    aKey: 'key',
    activityName: 'activity name',
    costAllocation: {
      1990: { ffp: { federal: '90', state: '10' }, other: 100 },
      1991: { ffp: { federal: '50', state: '50' }, other: 200 }
    },
    costSummary: {
      total: {
        federalShare: 100,
        medicaidShare: 200,
        otherFunding: 300,
        stateShare: 400,
        totalCost: 500
      },
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
    },
    setFundingSplit: jest.fn(),
    setOtherFunding: jest.fn(),
    stateName: 'test state',
    otherFunding: {
      2020: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
      2021: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
    }
  };

  beforeEach(() => {
    props.setFundingSplit.mockClear();
    props.setOtherFunding.mockClear();
  });

  describe('renders correctly', () => {
    it('renders correctly in view-only mode', () => {
      const component = shallow(<CostAllocateFFP {...props} isViewOnly />);
      expect(component).toMatchSnapshot();
    });
    it('renders correctly in editable mode (standard)', () => {
      const component = shallow(<CostAllocateFFP {...props} />);
      expect(component).toMatchSnapshot();
    });
  });

  it('handles changes to cost allocation dropdown', () => {
    const component = shallow(<CostAllocateFFP {...props} />);
    component
      .find('Dropdown')
      .at(1)
      .simulate('change', { target: { value: '35-65' } });

    expect(props.setFundingSplit).toHaveBeenCalledWith(0, '1991', 35, 65);
  });

  it('renders the budget and cost allocation summary narrative', () => {
    const costAllocation = {
      1: { ffp: { federal: 'f', state: 's' } },
      2: { ffp: { federal: 'f', state: 's' } },
      3: { ffp: { federal: 'f', state: 's' } }
    };

    const p = {
      activityName: 'activity',
      costAllocation,
      costSummary: {
        total: {
          federalShare: 1,
          medicaidShare: 2,
          otherFunding: 3,
          stateShare: 4,
          totalCost: 5
        }
      },
      stateName: 'the state'
    };

    expect(shallow(<AllFFYsSummaryNarrative {...p} />)).toMatchSnapshot();

    costAllocation['2'].ffp.federal = 'ff';
    expect(shallow(<AllFFYsSummaryNarrative {...p} />)).toMatchSnapshot();

    costAllocation['2'].ffp.federal = 'f';
    costAllocation['3'].ffp.federal = 'ff';
    expect(shallow(<AllFFYsSummaryNarrative {...p} />)).toMatchSnapshot();
  });

  it('maps redux state to component props', () => {
    const getActivity = jest.fn();
    getActivity.mockReturnValue({ key: 'activity key', name: 'activity name' });

    const getCostAllocation = jest.fn();
    getCostAllocation.mockReturnValue('cost allocation');

    const getCostSummary = jest.fn();
    getCostSummary.mockReturnValue('cost summary');

    const getState = jest.fn();
    getState.mockReturnValue({ name: 'denial' });

    const getActivityTotal = jest.fn();
    getActivityTotal.mockReturnValue({
      data: {
        otherFunding: {
          2020: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
          2021: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
        }
      }
    });

    expect(
      mapStateToProps(
        'my state object',
        { activityIndex: 0 },
        {
          getActivity,
          getCostAllocation,
          getCostSummary,
          getState,
          getActivityTotal
        }
      )
    ).toEqual({
      aKey: 'activity key',
      activityName: 'activity name',
      costAllocation: 'cost allocation',
      costSummary: 'cost summary',
      otherFunding: {
        2020: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
        2021: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
      },
      stateName: 'denial'
    });

    expect(getActivity).toHaveBeenCalledWith('my state object', {
      activityIndex: 0
    });
    expect(getCostAllocation).toHaveBeenCalledWith('my state object', {
      activityIndex: 0
    });
    expect(getCostSummary).toHaveBeenCalledWith('my state object', {
      activityIndex: 0
    });
    expect(getState).toHaveBeenCalledWith('my state object');

    // Now test that it builds a default activity name if none is provided
    getActivity.mockReturnValue({ key: 'activity key', name: '' });

    expect(
      mapStateToProps(
        'my state object',
        { activityIndex: 0 },
        {
          getActivity,
          getCostAllocation,
          getCostSummary,
          getState,
          getActivityTotal
        }
      )
    ).toEqual({
      aKey: 'activity key',
      activityName: 'Untitled',
      costAllocation: 'cost allocation',
      costSummary: 'cost summary',
      otherFunding: {
        2020: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
        2021: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
      },
      stateName: 'denial'
    });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      setFundingSplit: setCostAllocationFFPFundingSplit
    });
  });
});
