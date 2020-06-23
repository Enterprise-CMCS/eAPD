import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as ContractorResources,
  mapStateToProps,
  mapDispatchToProps
} from './ContractorResources';
import { addContractor, removeContractor } from '../../actions/editActivity';

describe('the ContractorResources component', () => {
  const activityIndex = 0;
  const props = {
    activityIndex,
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
    addContractor: jest.fn(),
    removeContractor: jest.fn()
  };

  const component = shallow(<ContractorResources {...props} />);

  beforeEach(() => {
    props.addContractor.mockClear();
    props.removeContractor.mockClear();
  });

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    const list = component.find('FormAndReviewList');

    it('handles adding a new contractor resource', () => {
      list.prop('onAddClick')();
      expect(props.addContractor).toHaveBeenCalledWith(activityIndex);
    });

    it('handles deleting a contractor resource', () => {
      list.prop('onDeleteClick')(1);
      expect(props.removeContractor).toHaveBeenCalledWith(activityIndex, 1);
    });
  });

  test('maps redux state to component props', () => {
    expect(
      mapStateToProps(
        {
          apd: {
            data: {
              activities: [
                { contractorResources: 'contractorx' },
                { contractorResources: 'contractory' },
                { contractorResources: 'contractorz' }
              ]
            }
          }
        },
        { activityIndex: 2 }
      )
    ).toEqual({
      contractors: 'contractorz'
    });
  });

  test('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({ addContractor, removeContractor });
  });
});
