import { mount, shallow } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import FormAndReviewList, { FormAndReviewItem } from './FormAndReviewList';

describe('FormAndReviewList component', () => {
  describe('renders properly', () => {
    it('with a custom class name', () => {
      expect(
        shallow(
          <FormAndReviewList
            addButtonText="text for adding a new button"
            className="test-class"
            collapsed={jest.fn()}
            expanded={jest.fn()}
            list={[
              { initialExpanded: false, key: 'one' },
              { initialExpanded: true, key: 'two' }
            ]}
            noDataMessage="displayed when there is no data"
            onAddClick={jest.fn()}
            onDeleteClick={jest.fn()}
          />
        )
      ).toMatchSnapshot();
      // If the snapshot changes, manually inspect it to make sure the
      // className prop gets set correctly on the containing div
    });

    it('with multiple items', () => {
      expect(
        shallow(
          <FormAndReviewList
            addButtonText="text for adding a new button"
            collapsed={jest.fn()}
            expanded={jest.fn()}
            list={[
              { initialExpanded: false, key: 'one' },
              { initialExpanded: true, key: 'two' }
            ]}
            noDataMessage="displayed when there is no data"
            onAddClick={jest.fn()}
            onDeleteClick={jest.fn()}
          />
        )
      ).toMatchSnapshot();
    });

    it('with just one item', () => {
      expect(
        shallow(
          <FormAndReviewList
            addButtonText="text for adding a new button"
            collapsed={jest.fn()}
            expanded={jest.fn()}
            list={[{ key: 'one' }]}
            noDataMessage="displayed when there is no data"
            onAddClick={jest.fn()}
            onDeleteClick={jest.fn()}
          />
        )
      ).toMatchSnapshot();
      // Manually inspect that onDeleteClick is not passed down to
      // FormAndReviewItem since there is just one item.
    });

    it('with just one item and allowDeleteAll set to true', () => {
      expect(
        shallow(
          <FormAndReviewList
            addButtonText="text for adding a new button"
            allowDeleteAll
            collapsed={jest.fn()}
            expanded={jest.fn()}
            list={[{ key: 'one' }]}
            noDataMessage="displayed when there is no data"
            onAddClick={jest.fn()}
            onDeleteClick={jest.fn()}
          />
        )
      ).toMatchSnapshot();
      // Manually inspect that onDeleteClick is passed down to FormAndReviewItem
    });

    it('with no items', () => {
      expect(
        shallow(
          <FormAndReviewList
            addButtonText="text for adding a new button"
            collapsed={jest.fn()}
            expanded={jest.fn()}
            list={[]}
            noDataMessage="displayed when there is no data"
            onAddClick={jest.fn()}
            onDeleteClick={jest.fn()}
          />
        )
      ).toMatchSnapshot();
    });

    it('with no items and noDataMessage set to false', () => {
      expect(
        shallow(
          <FormAndReviewList
            addButtonText="text for adding a new button"
            collapsed={jest.fn()}
            expanded={jest.fn()}
            list={[]}
            noDataMessage={false}
            onAddClick={jest.fn()}
            onDeleteClick={jest.fn()}
          />
        )
      ).toMatchSnapshot();
    });

    it('without an add button if the onAddClick prop is missing', () => {
      expect(
        shallow(
          <FormAndReviewList
            addButtonText="text for adding a new button"
            collapsed={jest.fn()}
            expanded={jest.fn()}
            list={[]}
            noDataMessage="displayed when there is no data"
            onDeleteClick={jest.fn()}
          />
        )
      ).toMatchSnapshot();
    });
  });

  it('expands and collapses items', () => {
    const Collapsed = () => <div />;
    const Expanded = () => <div />;

    const component = mount(
      <FormAndReviewItem
        collapsedComponent={Collapsed}
        expandedComponent={Expanded}
        initialExpanded={false}
        index={1}
        prop1="passed down"
        prop2="passed down"
        prop3="passed down"
      />
    );

    // manually verify that prop1/2/3 and expand props are passed down
    // to Collapsed component
    expect(component).toMatchSnapshot();

    act(() => {
      component.find('Collapsed').prop('expand')();
    });
    component.update();

    // manually verify that prop1/2/3 and collapse props are passed down
    // to Expanded component
    expect(component).toMatchSnapshot();

    act(() => {
      component.find('Expanded').prop('collapse')();
    });
    component.update();

    // manually verify that prop1/2/3 and expand props are passed down
    // to Collapsed component
    expect(component).toMatchSnapshot();
  });

  it('add button calls add event', () => {
    const onAddClick = jest.fn();

    const component = shallow(
      <FormAndReviewList
        addButtonText="text for adding a new button"
        collapsed={jest.fn()}
        expanded={jest.fn()}
        list={[{ key: 'item 1' }, { key: 'item2' }]}
        noDataMessage="displayed when there is no data"
        onAddClick={onAddClick}
        onDeleteClick={jest.fn()}
      />
    );
    component.find('Button').simulate('click');

    // verify that initialExpanded is now set to true for the second
    // item, but still false for the first
    expect(component).toMatchSnapshot();

    expect(onAddClick).toHaveBeenCalled();
  });

  it('delete prop adds key and calls delete event', () => {
    const onDeleteClick = jest.fn();

    const component = shallow(
      <FormAndReviewList
        addButtonText="text for adding a new button"
        collapsed={jest.fn()}
        expanded={jest.fn()}
        list={[{ key: 'item key' }, { key: 'second item' }]}
        noDataMessage="displayed when there is no data"
        onAddClick={jest.fn()}
        onDeleteClick={onDeleteClick}
      />
    );
    component.find('FormAndReviewItem').first().prop('onDeleteClick')();

    expect(onDeleteClick).toHaveBeenCalledWith(0);
  });
});
