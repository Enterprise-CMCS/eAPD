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

  it('blanks the text field content when selected if the value is zero', () => {
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

    ref.current.focus();

    expect(ref.current.value).toEqual('');
  });

  it('sets the text field content to zero on blur if the value is blank', () => {
    const ref = { current: null };

    mount(
      <NumberField
        fieldRef={ref}
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        value=""
        onChange={jest.fn()}
      />
    );

    ref.current.focus();
    ref.current.blur();

    expect(ref.current.value).toEqual('0');
  });

  it('does not blank the text field content on blur if the value is not zero', () => {
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

    ref.current.focus();
    ref.current.blur();

    expect(ref.current.value).toEqual('123');
  });

  it('removes the input field event listeners when the NumberField component is unmounted', () => {
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

  it('passes back numeric values on change, but still renders with mask', () => {
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

  it('passes back rounded numeric values on change, but still renders with mask', () => {
    const onChange = jest.fn();

    const component = mount(
      <NumberField
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        round
        mask="currency"
        value="12332"
        onChange={onChange}
      />
    );

    act(() => {
      component.find('TextField').prop('onChange')({
        target: { value: '123,456.78' }
      });
    });
    component.update();

    expect(onChange).toHaveBeenCalledWith({ target: { value: 123457 } });
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

  it('it limits numbers to 4 decimal places if the round setting is not set, calls onBlur handler', () => {
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
        target: { value: '456.783129' }
      });
    });

    expect(onBlur).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith({ target: { value: 456.7831 } });
    expect(component).toMatchSnapshot();
  });

  it('passes back numeric values on change limited to 4 decimal places', () => {
    const onChange = jest.fn();

    const component = mount(
      <NumberField
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
        target: { value: '456.783389' }
      });
    });
    component.update();

    expect(onChange).toHaveBeenCalledWith({ target: { value: 456.7834 } });
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

  it('returns min value, if value entered is less than min', () => {
    const onChange = jest.fn();

    const component = mount(
      <NumberField
        label="test label"
        name="test name"
        min={-5}
        onChange={onChange}
      />
    );

    act(() => {
      component.find('TextField').prop('onBlur')({
        target: { value: '-10' }
      });
    });

    expect(onChange).toHaveBeenCalledWith({ target: { value: -5 } });
  });
});
