import { shallow } from 'enzyme';
import React from 'react';

import StatePersonReview from './StatePersonReview';

describe('the StatePersonReview component', () => {
  const expand = jest.fn();
  const handleDelete = jest.fn();

  const component = shallow(
    <StatePersonReview
      index={53}
      item={{
        description: 'test desc',
        title: 'test desc',
        years: {
          2003: { amt: 85938, perc: 3 },
          2004: { amt: 37523, perc: 0.5 }
        }
      }}
      expand={expand}
      onDeleteClick={handleDelete}
    />
  );

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  test('triggers the delete event', () => {
    component.find('Review').prop('onDeleteClick')();
    expect(handleDelete).toHaveBeenCalled();
  });

  test('hooks up the expand event', () => {
    expect(component.find('Review').prop('onEditClick')).toEqual(expand);
  });
});
