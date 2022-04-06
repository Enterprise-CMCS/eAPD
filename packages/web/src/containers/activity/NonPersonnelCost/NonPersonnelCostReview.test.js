import { shallow } from 'enzyme';
import React from 'react';

import NonPersonnelCostReview from './NonPersonnelCostReview';

describe('the NonPersonnelCostReview component', () => {
  const expand = jest.fn();
  const handleDelete = jest.fn();

  const component = shallow(
    <NonPersonnelCostReview
      index={53}
      item={{
        category: 'test category',
        description: 'test desc',
        years: {
          1487: 347293,
          1488: 234797
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
