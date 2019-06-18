import { shallow } from 'enzyme';
import React from 'react';

import NonPersonnelCostForm from './NonPersonnelCostForm';

describe('the NonPersonnelCostForm component', () => {
  const collapse = jest.fn();
  const handleEditCost = jest.fn();
  const handleEditDesc = jest.fn();
  const handleEditCategory = jest.fn();

  const component = shallow(
    <NonPersonnelCostForm
      category="cost category"
      collapse={collapse}
      desc="cost desc"
      handleEditCost={handleEditCost}
      handleEditDesc={handleEditDesc}
      handleEditCategory={handleEditCategory}
      idx={83}
      years={{
        7473: 2398235,
        7474: 72323
      }}
    />
  );

  beforeEach(() => {
    collapse.mockClear();
    handleEditCost.mockClear();
    handleEditDesc.mockClear();
    handleEditCategory.mockClear();
  });

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    test('handles changing the cost total for a year', () => {
      component
        .find('DollarField')
        .first()
        .simulate('change', { target: { value: 'new total' } });
      expect(handleEditCost).toHaveBeenCalledWith(83, '7473', 'new total');
    });

    test('handles changing the cost category', () => {
      component
        .find('Select')
        .simulate('change', { target: { value: 'new category' } });
      expect(handleEditCategory).toHaveBeenCalledWith(83, 'new category');
    });

    test('handles changing the cost desc', () => {
      component
        .find('TextField')
        .simulate('change', { target: { value: 'new desc' } });
      expect(handleEditDesc).toHaveBeenCalledWith(83, 'new desc');
    });
  });
});
