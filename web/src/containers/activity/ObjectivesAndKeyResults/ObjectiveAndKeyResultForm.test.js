import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as GoalForm,
  mapDispatchToProps
} from './ObjectiveAndKeyResultForm';

import {
  setObjective,
  setObjectiveKeyResult,
  setObjectiveKeyResultTarget,
  setObjectiveKeyResultBaseline
} from '../../../actions/editActivity';

describe('the GoalForm component', () => {
  const props = {
    activityIndex: 93,
    index: 1,
    item: {
      description: 'goal description',
      key: 'goal key',
      objective: 'goal objective'
    },
    setDescription: jest.fn(),
    setObjective: jest.fn()
  };

  beforeEach(() => {
    props.setDescription.mockClear();
    props.setDescription.mockClear();
  });

  test('renders correctly', () => {
    const component = shallow(<GoalForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('it handles changing the goal description', () => {
    const component = shallow(<GoalForm {...props} />);
    component
      .findWhere(c => c.prop('name') === 'name')
      .simulate('change', { target: { value: 'new name' } });

    expect(props.setDescription).toHaveBeenCalledWith(93, 1, 'new name');
  });

  it('it handles changing the goal objective', () => {
    const component = shallow(<GoalForm {...props} />);
    component
      .findWhere(c => c.prop('name') === 'milestones')
      .simulate('change', { target: { value: 'new objective' } });

    expect(props.setObjective).toHaveBeenCalledWith(93, 1, 'new objective');
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      setObjective,
      setKR: setObjectiveKeyResult,
      setTarget: setObjectiveKeyResultTarget,
      setBaseline: setObjectiveKeyResultBaseline
    });
  });
});
