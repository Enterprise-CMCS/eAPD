import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';

import Root from './Root';

const mockStore = configureMockStore([]);

import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

describe('the Root component', () => {
  const props = { history: { listen: jest.fn() }, store: mockStore({}) };
  beforeEach(() => {
    resetLDMocks();
    mockFlags({ adminCheckFlag: true });
  });

  test('renders correctly', () => {
    const component = shallow(<Root {...props} />);
    expect(component).toMatchSnapshot();
  });
});
