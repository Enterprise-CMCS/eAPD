---
to: "web/src/<%= componentType %>/<%= componentPath ? `${componentPath}/` : ''%><%= componentName %>.test.js"
---

import React from 'react';
import { fireEvent, render, screen } from 'apd-testing-library';

import <%= componentName %> from './<%= componentName %>';

const defaultProps = {};

const setup = (props = {}) => render(<<%= componentName %> {...defaultProps} {...props} />);

describe('<%= componentName %> component', () => {
  it('should render', () => {
    setup();
    expect(true).toBe(true);
  });
});