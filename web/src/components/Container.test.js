import { shallow } from 'enzyme';
import React from 'react';

import Container from './Container';

describe('Container component', () => {
  test('renders correctly', () => {
    const component = shallow(
      <Container>
        <div className="test child" />
      </Container>
    );
    expect(component).toMatchSnapshot();
  });
});
