import { shallow } from 'enzyme';
import React from 'react';

import StatePersonReview from './StatePersonReview';

describe('the StatePersonReview component', () => {
  const expand = jest.fn();
  const handleDelete = jest.fn();

  const component = shallow(
    <StatePersonReview
      desc="test desc"
      expand={expand}
      handleDelete={handleDelete}
      idx={53}
      title="test desc"
      years={{
        2003: { amt: 85938, perc: 3 },
        2004: { amt: 37523, perc: 0.5 }
      }}
    />
  );

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  test('triggers the delete event', () => {
    component.find('StandardReview').prop('onDeleteClick')();
    expect(handleDelete).toHaveBeenCalled();
  });

  test('hooks up the expand event', () => {
    expect(component.find('StandardReview').prop('onEditClick')).toEqual(
      expand
    );
  });
});
