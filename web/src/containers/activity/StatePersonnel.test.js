import { mount, shallow } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

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

  it('renders correctly when there are no expenses', () => {
    expect(
      shallow(
        <StatePersonnel
          activityKey="activity key"
          addPerson={jest.fn()}
          personnel={[]}
          removePerson={jest.fn()}
          updateActivity={jest.fn()}
        />
      )
    ).toMatchSnapshot();
  });

  it('handles adding a new personnel', () => {
    component.find('Button').simulate('click');
    expect(props.addPerson).toHaveBeenCalledWith('activity key');
  });

  it('handles updating a personnel title', () => {
    component.find('StatePerson').prop('handleEditPersonTitle')(3, 'new title');
    expect(props.updateActivity).toHaveBeenCalledWith('activity key', {
      statePersonnel: { 3: { title: 'new title' } }
    });
  });

  it('handles updating a personnel description', () => {
    component.find('StatePerson').prop('handleEditPersonDesc')(3, 'new desc');
    expect(props.updateActivity).toHaveBeenCalledWith('activity key', {
      statePersonnel: { 3: { desc: 'new desc' } }
    });
  });

  it('handles editing a personnel FY cost total', () => {
    component.find('StatePerson').prop('handleEditCost')(3, 2027, 982357);
    expect(props.updateActivity).toHaveBeenCalledWith(
      'activity key',
      {
        statePersonnel: { 3: { years: { 2027: { amt: 982357 } } } }
      },
      true
    );
  });

  it('handles editing a personnel FY FTE', () => {
    component.find('StatePerson').prop('handleEditFTE')(3, 2027, 1.5);
    expect(props.updateActivity).toHaveBeenCalledWith(
      'activity key',
      {
        statePersonnel: { 3: { years: { 2027: { perc: 1.5 } } } }
      },
      true
    );
  });

  it('handles deleting a person', () => {
    component.find('StatePerson').prop('handleDelete')();
    expect(props.removePerson).toHaveBeenCalledWith(
      'activity key',
      'personnel key'
    );
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
