import { shallow } from 'enzyme';
import React from 'react';

import {
  setMilestoneEndDate,
  setMilestoneName
} from '../../../actions/editActivity';

jest.spyOn(React, 'useContext');
React.useContext.mockImplementation(() => ({
  index: 'activity index'
}));

const { plain: MilestoneForm, mapDispatchToProps } = require('./MilestoneForm');

describe('the MilestoneForm component', () => {
  const setEndDate = jest.fn();
  const setName = jest.fn();

  const component = shallow(
    <MilestoneForm
      index={3252}
      item={{
        // Operation Torch, the Allied invasion of North Africa, is launched
        // to relieve pressure on Egypt and provide an invasion route into
        // southern Europe,
        endDate: '1942-8-16',
        name: 'Milestone name'
      }}
      setEndDate={setEndDate}
      setName={setName}
    />
  );

  beforeEach(() => {
    setEndDate.mockClear();
    setName.mockClear();
  });

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    test('handles changing the milestone name', () => {
      component
        .find('TextField')
        .simulate('change', { target: { value: 'new name' } });
      expect(setName).toHaveBeenCalledWith('activity index', 3252, 'new name');
    });

    test('handles changing the milestone date', () => {
      component
        .find('DateField')
        .simulate('change', 'ignored text', 'new date');
      expect(setEndDate).toHaveBeenCalledWith(
        'activity index',
        3252,
        'new date'
      );
    });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      setEndDate: setMilestoneEndDate,
      setName: setMilestoneName
    });
  });
});
