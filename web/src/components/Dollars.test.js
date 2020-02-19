import { shallow as render } from 'enzyme';
import React from 'react';

import Dollars from './Dollars';

describe('Dollars formatting container', () => {
  describe('with not-numbers', () => {
    test('handles non-numeric children', () => {
      // Replace console.error with a fake function for now, so we don't
      // get console warnings about invalid props. They're invalid on
      // purpose this time.  :)
      const err = console.error; // eslint-disable-line no-console
      console.error = jest.fn(); // eslint-disable-line no-console

      expect(render(<Dollars>this is not a number</Dollars>)).toMatchSnapshot();
      expect(render(<Dollars>{true}</Dollars>)).toMatchSnapshot();
      expect(render(<Dollars>{false}</Dollars>)).toMatchSnapshot();

      // Now put console.error back.
      console.error = err; // eslint-disable-line no-console
    });

    test('handles NaN', () => {
      expect(render(<Dollars>{0 / 0}</Dollars>)).toMatchSnapshot();
    });

    test('handles infinity', () => {
      expect(render(<Dollars>{1 / 0}</Dollars>)).toMatchSnapshot();
    });
  });

  test('prints full numbers if long prop is set', () => {
    expect(render(<Dollars long>2857298672</Dollars>)).toMatchSnapshot();
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
