import { shallow } from 'enzyme';
import React from 'react';

import MilestoneForm from './MilestoneForm';

describe('the MilestoneForm component', () => {
  const onChangeDate = jest.fn();
  const onChangeName = jest.fn();
  const collapse = jest.fn();

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
      onChangeDate={onChangeDate}
      onChangeName={onChangeName}
    />
  );

  beforeEach(() => {
    onChangeDate.mockClear();
    onChangeName.mockClear();
    collapse.mockClear();
  });

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    test('handles changing the milestone name', () => {
      component
        .find('TextField')
        .simulate('change', { target: { value: 'new name' } });
      expect(onChangeName).toHaveBeenCalledWith(3252, 'new name');
    });

    test('handles changing the milestone date', () => {
      component
        .find('DateField')
        .simulate('change', 'ignored text', 'new date');
      expect(onChangeDate).toHaveBeenCalledWith(3252, 'new date');
    });
  });
});
