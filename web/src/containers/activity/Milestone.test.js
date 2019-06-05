import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import Milestone from './Milestone';

describe('the Milestone component', () => {
  describe('when the milestone is initially collapsed', () => {
    const component = mount(
      <Milestone
        initialCollapsed
        idx={1}
        endDate="2100-10-10"
        name="milestone name"
        onChangeDate={jest.fn()}
        onChangeName={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    test('it renders correctly initially', () => {
      expect(component).toMatchSnapshot();
    });

    test('it renders correctly after being expanded', () => {
      act(() => {
        component.find('MilestoneReview').prop('expand')();
      });
      component.update();
      expect(component).toMatchSnapshot();
    });
  });

  describe('when the milestone is initially NOT collapsed', () => {
    const component = mount(
      <Milestone
        initialCollapsed={false}
        idx={1}
        endDate="2100-10-10"
        name="milestone name"
        onChangeDate={jest.fn()}
        onChangeName={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    test('it renders correctly initially', () => {
      expect(component).toMatchSnapshot();
    });

    test('it renders correctly after being collapsed', () => {
      act(() => {
        component.find('MilestoneForm').prop('collapse')();
      });
      component.update();
      expect(component).toMatchSnapshot();
    });
  });
});
