import React from 'react';
import renderer from 'react-test-renderer';

import 'jest-styled-components';

import Alert, { alertColors as colors } from './Alert';

describe('the Alert styled component', () => {
  test('renders "success" alert', () => {
    const tree = renderer.create(<Alert kind="success" />).toJSON();
    expect(tree).toHaveStyleRule('background-color', colors.success[0]);
  });

  test('renders "warning" alert', () => {
    const tree = renderer.create(<Alert kind="warning" />).toJSON();
    expect(tree).toHaveStyleRule('background-color', colors.warning[0]);
  });

  test('renders "error" alert', () => {
    const tree = renderer.create(<Alert kind="error" />).toJSON();
    expect(tree).toHaveStyleRule('background-color', colors.error[0]);
  });

  test('renders fallback alert when unspecified', () => {
    const tree = renderer.create(<Alert />).toJSON();
    expect(tree).toHaveStyleRule('background-color', colors.fallback[0]);
  });

  test('renders fallback alert when type does not match', () => {
    const tree = renderer.create(<Alert kind="foo" />).toJSON();
    expect(tree).toHaveStyleRule('background-color', colors.fallback[0]);
  });
});
