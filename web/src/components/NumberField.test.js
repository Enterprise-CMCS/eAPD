import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import NumberField from './NumberField';

let onBlur;
let onChange;

const defaultProps = {
  label: 'test-label',
  name: 'test name',
  size: 'medium',
  className: 'stuff',
  value: '123'
};

// https://testing-library.com/docs/example-input-event/
const setup = (props = {}) => {
  const utils = render(<NumberField {...defaultProps} {...props} />);
  const input = screen.getByLabelText('test-label');
  return {
    input,
    ...utils
  };
};

describe('NumberField component', () => {
  beforeEach(() => {
    onBlur = jest.fn();
    onChange = jest.fn();
  });

  it('renders', () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
  });

  xit('renders the initial value with the mask', () => {
    const { input } = setup({ value: '1234' });
    expect(input.value).toBe('1,234');
  });

  it('blanks the input value when selected if value is zero', () => {
    const { input } = setup({ value: null });
    fireEvent.focus(input);
    expect(input.value).toBe('');
  });

  it('does not blank the input value when selected if value is zero', () => {
    const { input } = setup({ value: '0' });
    fireEvent.focus(input);
    expect(input.value).toBe('0');
  });

  it('does not blank the input value when selected if value is not zero', () => {
    const { input } = setup();
    fireEvent.focus(input);
    expect(input.value).toBe('123');
  });

  it('sets the input value to zero on blur if the value is blank', () => {
    const { input } = setup({ value: '' });
    fireEvent.blur(input);
    expect(input.value).toBe('');
  });

  it('does not change the input value on blur if the value is not zero', () => {
    const { input } = setup();
    fireEvent.blur(input);
    expect(input.value).toBe('123');
  });

  it('passes back numeric values on change', () => {
    const { input } = setup({ onChange });
    fireEvent.blur(input, { target: { value: '456,123' } });
    expect(onChange).toHaveBeenCalledWith({ target: { value: 456 } });
  });

  it('passes back rounded numeric values on change, but still renders with mask', () => {
    const { input } = setup({ onChange, mask: 'currency' });
    fireEvent.change(input, { target: { value: '123456.78999' } });
    expect(onChange).toHaveBeenCalledWith({ target: { value: 123456.79 } });
  });

  it('rounds numbers when the component loses focus, calls onBlur handler', () => {
    const { input } = setup({ onBlur, onChange, round: true });
    fireEvent.change(input, { target: { value: '456.78' } });
    fireEvent.focusOut(input);
    expect(onChange).toHaveBeenCalledWith({ target: { value: 457 } });
  });

  it('does not round numbers if the round setting is not set, calls onBlur', () => {
    const { input } = setup({ onBlur, onChange });
    fireEvent.blur(input, { target: { value: '456.78' } });
    expect(onBlur).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith({ target: { value: 456.78 } });
  });

  it('calls onChange with a number rounded to 4 decimal places, by default', () => {
    const { input } = setup({ onBlur, onChange });
    fireEvent.blur(input, { target: { value: '456.783129' } });
    expect(onBlur).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith({ target: { value: 456.7831 } });
  });

  it('calls onChange with rounded value when { round: true }', () => {
    const { input } = setup({ onChange, round: true });
    fireEvent.change(input, { target: { value: '456.783389' } });
    expect(onChange).toHaveBeenCalledWith({ target: { value: 457 } });
  });

  it('calls onChange with a partial number if non-numerics are entered', () => {
    const { input } = setup({ onBlur, onChange });
    fireEvent.blur(input, { target: { value: '123rgft' } });
    expect(onBlur).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith({ target: { value: 123 } });
  });

  it('calls onChange with the min value, if value is less than min', () => {
    const { input } = setup({ min: -5, onChange });
    fireEvent.change(input, { target: { value: '-10' } });
    expect(onChange).toHaveBeenCalledWith({ target: { value: -5 } });
  });
});
