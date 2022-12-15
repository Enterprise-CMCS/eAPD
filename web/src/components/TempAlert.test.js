import React from 'react';
import { renderWithConnection } from 'apd-testing-library';

import TempAlert from './TempAlert';

const setup = (props = {}, options = {}) => {
  return renderWithConnection(<TempAlert {...props} />, options);
};

describe('<TempAlert />', () => {
  it('displays apd success message');
});
