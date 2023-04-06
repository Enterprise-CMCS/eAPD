import { shallow } from 'enzyme';
import React from 'react';
import { APD_TYPE } from '@cms-eapd/common';

import {
  plain as StatePersonnel,
  mapStateToProps,
  mapDispatchToProps
} from './StatePersonnel';

import { removePersonnel } from '../../../../redux/actions/editActivity';

describe('activity state personnel costs subsection', () => {
  const props = {
    activityIndex: 72,
    personnel: [
      {
        category: 'test category',
        desc: 'test desc',
        key: 'personnel key',
        years: {
          2027: 34355,
          2028: 48833
        }
      }
    ],
    remove: jest.fn()
  };
  const component = shallow(<StatePersonnel {...props} />);

  beforeEach(() => {
    props.remove.mockClear();
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    const list = component.find('FormAndReviewList');

    it('handles deleting a state person', () => {
      list.prop('onDeleteClick')(0);
      expect(props.remove).toHaveBeenCalledWith(72, 0);
    });
  });

  it('maps state to props', () => {
    expect(
      mapStateToProps(
        {
          apd: {
            data: {
              apdType: APD_TYPE.HITECH,
              activities: [
                {
                  statePersonnel: 'these are personnel'
                },
                {}
              ],
              years: [2027, 2028]
            }
          }
        },
        { activityIndex: 0 }
      )
    ).toEqual({
      personnel: 'these are personnel',
      apdType: 'HITECH',
      years: [2027, 2028]
    });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      remove: removePersonnel
    });
  });
});
