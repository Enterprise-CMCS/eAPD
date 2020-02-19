import { shallow } from 'enzyme';
import React from 'react';

import { plain as KeyPersonForm, mapDispatchToProps } from './ApdKeyPersonForm';

import {
  setKeyPersonCost,
  setKeyPersonEmail,
  setKeyPersonHasCosts,
  setKeyPersonName,
  setKeyPersonPercentTime,
  setKeyPersonRole
} from '../../actions/editApd';

describe('the ApdKeyPersonForm component', () => {
  const props = {
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

    setCost: jest.fn(),
    setEmail: jest.fn(),
    setHasCosts: jest.fn(),
    setName: jest.fn(),
    setRole: jest.fn(),
    setTime: jest.fn(),

    years: ['1992', '1993']
  };

  const component = shallow(<KeyPersonForm {...props} />);

  beforeEach(() => {
    props.setCost.mockClear();
    props.setEmail.mockClear();
    props.setHasCosts.mockClear();
    props.setName.mockClear();
    props.setRole.mockClear();
    props.setTime.mockClear();
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders correctly if the person does not have costs', () => {
    expect(
      shallow(
        <KeyPersonForm {...props} item={{ ...props.item, hasCosts: false }} />
      )
    ).toMatchSnapshot();
  });

  describe('events', () => {
    [
      ['apd-state-profile-pocname1', 'name', props.setName],
      ['apd-state-profile-pocemail1', 'email', props.setEmail],
      ['apd-state-profile-pocposition1', 'role', props.setRole],
      ['apd-state-profile-pocpercentTime1', 'time', props.setTime]
    ].forEach(([formName, property, action]) => {
      it(`handles changing the ${property}`, () => {
        component
          .findWhere(c => c.prop('name') === formName)
          .simulate('change', { target: { value: 'new value' } });

        expect(action).toHaveBeenCalledWith(1, 'new value');
      });
    });

    it('handles toggling hasCosts off', () => {
      component
        .findWhere(
          c => c.name() === 'ChoiceComponent' && c.prop('value') === 'no'
        )
        .simulate('change');

      expect(props.setHasCosts).toHaveBeenCalledWith(1, false);
    });

    it('handles toggling hasCosts on', () => {
      component
        .findWhere(
          c => c.name() === 'ChoiceComponent' && c.prop('value') === 'yes'
        )
        .simulate('change');

      expect(props.setHasCosts).toHaveBeenCalledWith(1, true);
    });

    it('handles changing cost for FFY', () => {
      const hasCostsForm = shallow(
        component
          .findWhere(
            c => c.name() === 'ChoiceComponent' && c.prop('value') === 'yes'
          )
          .prop('checkedChildren')
      );

      hasCostsForm
        .find('DollarField')
        .first()
        .simulate('change', { target: { value: 9000 } });

      expect(props.setCost(1, 1992, 9000));
    });
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      setCost: setKeyPersonCost,
      setEmail: setKeyPersonEmail,
      setHasCosts: setKeyPersonHasCosts,
      setName: setKeyPersonName,
      setRole: setKeyPersonRole,
      setTime: setKeyPersonPercentTime
    });
  });
});
