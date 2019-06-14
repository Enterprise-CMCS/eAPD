import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import ContractorForm from './ContractorResourceForm';

describe('the ContractorResourceForm component', () => {
  const sandbox = sinon.createSandbox();

  const props = {
    handleChange: sandbox.stub(),
    handleHourlyChange: sandbox.spy(),
    handleTermChange: sandbox.stub(),
    handleUseHourly: sandbox.spy(),
    handleYearChange: sandbox.spy(),
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
    }
  };

  beforeEach(() => {
    sandbox.resetHistory();
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

  describe('handles changing fields', () => {
    [
      ['name', 'contractor-name'],
      ['desc', 'contractor-description'],
      ['totalCost', 'contractor-total-cost']
    ].forEach(([propName, fieldName]) => {
      it(`handles changing the ${propName} prop`, () => {
        const handler = sinon.spy();
        props.handleChange.returns(handler);

        const component = shallow(<ContractorForm {...props} />);

        component
          .findWhere(c => c.prop('name') === fieldName)
          .simulate('change', { target: { value: 'new value' } });

        expect(props.handleChange.calledWith(1, propName)).toEqual(true);
        expect(handler.calledWith({ target: { value: 'new value' } })).toEqual(
          true
        );
      });
    });

    it('handles changing the start date', () => {
      const handler = sinon.spy();
      props.handleTermChange.returns(handler);

      const component = shallow(<ContractorForm {...props} />);
      component
        .findWhere(c => c.name() === 'DateField' && c.prop('label') === 'Start')
        .simulate('change', 'ignored stuff', 'new start date');

      expect(props.handleTermChange.calledWith(1)).toEqual(true);
      expect(
        handler.calledWith({
          end: '1066-10-15',
          start: 'new start date'
        })
      ).toEqual(true);
    });

    it('handles changing the end date', () => {
      const handler = sinon.spy();
      props.handleTermChange.returns(handler);

      const component = shallow(<ContractorForm {...props} />);
      component
        .findWhere(c => c.name() === 'DateField' && c.prop('label') === 'End')
        .simulate('change', 'ignored stuff', 'new end date');

      expect(props.handleTermChange.calledWith(1)).toEqual(true);
      expect(
        handler.calledWith({
          end: 'new end date',
          start: '1066-10-14'
        })
      ).toEqual(true);
    });
  });

  // I'm not sure how to test changing the number of hours and hourly rate
  // fields because they are nodes passed as props to a Choice. Really not
  // clear about how to get those...
});
