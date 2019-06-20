import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import DollarField from './DollarField';

describe('DollarField component', () => {
  it('renders correctly, passing props down', () => {
    expect(
      mount(
        <DollarField
          label="test label"
          name="test name"
          size="medium"
          className="stuff"
          value="12332"
          onChange={jest.fn()}
        />
      )
    ).toMatchSnapshot();
  });

  it('passes back numeric values on change, but still renders masked', () => {
    const onChange = jest.fn();

    const component = mount(
      <DollarField
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        value="12332"
        onChange={onChange}
      />
    );

    act(() => {
      component.find('TextField').prop('onChange')({
        target: { value: '123,456' }
      });
    });
    component.update();

    expect(onChange).toHaveBeenCalledWith({ target: { value: 123456 } });
    expect(component).toMatchSnapshot();
  });
});
