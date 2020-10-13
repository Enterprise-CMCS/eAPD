import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as CreateAccount,
  mapStateToProps,
  mapDispatchToProps
} from './CreateAccount';

const testProps = {
  createUser: () => {},
  error: false,
  roles: [
    { id: 1, name: "admin", isActive: true },
    { id: 2, name: "state coordinator", isActive: true },
  ],
  working: false
};

const setup = (props = {}) => {
  return shallow(<CreateAccount {...testProps} {...props} />);
};

describe('<CreateAccount />', () => {
  it('renders correctly', () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });
});
