import { mount } from 'enzyme';
import React from 'react';

import { plain as MilestoneForm, mapDispatchToProps } from './MilestoneForm';

import { saveMilestone as actualSaveMilestone } from '../../../../../redux/actions/editActivity';

describe('the MilestoneForm component', () => {
  const saveMilestone = jest.fn();

  const component = mount(
    <MilestoneForm
      activityIndex={225}
      index={3252}
      item={{
        // Operation Torch, the Allied invasion of North Africa, is launched
        // to relieve pressure on Egypt and provide an invasion route into
        // southern Europe,
        endDate: '1942-8-16',
        milestone: 'Milestone name'
      }}
      saveMilestone={saveMilestone}
    />
  );

  beforeEach(() => {
    saveMilestone.mockClear();
  });

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    test('handles saving the milestone', () => {
      component.find('form').simulate('submit');
      expect(saveMilestone).toHaveBeenCalled();
    });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      saveMilestone: actualSaveMilestone
    });
  });
});
