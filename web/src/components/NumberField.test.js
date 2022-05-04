import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberField from './NumberField';

const defaultProps = {
  label: 'test-label',
  name: 'test name',
  size: 'medium',
  className: 'stuff',
  value: '',
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

  it('does not change the input value on blur if the value is null', () => {
    const { input } = setup({ value: null });
    fireEvent.blur(input);
    expect(defaultProps.onBlur).toHaveBeenCalledWith({
      target: { value: null }
    });
  });

  it('does not change the input value on blur if the value is empty string', () => {
    const { input } = setup({ value: '' });
    fireEvent.blur(input);
    expect(defaultProps.onBlur).toHaveBeenCalledWith({
      target: { value: null }
    });
  });

  it('does not change the input value on blur if the value is zero', () => {
    const { input } = setup({ value: 0 });
    fireEvent.blur(input);
    expect(defaultProps.onBlur).toHaveBeenCalledWith({
      target: { value: 0 }
    });
  });

  it('does not change the input value on blur if the value is not zero', () => {
    const { input } = setup({ value: '123' });
    fireEvent.blur(input);
    expect(defaultProps.onBlur).toHaveBeenCalledWith({
      target: { value: 123 }
    });
  });

  it('passes back numeric values on change', () => {
    const { input } = setup({ value: null });
    userEvent.type(input, '456,123');
    expect(defaultProps.onChange).toHaveBeenCalledWith({
      target: { value: 456 }
    });
  });

  it('passes back rounded numeric values on change, but still renders with mask', () => {
    const { input } = setup({ mask: 'currency' });
    userEvent.type(input, '123456.78999');
    userEvent.tab();
    expect(defaultProps.onChange).toHaveBeenCalledTimes(12);
    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      target: { value: 123456.78 }
    });
    expect(defaultProps.onBlur).toHaveBeenCalledWith({
      target: { value: 123456.78 }
    });
  });

  it('rounds numbers when the component loses focus', () => {
    const { input } = setup({ value: '456.78', round: true });
    userEvent.click(input);
    userEvent.tab();
    expect(defaultProps.onBlur).toHaveBeenCalledWith({
      target: { value: 457 }
    });
  });

  it('does not round numbers if the round setting is not set', () => {
    const { input } = setup();
    userEvent.type(input, '456.78');
    expect(defaultProps.onChange).toHaveBeenCalledTimes(5);
    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      target: { value: 456.78 }
    });
  });

  it('calls onChange with a number rounded to 4 decimal places, by default', () => {
    const { input } = setup();
    userEvent.type(input, '456.783129');
    expect(defaultProps.onChange).toHaveBeenCalledTimes(9);
    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      target: { value: 456.783129 }
    });
    userEvent.tab();
    expect(defaultProps.onChange).toHaveBeenCalledTimes(10);
    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      target: { value: 456.7831 }
    });
  });

  it('calls onChange with rounded value when { round: true }', () => {
    const { input } = setup({ round: true });
    userEvent.type(input, '456.783389');
    expect(defaultProps.onChange).toHaveBeenCalledTimes(9);
    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      target: { value: 456.783389 }
    });
    userEvent.tab();
    expect(defaultProps.onChange).toHaveBeenCalledTimes(10);
    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      target: { value: 457 }
    });
  });

  it('calls onChange with a partial number if non-numerics are entered', () => {
    const { input } = setup();
    userEvent.type(input, '123rgft');
    expect(defaultProps.onChange).toHaveBeenCalledTimes(7);
    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      target: { value: 123 }
    });
  });

  it('calls onChange with the min value, if value is less than min', () => {
    const { input } = setup({ min: -5 });
    userEvent.type(input, '-10');
    expect(defaultProps.onChange).toHaveBeenCalledTimes(2);
    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      target: { value: -10 }
    });
    userEvent.tab();
    expect(defaultProps.onChange).toHaveBeenCalledTimes(3);
    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      target: { value: -5 }
    });
  });

  it('handles typing negative values', () => {
    const { input } = setup({ value: null });
    userEvent.type(input, '-123');
    expect(defaultProps.onChange).toHaveBeenCalledTimes(3);
    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      target: { value: -123 }
    });
  });

  it('handles typing all non-numeric characters', () => {
    const { input } = setup({ value: null });
    userEvent.type(input, 'ased@#$');
    expect(defaultProps.onChange).toHaveBeenCalledTimes(7);
    expect(defaultProps.onChange).toHaveBeenLastCalledWith({
      target: { value: null }
    });
  });

  it('handles typing the a negative float', () => {
    const { input } = setup({ value: null });
    userEvent.type(input, '-1.2');
    expect(defaultProps.onChange).toHaveBeenNthCalledWith(1, {
      target: { value: -1 }
    });
    expect(defaultProps.onChange).toHaveBeenNthCalledWith(2, {
      target: { value: -1.2 }
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
