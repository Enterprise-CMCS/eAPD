import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import GoalForm from './GoalForm';

describe('the GoalForm component', () => {
  const sandbox = sinon.createSandbox();

  const props = {
    handleChange: sandbox.stub(),
    index: 1,
    item: {
      description: 'goal description',
      key: 'goal key',
      objective: 'goal objective'
    }
  };

  beforeEach(() => {
    sandbox.resetHistory();
  });

  test('renders correctly', () => {
    const component = shallow(<GoalForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('it handles changing the goal description', () => {
    const handler = sinon.spy();
    props.handleChange.withArgs(1, 'description').returns(handler);

    const component = shallow(<GoalForm {...props} />);
    component
      .findWhere(c => c.prop('name') === 'name')
      .simulate('change', 'new name');

    expect(props.handleChange.calledWith(1, 'description')).toEqual(true);
    expect(handler.calledWith('new name')).toEqual(true);
  });

  it('it handles changing the goal objective', () => {
    const handler = sinon.spy();
    props.handleChange.withArgs(1, 'objective').returns(handler);

    const component = shallow(<GoalForm {...props} />);
    component
      .findWhere(c => c.prop('name') === 'milestones')
      .simulate('change', 'new objective');

    expect(props.handleChange.calledWith(1, 'objective')).toEqual(true);
    expect(handler.calledWith('new objective')).toEqual(true);
  });
});
