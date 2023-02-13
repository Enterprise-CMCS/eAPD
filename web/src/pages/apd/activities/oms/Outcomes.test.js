import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as OutcomesAndMetrics,
  mapStateToProps,
  mapDispatchToProps
} from './Outcomes';
import { removeOutcome } from '../../../../redux/actions/editActivity';

describe('activity Outcomes and Metrics component', () => {
  const activityIndex = 0;
  const props = {
    activityIndex,
    outcomes: [
      { key: 'outcome 1' },
      { key: 'outcome 2' },
      { key: 'outcome 3' }
    ],
    remove: jest.fn()
  };
  const component = shallow(<OutcomesAndMetrics {...props} />);

  beforeEach(() => {
    props.remove.mockClear();
  });

  it('renders properly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    const list = component.find('FormAndReviewList');

    it('handles deleting an outcome', () => {
      list.prop('onDeleteClick')(1);
      expect(props.remove).toHaveBeenCalledWith(activityIndex, 1);
    });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      remove: removeOutcome
    });
  });

  it('maps appropriate state to props', () => {
    const state = {
      apd: {
        data: {
          activities: [
            'activity 1',
            'activity 2',
            { outcomes: 'these are OMs from state' }
          ],
          apdType: 'HITECH'
        }
      }
    };

    const ownProps = { activityIndex: 2 };

    expect(mapStateToProps(state, ownProps)).toEqual({
      outcomes: 'these are OMs from state'
    });
  });
});
