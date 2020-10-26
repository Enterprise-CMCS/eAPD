import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as OutcomeAndMetricForm,
  mapDispatchToProps
} from './OutcomeAndMetricForm';

import { setOutcome, setOutcomeMetric } from '../../../actions/editActivity';

describe('the OutcomeAndMetricForm component', () => {
  const props = {
    activityIndex: 93,
    index: 1,
    item: {
      key: 'outcome key',
      outcome: 'outcome description',
      metrics: [
        {
          key: 'om key 1',
          metric: 'metric 1'
        },
        {
          key: 'om key 2',
          metric: 'metric 2'
        }
      ]
    },
    setMetric: jest.fn(),
    setOutcome: jest.fn(),
    removeMetric: jest.fn()
  };

  beforeEach(() => {
    props.setMetric.mockClear();
    props.setOutcome.mockClear();
  });

  test('renders correctly', () => {
    const component = shallow(<OutcomeAndMetricForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('it handles changing the outcome', () => {
    const component = shallow(<OutcomeAndMetricForm {...props} />);
    component
      .findWhere(c => c.prop('name') === 'outcome')
      .simulate('change', { target: { value: 'new outcome' } });

    expect(props.setOutcome).toHaveBeenCalledWith(93, 1, 'new outcome');
  });

  it('handles changing a metric', () => {
    const component = shallow(<OutcomeAndMetricForm {...props} />);
    component
      .findWhere(c => c.prop('name') === 'metric')
      .at(0)
      .simulate('change', { target: { value: 'new om' } });

    expect(props.setMetric).toHaveBeenCalledWith(93, 1, 0, 'new om');
  });

  it('handles removing a metric', () => {
    const component = shallow(<OutcomeAndMetricForm {...props} />);

    component
      .find('Review')
      .at(0)
      .dive()
      .dive()
      .find('Button[children="Delete"]')
      .simulate('click');

    expect(props.removeMetric).toHaveBeenCalled();
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      setOutcome,
      setMetric: setOutcomeMetric
    });
  });
});
