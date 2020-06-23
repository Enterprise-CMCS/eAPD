import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as ObjectivesAndKeyResults,
  mapStateToProps,
  mapDispatchToProps
} from './Objectives';
import {
  addObjective,
  addObjectiveKeyResult,
  removeObjective
} from '../../actions/editActivity';

describe('activity Objectives and Key Results component', () => {
  const activityIndex = 0;
  const props = {
    activityIndex: activityIndex,
    objectives: [
      { key: 'objective 1' },
      { key: 'objective 2' },
      { key: 'objective 3' }
    ],
    add: jest.fn(),
    addKeyResult: jest.fn(),
    remove: jest.fn()
  };
  const component = shallow(<ObjectivesAndKeyResults {...props} />);

  beforeEach(() => {
    props.add.mockClear();
    props.remove.mockClear();
  });

  it('renders properly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    const list = component.find('FormAndReviewList');

    it('handles adding a new objective', () => {
      list.prop('onAddClick')();
      expect(props.add).toHaveBeenCalledWith(activityIndex);
    });

    it('handles deleting an objective', () => {
      list.prop('onDeleteClick')(1);
      expect(props.remove).toHaveBeenCalledWith(activityIndex, 1);
    });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      add: addObjective,
      addKeyResult: addObjectiveKeyResult,
      remove: removeObjective
    });
  });

  it('maps appropriate state to props', () => {
    const state = {
      apd: {
        data: {
          activities: [
            'activity 1',
            'activity 2',
            { objectives: 'these are OKRs from state' }
          ]
        }
      }
    };

    const ownProps = { activityIndex: 2 };

    expect(mapStateToProps(state, ownProps)).toEqual({
      objectives: 'these are OKRs from state'
    });
  });
});
