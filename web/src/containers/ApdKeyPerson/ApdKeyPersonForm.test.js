import { shallow } from 'enzyme';
import React from 'react';

import ApdKeyPersonForm from './ApdKeyPersonForm';

describe('the ApdKeyPersonForm component', () => {
  const props = {
    handleChange: jest.fn(),
    handleYearChange: jest.fn(),
    index: 1,
    item: {
      costs: {
        '1992': 100,
        '1993': 300
      },
      email: 'email address',
      hasCosts: true,
      key: 'person key',
      name: 'Bob the Builder',
      percentTime: '32',
      position: 'The Builder'
    },
    years: ['1992', '1993']
  };

  const component = shallow(<ApdKeyPersonForm {...props} />);

  beforeEach(() => {
    props.handleChange.mockClear();
    props.handleYearChange.mockClear();
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders correctly if the person does not have costs', () => {
    expect(
      shallow(
        <ApdKeyPersonForm
          {...props}
          item={{ ...props.item, hasCosts: false }}
        />
      )
    ).toMatchSnapshot();
  });

  describe('events', () => {
    [
      ['apd-state-profile-pocname1', 'name'],
      ['apd-state-profile-pocemail1', 'email'],
      ['apd-state-profile-pocposition1', 'position'],
      ['apd-state-profile-pocpercentTime1', 'percentTime']
    ].forEach(([formName, propName]) => {
      it(`handles changing the ${propName}`, () => {
        component
          .findWhere(c => c.prop('name') === formName)
          .simulate('change', { target: { value: 'new value' } });

        expect(props.handleChange).toHaveBeenCalledWith(
          1,
          propName,
          'new value',
          false
        );
      });
    });

    it('handles toggling hasCosts off', () => {
      component
        .findWhere(c => c.name() === 'ChoiceComponent' && c.prop('value') === 'no')
        .simulate('change');
      expect(props.handleChange).toHaveBeenCalledWith(
        1,
        'hasCosts',
        false,
        true
      );
    });

    it('handles toggling hasCosts on', () => {
      component
        .findWhere(c => c.name() === 'ChoiceComponent' && c.prop('value') === 'yes')
        .simulate('change');
      expect(props.handleChange).toHaveBeenCalledWith(
        1,
        'hasCosts',
        true,
        true
      );
    });

    it('handles changing cost for FFY', () => {
      const hasCostsForm = shallow(
        component
          .findWhere(c => c.name() === 'ChoiceComponent' && c.prop('value') === 'yes')
          .prop('checkedChildren')
      );

      hasCostsForm
        .find('DollarField')
        .first()
        .simulate('change', { target: { value: 9000 } });

      expect(props.handleYearChange).toHaveBeenCalledWith(1, '1992', 9000);
    });
  });
});
