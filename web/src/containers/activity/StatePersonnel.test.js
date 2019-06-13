import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as StatePersonnel,
  mapStateToProps,
  mapDispatchToProps
} from './StatePersonnel';

import {
  addActivityStatePerson,
  removeActivityStatePerson,
  updateActivity
} from '../../actions/activities';

describe('activity state personnel costs subsection', () => {
  const props = {
    activityKey: 'activity key',
    addPerson: jest.fn(),
    personnel: [
      {
        category: 'test category',
        desc: 'test desc',
        initialCollapsed: false,
        key: 'personnel key',
        years: {
          2027: 34355,
          2028: 48833
        }
      }
    ],
    removePerson: jest.fn(),
    updateActivity: jest.fn()
  };
  const component = shallow(<StatePersonnel {...props} />);

  beforeEach(() => {
    props.addPerson.mockClear();
    props.removePerson.mockClear();
    props.updateActivity.mockClear();
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('maps state to props', () => {
    expect(
      mapStateToProps(
        {
          activities: {
            byKey: {
              'activity 1': {
                statePersonnel: 'these are personnel'
              },
              'activity 2': {}
            }
          }
        },
        { aKey: 'activity 1' }
      )
    ).toEqual({ activityKey: 'activity 1', personnel: 'these are personnel' });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      addPerson: addActivityStatePerson,
      removePerson: removeActivityStatePerson,
      updateActivity
    });
  });
});
