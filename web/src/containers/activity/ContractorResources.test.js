import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as ContractorResources,
  mapStateToProps,
  mapDispatchToProps
} from './ContractorResources';
import {
  addActivityContractor,
  removeActivityContractor,
  toggleActivityContractorHourly,
  updateActivity
} from '../../actions/activities';

describe('the ContractorResources component', () => {
  const props = {
    activityKey: 'activity key',
    contractors: [
      {
        id: 'contractor 1',
        key: 'key 1',
        hourly: {
          data: {
            1997: {
              hours: 100,
              rate: 15
            }
          }
        },
        years: {
          1997: 1500
        }
      },
      {
        id: 'contractor 2',
        key: 'key 2',
        hourly: {
          data: {
            1998: {
              hours: 200,
              rate: 20
            }
          }
        },
        years: {
          1998: 4000
        }
      },
      {
        id: 'contractor 3',
        key: 'key 3',
        hourly: {
          data: {
            1999: {
              hours: 300,
              rate: 25
            }
          }
        },
        years: {
          1999: 7500
        }
      }
    ],
    years: ['1066', '1067'],
    addContractor: jest.fn(),
    removeContractor: jest.fn(),
    toggleContractorHourly: jest.fn(),
    updateActivity: jest.fn()
  };

  const component = shallow(<ContractorResources {...props} />);

  beforeEach(() => {
    props.addContractor.mockClear();
    props.removeContractor.mockClear();
    props.toggleContractorHourly.mockClear();
    props.updateActivity.mockClear();
  });

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    const list = component.find('FormAndReviewList');

    it('handles adding a new contractor resource', () => {
      list.prop('onAddClick')();
      expect(props.addContractor).toHaveBeenCalledWith('activity key');
    });

    it('handles deleting a contractor resource', () => {
      list.prop('onDeleteClick')('contractor key');
      expect(props.removeContractor).toHaveBeenCalledWith(
        'activity key',
        'contractor key'
      );
    });

    it('handles setting contractor hourly flag', () => {
      list.prop('handleUseHourly')('contractor key', 'flag value')();
      expect(props.toggleContractorHourly).toHaveBeenCalledWith(
        'activity key',
        'contractor key',
        'flag value'
      );
    });

    it('handles changing non-expense contractor info', () => {
      list.prop('handleChange')(3, 'field')({ target: { value: 'new value' } });
      expect(props.updateActivity).toHaveBeenCalledWith('activity key', {
        contractorResources: { 3: { field: 'new value' } }
      });
    });

    it('handles changing contract term (dates)', () => {
      list.prop('handleTermChange')(3)({
        start: 'start date',
        end: 'end date'
      });
      expect(props.updateActivity).toHaveBeenCalledWith('activity key', {
        contractorResources: { 3: { start: 'start date', end: 'end date' } }
      });
    });

    it('handles changing hourly rate', () => {
      list.prop('handleHourlyChange')(0, 1997, 'rate')({
        target: { value: 997 }
      });
      expect(props.updateActivity).toHaveBeenCalledWith(
        'activity key',
        {
          contractorResources: {
            0: {
              years: { 1997: 99700 },
              hourly: { data: { 1997: { rate: 997 } } }
            }
          }
        },
        true
      );
    });

    it('handles changing total number of hours', () => {
      list.prop('handleHourlyChange')(0, 1997, 'hours')({
        target: { value: 15 }
      });
      expect(props.updateActivity).toHaveBeenCalledWith(
        'activity key',
        {
          contractorResources: {
            0: {
              years: { 1997: 225 },
              hourly: { data: { 1997: { hours: 15 } } }
            }
          }
        },
        true
      );
    });

    it('handles changing contract total cost for an FFY', () => {
      list.prop('handleYearChange')(3, 1997)({
        target: { value: 'new value' }
      });
      expect(props.updateActivity).toHaveBeenCalledWith(
        'activity key',
        {
          contractorResources: { 3: { years: { 1997: 'new value' } } }
        },
        true
      );
    });
  });

  test('maps redux state to component props', () => {
    expect(
      mapStateToProps(
        {
          activities: {
            byKey: {
              key: { contractorResources: 'contractorz' }
            }
          }
        },
        { aKey: 'key' }
      )
    ).toEqual({
      activityKey: 'key',
      contractors: 'contractorz'
    });
  });

  test('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      addContractor: addActivityContractor,
      removeContractor: removeActivityContractor,
      toggleContractorHourly: toggleActivityContractorHourly,
      updateActivity
    });
  });
});
