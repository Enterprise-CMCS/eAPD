import { mount } from 'enzyme';
import React from 'react';

import NumberField from './NumberField';

describe('NumberField component', () => {
  it('renders correctly', () => {
    expect(
      mount(
        <NumberField
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

  it('selects the text field content if the value is zero', () => {
    const ref = { current: null };

    mount(
      <NumberField
        fieldRef={ref}
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        value="0"
        onChange={jest.fn()}
      />
    );

    ref.current.select = jest.fn();
    ref.current.focus();

    expect(ref.current.select).toHaveBeenCalled();
  });

  it('does not select the text field content if the value is not zero', () => {
    const ref = { current: null };

    mount(
      <NumberField
        fieldRef={ref}
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        value="123"
        onChange={jest.fn()}
      />
    );

    ref.current.select = jest.fn();
    ref.current.focus();

    expect(ref.current.select).not.toHaveBeenCalled();
  });

  it('removes the inputc field event listeners when the NumberField component is unmounted', () => {
    const ref = { current: null };

    const component = mount(
      <NumberField
        fieldRef={ref}
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        value="123"
        onChange={jest.fn()}
      />
    );

    const removeEventListener = jest.fn();
    ref.current.removeEventListener = removeEventListener;
    component.unmount();

    expect(removeEventListener).toHaveBeenCalled();
    expect(ref.current).toEqual(null);
  });
});
