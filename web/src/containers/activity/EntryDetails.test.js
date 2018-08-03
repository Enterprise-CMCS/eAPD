import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import {
  EntryDetailsRaw as EntryDetails,
  mapStateToProps,
  mapDispatchToProps
} from './EntryDetails';
import {
  removeActivity,
  toggleActivitySection
} from '../../actions/activities';

describe('the (Activity) EntryDetails component', () => {
  const props = {
    aKey: 'activity-key',
    expanded: false,
    num: 3,
    removeActivity: sinon.stub(),
    title: 'Activity title',
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
    expect(
      mapStateToProps(
        {
          activities: {
            byKey: {
              key: {
                fundingSource: 'FUNDING!',
                meta: { expanded: 'bloop' },
                name: 'activity name'
              }
            }
          }
        },
        { aKey: 'key', num: 3 }
      )
    ).toEqual({
      expanded: 'bloop',
      title: 'Program Activities › Activity 3: activity name (FUNDING!)'
    });
  });

  test('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      removeActivity,
      toggleSection: toggleActivitySection
    });
  });
});
