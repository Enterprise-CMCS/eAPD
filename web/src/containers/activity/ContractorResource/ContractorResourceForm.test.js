import { shallow } from 'enzyme';
import React from 'react';

jest.spyOn(React, 'useContext');
React.useContext.mockImplementation(() => ({
  index: 'activity index'
}));

// Have to require() this because import statements get executed before
// anything else, but we need that spyOn call to happen first. So...
// this is how we can enforce the order we need.
const { plain: ContractorForm } = require('./ContractorResourceForm');

describe('the ContractorResourceForm component', () => {
  const props = {
    index: 1,
    item: {
      description: 'They cleaned up the latrines after the Battle of Hastings',
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
    setDescription: jest.fn(),
    setEndDate: jest.fn(),
    setIsHourly: jest.fn(),
    setName: jest.fn(),
    setStartDate: jest.fn(),
    setTotalCost: jest.fn(),
    setCostForYear: jest.fn(),
    setNumberOfHoursForYear: jest.fn(),
    setHourlyRateForYear: jest.fn()
  };

  beforeEach(() => {
    props.setDescription.mockClear();
    props.setEndDate.mockClear();
    props.setIsHourly.mockClear();
    props.setName.mockClear();
    props.setStartDate.mockClear();
    props.setTotalCost.mockClear();
    props.setCostForYear.mockClear();
    props.setNumberOfHoursForYear.mockClear();
    props.setHourlyRateForYear.mockClear();
  });

  test('renders correctly', () => {
    const component = shallow(<ContractorForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('renders if use hourly data is selected', () => {
    props.item.hourly.useHourly = true;
    const component = shallow(<ContractorForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('handles changing the contractor name', () => {
    const component = shallow(<ContractorForm {...props} />);
    component
      .findWhere(c => c.prop('name') === 'contractor-name')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setName).toHaveBeenCalledWith(
      'activity index',
      1,
      'new value'
    );
  });

  test('handles changing the contractor description', () => {
    const component = shallow(<ContractorForm {...props} />);
    component
      .findWhere(c => c.prop('name') === 'contractor-description')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setDescription).toHaveBeenCalledWith(
      'activity index',
      1,
      'new value'
    );
  });

  test('handles changing the contractor total cost', () => {
    const component = shallow(<ContractorForm {...props} />);
    component
      .findWhere(c => c.prop('name') === 'contractor-total-cost')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.setTotalCost).toHaveBeenCalledWith(
      'activity index',
      1,
      'new value'
    );
  });

  test('handles changing the contractor start date', () => {
    const component = shallow(<ContractorForm {...props} />);
    component
      .findWhere(c => c.name() === 'DateField' && c.prop('label') === 'Start')
      .simulate('change', 'ignored stuff', 'new start date');

    expect(props.setStartDate).toHaveBeenCalledWith(
      'activity index',
      1,
      'new start date'
    );
  });

  test('handles changing the contractor end date', () => {
    const component = shallow(<ContractorForm {...props} />);
    component
      .findWhere(c => c.name() === 'DateField' && c.prop('label') === 'End')
      .simulate('change', 'ignored stuff', 'new end date');

    expect(props.setEndDate).toHaveBeenCalledWith(
      'activity index',
      1,
      'new end date'
    );
  });

  test('handles toggling hourly resource off', () => {
    const component = shallow(<ContractorForm {...props} />);
    component
      .findWhere(
        c => c.name() === 'ChoiceComponent' && c.prop('value') === 'no'
      )
      .simulate('change');

    expect(props.setIsHourly).toHaveBeenCalledWith('activity index', 1, false);
  });

  test('handles toggling hourly resource on', () => {
    const component = shallow(<ContractorForm {...props} />);
    component
      .findWhere(
        c => c.name() === 'ChoiceComponent' && c.prop('value') === 'yes'
      )
      .simulate('change');

    expect(props.setIsHourly).toHaveBeenCalledWith('activity index', 1, true);
  });

  test('handles changing the contractor yearly cost', () => {
    props.item.hourly.useHourly = false;
    const component = shallow(<ContractorForm {...props} />);

    component
      .findWhere(c => c.prop('name') === 'contractor-cost-ffy-1066')
      .simulate('change', { target: { value: 773 } });

    expect(props.setCostForYear).toHaveBeenCalledWith(
      'activity index',
      1,
      '1066',
      773
    );
  });

  test('handles changing the contractor yearly cost', () => {
    props.item.hourly.useHourly = true;
    const parentComponent = shallow(<ContractorForm {...props} />);
    const component = shallow(
      parentComponent
        .findWhere(
          c => c.name() === 'ChoiceComponent' && c.prop('value') === 'yes'
        )
        .prop('checkedChildren')
    );

    component
      .findWhere(c => c.prop('name') === 'contractor-num-hours-ffy-1066')
      .simulate('change', { target: { value: 3752 } });

    expect(props.setNumberOfHoursForYear).toHaveBeenCalledWith(
      'activity index',
      1,
      '1066',
      3752
    );
  });

  test('handles changing the contractor yearly cost', () => {
    props.item.hourly.useHourly = true;
    const parentComponent = shallow(<ContractorForm {...props} />);
    const component = shallow(
      parentComponent
        .findWhere(
          c => c.name() === 'ChoiceComponent' && c.prop('value') === 'yes'
        )
        .prop('checkedChildren')
    );

    component
      .findWhere(c => c.prop('name') === 'contractor-hourly-rate-ffy-1067')
      .simulate('change', { target: { value: 9364 } });

    expect(props.setHourlyRateForYear).toHaveBeenCalledWith(
      'activity index',
      1,
      '1067',
      9364
    );
  });
});
