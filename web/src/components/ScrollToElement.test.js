import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import React from 'react';

import Root from './Root';
import ScrollToElement from '../components/ScrollToElement'

const mockStore = configureMockStore([]);

const props = {
  location: {
    pathname: '/apd/state-profile',
    hash: '#apd-state-profile-key-personnel'
  }
}

describe('<ScrollToElement /> component', () => {
  it('scrolls to the top of the screen', () => {
    window.scrollTo = jest.fn()
    const component = mount(
      <Root history={{}} store={mockStore}>
        <ScrollToElement {...props} />
      </Root>
    )
    expect(window.scrollTo).toBeCalledWith(0, 0)
  })
})
