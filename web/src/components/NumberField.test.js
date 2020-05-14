import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

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

  it('passes back numeric values on change, but still renders with currency mask', () => {
    const onChange = jest.fn();

    const component = mount(
      <NumberField
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        mask="currency"
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

  it('passes back numeric values on change, but still renders with zip code mask', () => {
    const onChange = jest.fn();

    const component = mount(
      <NumberField
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        mask="zip"
        value="54321"
        onChange={onChange}
      />
    );

    act(() => {
      component.find('TextField').prop('onChange')({
        target: { value: '12345-6789' }
      });
    });
    component.update();

    expect(onChange).toHaveBeenCalledWith({ target: { value: 123456789 } });
    expect(component).toMatchSnapshot();
  });

  it('passes back numeric values on change, but still renders with phone number mask', () => {
    const onChange = jest.fn();

    const component = mount(
      <NumberField
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        mask="phone"
        value="410"
        onChange={onChange}
      />
    );

    act(() => {
      component.find('TextField').prop('onChange')({
        target: { value: '410-555-1212' }
      });
    });
    component.update();

    expect(onChange).toHaveBeenCalledWith({ target: { value: 4105551212 } });
    expect(component).toMatchSnapshot();
  });

  it('passes back numeric values on change, but still renders with SSN mask', () => {
    const onChange = jest.fn();

    const component = mount(
      <NumberField
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        mask="ssn"
        value="66677"
        onChange={onChange}
      />
    );

    act(() => {
      component.find('TextField').prop('onChange')({
        target: { value: '666-77-8888' }
      });
    });
    component.update();

    expect(onChange).toHaveBeenCalledWith({ target: { value: 666778888 } });
    expect(component).toMatchSnapshot();
  });

  it('rounds numbers when the component loses focus, calls onBlur handler', () => {
    const onBlur = jest.fn();
    const onChange = jest.fn();

    const component = mount(
      <NumberField
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        value="12332"
        round
        onBlur={onBlur}
        onChange={onChange}
      />
    );

    act(() => {
      component.find('TextField').prop('onBlur')({
        target: { value: '456.78' }
      });
    });

    expect(onBlur).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith({ target: { value: 457 } });
    expect(component).toMatchSnapshot();
  });

  it('does not round numbers if the round setting is not set, calls onBlur handler', () => {
    const onBlur = jest.fn();
    const onChange = jest.fn();

    const component = mount(
      <NumberField
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
      component.find('TextField').prop('onBlur')({
        target: { value: '456.78' }
      });
    });

    expect(onBlur).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith({ target: { value: 456.78 } });
    expect(component).toMatchSnapshot();
  });

  it('returns partial number if non-numeric characters are entered', () => {
    const onBlur = jest.fn();
    const onChange = jest.fn();

    const component = mount(
      <NumberField
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        value="7"
        onBlur={onBlur}
        onChange={onChange}
      />
    );

    act(() => {
      component.find('TextField').prop('onBlur')({
        target: { value: '123rgft' }
      });
    });

    expect(onBlur).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith({ target: { value: 123 } });
    expect(component).toMatchSnapshot();
  });
});
