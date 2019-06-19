import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import NonPersonnelCost from './index';

describe('the NonPersonnelCost component', () => {
  describe('when the cost is initially collapsed', () => {
    const component = mount(
      <NonPersonnelCost
        initialCollapsed
        category="cost category"
        desc="cost desc"
        handleDelete={jest.fn()}
        handleEditCost={jest.fn()}
        handleEditDesc={jest.fn()}
        handleEditCategory={jest.fn()}
        idx={3}
        years={{
          2003: 3848,
          2004: 7773
        }}
      />
    );

    test('it renders correctly initially', () => {
      expect(component).toMatchSnapshot();
    });

    test('it renders correctly after being expanded', () => {
      act(() => {
        component.find('NonPersonnelCostReview').prop('expand')();
      });
      component.update();
      expect(component).toMatchSnapshot();
    });
  });

  describe('when the milestone is initially NOT collapsed', () => {
    const component = mount(
      <NonPersonnelCost
        initialCollapsed={false}
        category="cost category"
        desc="cost desc"
        handleDelete={jest.fn()}
        handleEditCost={jest.fn()}
        handleEditDesc={jest.fn()}
        handleEditCategory={jest.fn()}
        idx={3}
        years={{
          2003: 3848,
          2004: 7773
        }}
      />
    );

    test('it renders correctly initially', () => {
      expect(component).toMatchSnapshot();
    });

    test('it renders correctly after being collapsed', () => {
      act(() => {
        component.find('NonPersonnelCostForm').prop('collapse')();
      });
      component.update();
      expect(component).toMatchSnapshot();
    });
  });
});
