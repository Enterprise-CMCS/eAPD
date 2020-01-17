import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as ObjectivesAndKeyResults,
  mapStateToProps,
  mapDispatchToProps
} from './Objectives';
import { addObjective, removeObjective } from '../../actions/editActivity';

describe('activity Goals component', () => {
  const props = {
    activityIndex: 'activity index',
    goals: [{ key: 'goal 1' }, { key: 'goal 2' }, { key: 'goal 3' }],
    add: jest.fn(),
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

    it('handles adding a new goal', () => {
      list.prop('onAddClick')();
      expect(props.add).toHaveBeenCalledWith('activity index');
    });

    it('handles deleting a goal', () => {
      list.prop('onDeleteClick')('goal 2');
      expect(props.remove).toHaveBeenCalledWith('activity index', 1);
    });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      add: addObjective,
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
            { goals: 'these are goals from state' }
          ]
        }
      }
    };

    const ownProps = { activityIndex: 2 };

    expect(mapStateToProps(state, ownProps)).toEqual({
      goals: 'these are goals from state'
    });
  });
});
