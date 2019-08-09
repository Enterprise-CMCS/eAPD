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
    const component = mount(
      <NumberField
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        value="123"
        onChange={jest.fn()}
      />
    );

    const field = component.find('TextField').prop('fieldRef').current;

    field.select = jest.fn();
    field.value = '0';
    field.focus();

    expect(field.select).toHaveBeenCalled();
  });

  it('does not select the text field content if the value is not zero', () => {
    const component = mount(
      <NumberField
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        value="123"
        onChange={jest.fn()}
      />
    );

    const field = component.find('TextField').prop('fieldRef').current;

    field.select = jest.fn();
    field.value = '1';
    field.focus();

    expect(field.select).not.toHaveBeenCalled();
  });

  it('does not select the text field content if the value is not zero', () => {
    const component = mount(
      <NumberField
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        value="123"
        onChange={jest.fn()}
      />
    );

    const field = component.find('TextField').prop('fieldRef').current;

    field.removeEventListener = jest.fn();
    component.unmount();

    expect(field.removeEventListener).toHaveBeenCalled();
  });
});
