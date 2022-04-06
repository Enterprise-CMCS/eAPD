import React from 'react';
import { render, axe } from 'apd-testing-library';

import Loading from './Loading';

describe('Loading', () => {
  it('should not fail any accessibility tests', async () => {
    const { container } = render(<Loading>Hello World</Loading>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
