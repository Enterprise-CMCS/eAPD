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

  describe('events', () => {
    const list = component.find('FormAndReviewList');

    it('handles adding a new state person', () => {
      list.prop('onAddClick')();
      expect(props.addPerson).toHaveBeenCalledWith('activity key');
    });

    it('handles deleting a state person', () => {
      list.prop('onDeleteClick')('person key');
      expect(props.removePerson).toHaveBeenCalledWith(
        'activity key',
        'person key'
      );
    });

    it('handles editing a state personnel cost for a fiscal year', () => {
      list.prop('handleEditCost')(3, 2014, 'new cost');
      expect(props.updateActivity).toHaveBeenCalledWith(
        'activity key',
        {
          statePersonnel: { 3: { years: { 2014: { amt: 'new cost' } } } }
        },
        true
      );
    });

    it('handles editing a state personnel FTE for a fiscal year', () => {
      list.prop('handleEditFTE')(3, 2014, 'new FTE');
      expect(props.updateActivity).toHaveBeenCalledWith(
        'activity key',
        {
          statePersonnel: { 3: { years: { 2014: { perc: 'new FTE' } } } }
        },
        true
      );
    });

    it('handles editing a state personnel description', () => {
      list.prop('handleEditPersonDesc')(3, 'new description');
      expect(props.updateActivity).toHaveBeenCalledWith('activity key', {
        statePersonnel: { 3: { desc: 'new description' } }
      });
    });

    it('handles editing a state personnel title', () => {
      list.prop('handleEditPersonTitle')(3, 'new title');
      expect(props.updateActivity).toHaveBeenCalledWith('activity key', {
        statePersonnel: { 3: { title: 'new title' } }
      });
    });
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
