import { shallow } from 'enzyme';
import React from 'react';

import ContractorReview from './ContractorResourceReview';

describe('the ContractorResourceReview component', () => {
  const props = {
    expand: jest.fn(),
    index: 1,
    item: {
      description: 'They cleaned up the latrines after the Battle of Hastings',
      end: '1066-10-15',
      useHourly: false,
      hourly: {
        1066: {
          hours: 10,
          rate: 100
        },
        1067: {
          hours: 20,
          rate: 200
        }
      },
      id: 'contractor 1',
      key: 'key 1',
      name: 'Honey Dipper Dan',
      start: '1066-10-14',
      totalCost: 12345,
      years: {
        1066: 300,
        1067: 400
      }
    },
    onDeleteClick: jest.fn()
  };

  it('renders correctly', () => {
    const component = shallow(
      <ContractorReview {...props}>
        <div />
      </ContractorReview>
    );
    expect(component).toMatchSnapshot();

    expect(component.find('Review').prop('onEditClick')).toEqual(props.expand);
    expect(component.find('Review').prop('onDeleteClick')).toEqual(
      props.onDeleteClick
    );
  });
});
