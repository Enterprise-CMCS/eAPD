import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import StatePerson from './index';

describe('the StatePerson component', () => {
  describe('when the person is initially collapsed', () => {
    const component = mount(
      <StatePerson
        initialCollapsed
        desc="personnel desc"
        handleDelete={jest.fn()}
        handleEditCost={jest.fn()}
        handleEditFTE={jest.fn()}
        handleEditPersonDesc={jest.fn()}
        handleEditPersonTitle={jest.fn()}
        idx={3}
        title="personnel title"
        years={{
          2003: { amt: 85938, perc: 3 },
          2004: { amt: 37523, perc: 0.5 }
        }}
      />
    );

    test('it renders correctly initially', () => {
      expect(component).toMatchSnapshot();
    });

    test('it renders correctly after being expanded', () => {
      act(() => {
        component.find('StatePersonReview').prop('expand')();
      });
      component.update();
      expect(component).toMatchSnapshot();
    });
  });

  describe('when the milestone is initially NOT collapsed', () => {
    const component = mount(
      <StatePerson
        initialCollapsed={false}
        desc="personnel desc"
        handleDelete={jest.fn()}
        handleEditCost={jest.fn()}
        handleEditFTE={jest.fn()}
        handleEditPersonDesc={jest.fn()}
        handleEditPersonTitle={jest.fn()}
        idx={3}
        title="personnel title"
        years={{
          2003: { amt: 85938, perc: 3 },
          2004: { amt: 37523, perc: 0.5 }
        }}
      />
    );

    test('it renders correctly initially', () => {
      expect(component).toMatchSnapshot();
    });

    test('it renders correctly after being collapsed', () => {
      act(() => {
        component.find('StatePersonForm').prop('collapse')();
      });
      component.update();
      expect(component).toMatchSnapshot();
    });
  });
});
