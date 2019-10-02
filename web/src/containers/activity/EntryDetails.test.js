import { shallow } from 'enzyme';
import React from 'react';

import EntryDetails from './EntryDetails';

describe('the (Activity) EntryDetails component', () => {
  const props = {
    activity: {
      key: 'activity key',
      name: 'activity name'
    },
    index: 2
  };

  test('renders correctly', () => {
    const component = shallow(<EntryDetails {...props} />);
    expect(component).toMatchSnapshot();
  });
});
