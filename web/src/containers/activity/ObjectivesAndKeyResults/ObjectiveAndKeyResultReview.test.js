import { shallow } from 'enzyme';
import React from 'react';

import ObjectiveAndKeyResultReview from './ObjectiveAndKeyResultReview';

describe('the ObjectiveAndKeyResultReview component', () => {
  const props = {
    expand: jest.fn(),
    index: 1,
    item: {
      key: 'objective key',
      objective: 'objective description',
      keyResults: [
        {
          key: 'kr 1',
          keyResult: 'first kr',
          target: '93 million miles',
          baseline: '37 inches'
        },
        {
          key: 'kr 2',
          keyResult: 'second kr',
          target: '1 AU',
          baseline: 'the moon'
        }
      ]
    },
    onDeleteClick: jest.fn()
  };

  test('renders correctly', () => {
    const component = shallow(<ObjectiveAndKeyResultReview {...props} />);
    expect(component).toMatchSnapshot();

    expect(component.find('Review').prop('onEditClick')).toEqual(
      props.expand
    );
    expect(component.find('Review').prop('onDeleteClick')).toEqual(
      props.onDeleteClick
    );
  });
});
