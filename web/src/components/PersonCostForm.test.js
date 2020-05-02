import { mount } from 'enzyme';
import React from 'react';

import PersonCostForm from './PersonCostForm';

describe('PersonCostForm component', () => {
  const props = {
    items: {
      1972: { amt: 100000, perc: 1 },
      1973: { amt: 120000, perc: 0.75 }
    },
    setCost: jest.fn(),
    setFTE: jest.fn()
  };
  const component = mount(<PersonCostForm {...props} />);

  beforeEach(() => {
    props.setCost.mockClear();
    props.setFTE.mockClear();
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  // can't get this to work with DollarField whether using mount or shallow
  // with mount I just get "Number of calls: 0"
  // with shallow I get "ShallowWrapper::update() can only be called when wrapping one node"
  // I'm pretty sure "simulate" calls "update" internally
  /*
  it(`handles changing the first year cost field`, () => {
    shallow(<PersonCostForm {...props} />)
      .find('DollarField[name="cost"]')
      .first()
      .simulate('change', { target: { value: '100001' } });

    expect(props.setCost).toHaveBeenCalledWith('1972', 100001);
  });
*/
  it(`handles changing the first year cost field`, () => {
    component
      .find('input[name="cost"]')
      .first()
      .simulate('change', { target: { value: '100001' } });

    expect(props.setCost).toHaveBeenCalledWith('1972', 100001);
  });

  it(`handles changing the second year cost field`, () => {
    component
      .find('input[name="cost"]')
      .last()
      .simulate('change', { target: { value: '120001' } });

    expect(props.setCost).toHaveBeenCalledWith('1973', 120001);
  });

  it(`handles changing the first year fte field`, () => {
    component
      .find('input[name="ftes"]')
      .first()
      .simulate('change', { target: { value: '0.75' } });

    expect(props.setFTE).toHaveBeenCalledWith('1972', '0.75');
  });

  it(`handles changing the second year fte field`, () => {
    component
      .find('input[name="ftes"]')
      .last()
      .simulate('change', { target: { value: '2' } });

    expect(props.setFTE).toHaveBeenCalledWith('1973', '2');
  });
});
