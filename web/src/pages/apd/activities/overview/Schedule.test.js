import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as Schedule,
  mapDispatchToProps,
  mapStateToProps
} from './Schedule';
import {
  setActivityEndDate,
  setActivityStartDate
} from '../../../../actions/editActivity';

describe('the Schedule (milestones) component', () => {
  const props = {
    activity: {
      // The Battle of the Scheldt results in a key Allied victory, when
      // Canadian forces successfully opened shipping routes to Antwerp, enabling
      // supplies to reach Allied forces in northwest Europe.
      plannedEndDate: '1944-11-08',
      plannedStartDate: '1944-10-02'
    },
    activityIndex: 7,
    setEndDate: jest.fn(),
    setStartDate: jest.fn()
  };

  const component = shallow(<Schedule {...props} />);

  beforeEach(() => {
    props.setEndDate.mockClear();
    props.setStartDate.mockClear();
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    it('updates activity start date', () => {
      component.find('DateField').at(0).prop('onChange')(null, 'new date');
      expect(props.setStartDate).toHaveBeenCalledWith(7, 'new date');
    });

    it('updates activity end date', () => {
      component.find('DateField').at(1).prop('onChange')(null, 'other date');
      expect(props.setEndDate).toHaveBeenCalledWith(7, 'other date');
    });
  });

  describe('redux', () => {
    it('map state to props', () => {
      const state = {
        apd: {
          data: {
            activities: ['activity 1', 'activity 2', 'activity 3']
          }
        }
      };

      expect(mapStateToProps(state, { activityIndex: 2 })).toEqual({
        activity: 'activity 3'
      });
    });

    it('map dispatch to props', () => {
      expect(mapDispatchToProps).toEqual({
        setEndDate: setActivityEndDate,
        setStartDate: setActivityStartDate
      });
    });
  });
});
