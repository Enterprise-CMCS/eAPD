import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import {
  plain as EntryDetails,
  mapStateToProps,
  mapDispatchToProps
} from './EntryDetails';
import {
  removeActivity,
  toggleActivitySection
} from '../../actions/activities';

describe('the (Activity) EntryDetails component', () => {
  const props = {
    activity: {
      name: 'activity name'
    },
    aKey: 'activity-key',
    expanded: false,
    num: 3,
    removeActivity: sinon.stub(),
    toggleSection: sinon.stub()
  };

  beforeEach(() => {
    props.toggleSection.resetHistory();
  });

  test('renders correctly', () => {
    const component = shallow(<EntryDetails {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('toggles its collapse state', () => {
    const component = shallow(<EntryDetails {...props} />);
    component
      .dive()
      .find('button')
      .simulate('click');

    expect(props.toggleSection.calledOnce).toBeTruthy();
  });

  test('maps redux state to component props', () => {
    const activity = {
      fundingSource: 'FUNDING!',
      meta: { expanded: 'bloop' },
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
      activity,
      expanded: 'bloop'
    });
  });

  test('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      removeActivity,
      toggleSection: toggleActivitySection
    });
  });
});
