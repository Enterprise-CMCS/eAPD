import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import GoalReview from './GoalReview';

describe('the GoalReview component', () => {
  const sandbox = sinon.createSandbox();

  const props = {
    expand: sandbox.spy(),
    index: 1,
    item: {
      description: 'goal description',
      key: 'goal key',
      objective: 'goal objective'
    },
    onDeleteClick: sandbox.spy()
  };

  beforeEach(() => {
    sandbox.resetHistory();
  });

  test('renders correctly', () => {
    const component = shallow(<GoalReview {...props} />);
    expect(component).toMatchSnapshot();

    expect(component.find('StandardReview').prop('onEditClick')).toEqual(
      props.expand
    );
    expect(component.find('StandardReview').prop('onDeleteClick')).toEqual(
      props.onDeleteClick
    );
  });
});
