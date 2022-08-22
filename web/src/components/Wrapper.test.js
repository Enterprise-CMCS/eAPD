import { shallow } from 'enzyme';
import React from 'react';

import { plain as Wrapper } from './Wrapper';

describe('Wrapper component', () => {
  test('renders correctly in dev mode', () => {
    const component = shallow(
      <Wrapper isDev location={{ pathname: '/' }}>
        child content
      </Wrapper>
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly in non-dev mode', () => {
    const component = shallow(
      <Wrapper isDev={false} location={{ pathname: '/' }}>
        child content
      </Wrapper>
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly for a non-root path', () => {
    const component = shallow(
      <Wrapper isDev={false} location={{ pathname: '/not-root' }}>
        child content
      </Wrapper>
    );
    expect(component).toMatchSnapshot();
  });

  describe('sets the appropriate CSS class if we are on a "gray" path', () => {
    test(`renders correctly for the /login path`, () => {
      const component = shallow(
        <Wrapper isDev={false} location={{ pathname: '/login' }}>
          child content
        </Wrapper>
      );
      expect(component).toMatchSnapshot();
    });
  });
});
