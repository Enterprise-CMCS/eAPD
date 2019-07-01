import { shallow } from 'enzyme';
import React from 'react';

import { plain as EntryDetails, mapStateToProps } from './EntryDetails';

describe('the (Activity) EntryDetails component', () => {
  const props = {
    activity: {
      name: 'activity name'
    },
    aKey: 'activity-key',
    num: 3
  };

  test('renders correctly', () => {
    const component = shallow(<EntryDetails {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('maps redux state to component props', () => {
    const activity = {
      fundingSource: 'FUNDING!',
      name: 'activity name'
    };

    expect(
      mapStateToProps(
        {
          activities: {
            byKey: {
              key: activity
            }
          }
        },
        { aKey: 'key', num: 3 }
      )
    ).toEqual({
      activity
    });
  });
});
