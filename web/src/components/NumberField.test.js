import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberField from './NumberField';

const defaultProps = {
  label: 'test-label',
  name: 'test name',
  size: 'medium',
  className: 'stuff',
  value: '123',
  onBlur: jest.fn(),
  onChange: jest.fn()
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
    jest.resetAllMocks();
  });

  it('renders', () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
  });

  it('renders the initial value with the mask', () => {
    const { input } = setup({ value: '1234', mask: 'currency' });
    fireEvent.blur(input);
    expect(input).toHaveValue('1,234');
  });

  it('blanks the input value when selected if value is zero', () => {
    const { input } = setup({ value: null });
    fireEvent.focus(input);
    expect(input).toHaveValue('');
  });

  it('does not blank the input value when selected if value is zero', () => {
    const { input } = setup({ value: '0' });
    fireEvent.focus(input);
    expect(input).toHaveValue('0');
  });

  it('does not blank the input value when selected if value is not zero', () => {
    const { input } = setup();
    fireEvent.focus(input);
    expect(input).toHaveValue('123');
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
    const { input } = setup();
    fireEvent.blur(input, { target: { value: '456,123' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith({
      target: { value: 456 }
    });
  });

  it('passes back rounded numeric values on change, but still renders with mask', () => {
    const { input } = setup({ mask: 'currency', value: '' });
    fireEvent.blur(input, { target: { value: '123456.78999' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith({
      target: { value: 123456.78 }
    });
    expect(defaultProps.onBlur).toHaveBeenCalledWith({
      target: { value: 123456.78 }
    });
  });

  it('rounds numbers when the component loses focus, calls onBlur handler', () => {
    const { input } = setup({ round: true });
    fireEvent.blur(input, { target: { value: '456.78' } });
    fireEvent.focusOut(input);
    expect(defaultProps.onChange).toHaveBeenCalledWith({
      target: { value: 457 }
    });
  });

  it('does not round numbers if the round setting is not set, calls onBlur', () => {
    const { input } = setup();
    fireEvent.blur(input, { target: { value: '456.78' } });
    expect(defaultProps.onBlur).toHaveBeenCalled();
    expect(defaultProps.onChange).toHaveBeenCalledWith({
      target: { value: 456.78 }
    });
  });

  it('calls onChange with a number rounded to 4 decimal places, by default', () => {
    const { input } = setup();
    fireEvent.blur(input, { target: { value: '456.783129' } });
    expect(defaultProps.onBlur).toHaveBeenCalled();
    expect(defaultProps.onChange).toHaveBeenCalledWith({
      target: { value: 456.7831 }
    });
  });

  it('calls onChange with rounded value when { round: true }', () => {
    const { input } = setup({ round: true });
    fireEvent.blur(input, { target: { value: '456.783389' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith({
      target: { value: 457 }
    });
  });

  it('calls onChange with a partial number if non-numerics are entered', () => {
    const { input } = setup();
    fireEvent.blur(input, { target: { value: '123rgft' } });
    expect(defaultProps.onBlur).toHaveBeenCalled();
    expect(defaultProps.onChange).toHaveBeenCalledWith({
      target: { value: 123 }
    });
  });

  it('calls onChange with the min value, if value is less than min', () => {
    const { input } = setup({ min: -5 });
    fireEvent.blur(input, { target: { value: '-10' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith({
      target: { value: -5 }
    });
  });

  it('calls onChange on blur and handles typing negative values', () => {
    const { input } = setup();
    userEvent.clear(input);
    userEvent.type(input, '-123');
    userEvent.tab();
    expect(defaultProps.onBlur).toHaveBeenCalledWith({
      target: { value: -123 }
    });
    expect(defaultProps.onChange).toHaveBeenCalledWith({
      target: { value: -123 }
    });
  });

  it('calls onChange on blur and handles typing all non-numeric characters', () => {
    const { input } = setup();
    userEvent.clear(input);
    userEvent.type(input, 'ased@#$');
    userEvent.tab();
    expect(defaultProps.onBlur).toHaveBeenCalledWith({
      target: { value: 'ased@#$' }
    });
    expect(defaultProps.onChange).toHaveBeenCalledWith({
      target: { value: 'ased@#$' }
    });
  });

  it('does not call onBlur if it is null', () => {
    const { input } = setup({ onBlur: null });
    fireEvent.blur(input);
    expect(defaultProps.onBlur).not.toHaveBeenCalled();
  });

  it('does not call onChange if it is null', () => {
    const { input } = setup({ onChange: null });
    fireEvent.blur(input);
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });
});
