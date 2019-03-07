import { shallow as render } from 'enzyme';
import React from 'react';

import Dollars from './Dollars';

describe('Dollars formatting container', () => {
  describe('with not-numbers', () => {
    test('handles non-numeric children', () => {
      expect(render(<Dollars>this is not a number</Dollars>)).toMatchSnapshot();
      expect(render(<Dollars>{true}</Dollars>)).toMatchSnapshot();
      expect(render(<Dollars>{false}</Dollars>)).toMatchSnapshot();
    });

    test('handles NaN', () => {
      expect(render(<Dollars>{0 / 0}</Dollars>)).toMatchSnapshot();
    });

    test('handles infinity', () => {
      expect(render(<Dollars>{1 / 0}</Dollars>)).toMatchSnapshot();
    });
  });

  test('prints full numbers below $100,000', () => {
    expect(render(<Dollars>50000</Dollars>)).toMatchSnapshot();
  });

  test('prints truncated numbers above $100,000', () => {
    expect(render(<Dollars>500000</Dollars>)).toMatchSnapshot();
  });

  test('shows B for billions instead of G for giga', () => {
    expect(render(<Dollars>50000000000</Dollars>)).toMatchSnapshot();
  });
});
