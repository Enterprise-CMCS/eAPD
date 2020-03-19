import { shallow } from 'enzyme';
import React from 'react';

import ApdHeader from './ApdHeader';

describe('APD header', () => {
  it('renders correctly', () => {
    expect(
      shallow(
        <ApdHeader
          apdCreated="creation date"
          apdName="namey name"
          year="ffys"
        />
      )
    ).toMatchSnapshot();
  });
});
