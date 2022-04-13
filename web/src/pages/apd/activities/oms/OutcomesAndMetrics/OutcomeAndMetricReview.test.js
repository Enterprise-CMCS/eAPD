import { shallow } from 'enzyme';
import React from 'react';

import OutcomeAndMetricReview from './OutcomeAndMetricReview';

describe('the OutcomeAndMetricReview component', () => {
  const props = {
    expand: jest.fn(),
    index: 1,
    item: {
      key: 'outcome key',
      outcome: 'outcome description',
      metrics: [
        {
          key: 'om 1',
          metric: 'first metric'
        },
        {
          key: 'om 2',
          metric: 'second metric'
        }
      ]
    },
    onDeleteClick: jest.fn()
  };

  test('renders correctly', () => {
    const component = shallow(<OutcomeAndMetricReview {...props} />);
    expect(component).toMatchSnapshot();

    expect(component.find('Review').prop('onEditClick')).toEqual(props.expand);
    expect(component.find('Review').prop('onDeleteClick')).toEqual(
      props.onDeleteClick
    );
  });
});
