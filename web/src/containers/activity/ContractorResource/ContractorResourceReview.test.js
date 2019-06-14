import { shallow } from 'enzyme';
import React from 'react';

import ContractorReview from './ContractorResourceReview';

describe('the ContractorResourceReview component', () => {
  const props = {
    expand: jest.fn(),
    index: 1,
    item: {
      desc: 'They cleaned up the latrines after the Battle of Hastings',
      end: '1066-10-15',
      hourly: {
        useHourly: false,
        data: {
          '1066': {
            hours: 10,
            rate: 100
          },
          '1067': {
            hours: 20,
            rate: 200
          }
        }
      },
      id: 'contractor 1',
      key: 'key 1',
      name: 'Honey Dipper Dan',
      start: '1066-10-14',
      totalCost: 12345,
      years: {
        '1066': 300,
        '1067': 400
      }
    },
    onDeleteClick: jest.fn()
  };

  it('renders correctly', () => {
    const component = shallow(<ContractorReview {...props} />);
    expect(component).toMatchSnapshot();

    expect(component.find('StandardReview').prop('onEditClick')).toEqual(
      props.expand
    );
    expect(component.find('StandardReview').prop('onDeleteClick')).toEqual(
      props.onDeleteClick
    );
  });

  it('renders placeholder date text if they are not fully-formed', () => {
    const component = shallow(
      <ContractorReview {...props} item={{ ...props.item, start: '1993' }} />
    );
    expect(component).toMatchSnapshot();
  });
});
