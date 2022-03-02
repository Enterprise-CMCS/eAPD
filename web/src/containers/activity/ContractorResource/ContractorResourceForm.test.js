import { shallow } from 'enzyme';
import React from 'react';

import { plain as ContractorForm } from './ContractorResourceForm';

describe('the ContractorResourceForm component', () => {
  const props = {
    activityIndex: 43,
    index: 1,
    item: {
      description: 'They cleaned up the latrines after the Battle of Hastings',
      end: '1066-10-15',
      hourly: {
        useHourly: false,
        data: {
          1066: {
            hours: 10,
            rate: 100
          },
          1067: {
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
        1066: 300,
        1067: 400
      }
    },
    saveContractor: jest.fn(),
  };

  beforeEach(() => {
    props.saveContractor.mockClear();
  });

  test('renders correctly', () => {
    const component = shallow(<ContractorForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
