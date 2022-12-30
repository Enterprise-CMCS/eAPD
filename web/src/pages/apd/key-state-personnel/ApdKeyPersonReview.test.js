import { shallow } from 'enzyme';
import React from 'react';

import ApdKeyPersonReview from './ApdKeyPersonReview';

describe('the ApdKeyPersonReview component', () => {
  const props = {
    expand: jest.fn(),
    index: 12,
    item: {
      costs: {
        1992: 100,
        1993: 300
      },
      email: 'email address',
      hasCosts: true,
      key: 'person key',
      name: 'Bob the Builder',
      fte: {
        1992: 0.32,
        1993: 0.84
      },
      split: {
        1992: {
          federal: 0,
          state: 0
        },
        1993: {
          federal: 0,
          state: 0
        }
      },
      position: 'The Builder'
    },
    onDeleteClick: jest.fn(),
    years: ['1992', '1993']
  };

  test('renders correctly', () => {
    const component = shallow(<ApdKeyPersonReview {...props} />);
    expect(component).toMatchSnapshot();

    expect(component.find('Review').first().prop('onEditClick')).toEqual(
      props.expand
    );

    expect(component.find('Review').first().prop('onDeleteClick')).toEqual(
      props.onDeleteClick
    );
  });
});
