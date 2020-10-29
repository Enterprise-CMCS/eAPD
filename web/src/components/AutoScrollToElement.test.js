import { shallow } from 'enzyme';
import React from 'react';

import { plain as AutoScrollToElement } from './AutoScrollToElement';

const props = {
  location: {
    hash: '#element-id'
  },
  action: 'PUSH'
};

describe('<AutoScrollToElement /> component', () => {
  // https://blog.carbonfive.com/shallow-testing-hooks-with-enzyme/
  let useEffect;
  let scrollIntoView;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');
    scrollIntoView = jest.fn();
    document.querySelector = jest.fn(() => ({ scrollIntoView }));
    window.scrollTo = jest.fn();
    window.scrollBy = jest.fn();

    mockUseEffect();
    mockUseEffect();
    shallow(<AutoScrollToElement {...props} />);
  });

  afterEach(() => {
    useEffect.mockClear();
    document.querySelector.mockClear();
    window.scrollTo.mockClear();
    window.scrollBy.mockClear();
  });

  it('scrolls to the top of the screen', () => {
    expect(window.scrollTo).toBeCalledWith(0, 0);
  });

  it('finds the element within the page', () => {
    expect(document.querySelector).toBeCalledWith('#element-id');
  });

  it('scrolls to the element', () => {
    expect(scrollIntoView).toHaveBeenCalled();
  });

  it('compensates for the header', () => {
    expect(window.scrollBy).toBeCalledWith(0, -50);
  });
});
