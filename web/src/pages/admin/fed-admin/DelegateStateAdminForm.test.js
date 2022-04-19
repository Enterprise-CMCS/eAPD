import React from 'react';
// import {
// renderWithConnection,
// act
// screen,
// within,
// waitFor
// } from 'apd-testing-library';
// import userEvent from '@testing-library/user-event';
import { renderWithConnection } from 'apd-testing-library';

import { plain as DelegateStateAdminForm } from './DelegateStateAdminForm';

const defaultProps = {
  item: {
    ffy: 2022,
    name: 'Walter White',
    email: 'walter@white.com',
    phone: '9876543210',
    state: 'New Mexico',
    fileUrl: ''
  },
  id: 'state admin delegate 1',
  key: 'key 1'
};

const setup = (props = {}) => {
  renderWithConnection(<DelegateStateAdminForm {...defaultProps} {...props} />);
};

// const setup = async (props = {}) => {
//   const renderUtils = await act(async () => {
//     renderWithConnection(
//       <DelegateStateAdminForm {...defaultProps} {...props} />
//     );
//   });
//   return renderUtils;
// };

xdescribe('the DelegateStateAdminForm component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly', async () => {
    await setup();
    // expect(screen.getByTestId('email').toHaveValue(defaultProps.item.email));
  });
});
