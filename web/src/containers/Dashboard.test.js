import { shallow } from 'enzyme';
import React from 'react';

import { plain as Dashboard, mapStateToProps } from './Dashboard';

describe('general dashboard component', () => {
  test('renders correctly if not an admin', () => {
    const component = shallow(<Dashboard isAdmin={false} />);
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if yes an admin', () => {
    const component = shallow(<Dashboard isAdmin />);
    expect(component).toMatchSnapshot();
  });

  test('maps state to props', () => {
    expect(
      mapStateToProps({
        user: {
          data: {
            role: 'some value'
          }
        }
      })
    ).toEqual({ isAdmin: false });

    expect(
      mapStateToProps({
        user: {
          data: {
            role: 'admin'
          }
        }
      })
    ).toEqual({ isAdmin: true });
  });
});
