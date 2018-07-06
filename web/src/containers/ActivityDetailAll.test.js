import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import { removeActivity, toggleActivitySection } from '../actions/activities';

import {
  raw as ActivityDetailAll,
  mapStateToProps,
  mapDispatchToProps
} from './ActivityDetailAll';

describe('the Activities details container component', () => {
  const props = {
    aId: 'activity-id',
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
    const component = shallow(<ActivityDetailAll {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('toggles its collapse state', () => {
    const component = shallow(<ActivityDetailAll {...props} />);
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
            byId: {
              id: {
                fundingSource: 'FUNDING!',
                meta: { expanded: 'bloop' },
                name: 'activity name'
              }
            }
          }
        },
        { aId: 'id', num: 3 }
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
