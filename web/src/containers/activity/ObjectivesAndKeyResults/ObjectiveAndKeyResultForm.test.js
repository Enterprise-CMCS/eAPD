import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as ObjectiveAndKeyResultForm,
  mapDispatchToProps
} from './ObjectiveAndKeyResultForm';

import {
  setObjective,
  setObjectiveKeyResult,
  setObjectiveKeyResultTarget,
  setObjectiveKeyResultBaseline
} from '../../../actions/editActivity';

describe('the ObjectiveAndKeyResultForm component', () => {
  const props = {
    activityIndex: 93,
    index: 1,
    item: {
      key: 'objective key',
      objective: 'objective description',
      keyResults: [
        {
          key: 'kr key 1',
          keyResult: 'metric 1',
          target: 'goal 1',
          baseline: 'starting 1'
        },
        {
          key: 'kr key 2',
          keyResult: 'metric 2',
          target: 'goal 2',
          baseline: 'starting 2'
        }
      ]
    },
    setBaseline: jest.fn(),
    setKR: jest.fn(),
    setObjective: jest.fn(),
    setTarget: jest.fn()
  };

  beforeEach(() => {
    props.setBaseline.mockClear();
    props.setKR.mockClear();
    props.setObjective.mockClear();
    props.setTarget.mockClear();
  });

  test('renders correctly', () => {
    const component = shallow(<ObjectiveAndKeyResultForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('it handles changing the OKR objective', () => {
    const component = shallow(<ObjectiveAndKeyResultForm {...props} />);
    component
      .findWhere(c => c.prop('name') === 'objective')
      .simulate('change', { target: { value: 'new objective' } });

    expect(props.setObjective).toHaveBeenCalledWith(93, 1, 'new objective');
  });

  it('handles changing a key result', () => {
    const component = shallow(<ObjectiveAndKeyResultForm {...props} />);
    component
      .findWhere(c => c.prop('name') === 'key-result')
      .at(0)
      .simulate('change', { target: { value: 'new kr' } });

    expect(props.setKR).toHaveBeenCalledWith(93, 1, 0, 'new kr');
  });

  it('handles changing a key result target', () => {
    const component = shallow(<ObjectiveAndKeyResultForm {...props} />);
    component
      .findWhere(c => c.prop('name') === 'kr-target')
      .at(1)
      .simulate('change', { target: { value: 'new target' } });

    expect(props.setTarget).toHaveBeenCalledWith(93, 1, 1, 'new target');
  });

  it('handles changing a key result baseline', () => {
    const component = shallow(<ObjectiveAndKeyResultForm {...props} />);
    component
      .findWhere(c => c.prop('name') === 'kr-baseline')
      .at(0)
      .simulate('change', { target: { value: 'new baseline' } });

    expect(props.setBaseline).toHaveBeenCalledWith(93, 1, 0, 'new baseline');
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
