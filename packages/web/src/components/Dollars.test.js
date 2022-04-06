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

  test('prints dollar-formatted numbers', () => {
    expect(render(<Dollars>2857298672</Dollars>)).toMatchSnapshot();
  });
});
