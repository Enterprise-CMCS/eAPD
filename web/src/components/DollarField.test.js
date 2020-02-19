import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import DollarField from './DollarField';

describe('DollarField component', () => {
  it('renders correctly for non-numeric initial values', () => {
    expect(
      mount(
        <DollarField
          label="test label"
          name="test name"
          size="medium"
          className="stuff"
          value="abc"
          onChange={jest.fn()}
        />
      )
    ).toMatchSnapshot();
  });

  it('renders correctly, does not add commas to small numbers, passing props down', () => {
    expect(
      mount(
        <DollarField
          label="test label"
          name="test name"
          size="medium"
          className="stuff"
          value="123"
          onChange={jest.fn()}
        />
      )
    ).toMatchSnapshot();
  });

  it('renders correctly, adds commas to big numbers, passing props down', () => {
    expect(
      mount(
        <DollarField
          label="test label"
          name="test name"
          size="medium"
          className="stuff"
          value="123321"
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

  it('rounds numbers when the component loses focus, but still calls onBlur handler', () => {
    const onBlur = jest.fn();
    const onChange = jest.fn();

    const component = mount(
      <DollarField
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        value="12332"
        onBlur={onBlur}
        onChange={onChange}
      />
    );

    act(() => {
      component.find('NumberField').prop('onBlur')({
        target: { value: '123,456.78' }
      });
    });

    expect(onBlur).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith({ target: { value: 123457 } });
    expect(component).toMatchSnapshot();
  });
});
