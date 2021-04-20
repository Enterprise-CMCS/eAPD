import { shallow } from 'enzyme';
import React from 'react';

import { plain as Dashboard, mapStateToProps } from './Dashboard';

describe('general dashboard component', () => {
  test('renders correctly if not a federal user', () => {
    const component = shallow(<Dashboard isFederal={false} />);
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if federal user', () => {
    const component = shallow(<Dashboard isFederal />);
    expect(component).toMatchSnapshot();
  });

  test('maps state to props', () => {
    expect(
      mapStateToProps({
        user: {
          data: {
            state: {
              id: 'fd'
            }
          }
        }
      })
    ).toEqual({ isFederal: true });

    expect(
      mapStateToProps({
        user: {
          data: {
            state: {
              id: 'fl'
            }
          }
        }
      })
    ).toEqual({ isFederal: false });
  });
});
