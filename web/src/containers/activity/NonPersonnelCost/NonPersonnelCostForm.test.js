import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as NonPersonnelCostForm,
  mapDispatchToProps
} from './NonPersonnelCostForm';

import {
  setNonPersonnelCostCategory,
  setNonPersonnelCostDescription,
  setNonPersonnelCostForYear
} from '../../../actions/editActivity';

describe('the NonPersonnelCostForm component', () => {
  const setCategory = jest.fn();
  const setCost = jest.fn();
  const setDescription = jest.fn();

  const component = shallow(
    <NonPersonnelCostForm
      activityIndex={44}
      index={83}
      item={{
        category: 'cost category',
        description: 'cost desc',
        years: {
          7473: 2398235,
          7474: 72323
        }
      }}
      setCategory={setCategory}
      setCost={setCost}
      setDescription={setDescription}
    />
  );

  beforeEach(() => {
    setCategory.mockClear();
    setCost.mockClear();
    setDescription.mockClear();
  });

  it('matches the snapshot', () =>{
    expect(component).toMatchSnapshot()
  })

  describe('events', () => {
    test('handles changing the cost total for a year', () => {
      component
        .find('DollarField')
        .first()
        .simulate('change', { target: { value: 'new total' } });
      expect(setCost).toHaveBeenCalledWith(44, 83, '7473', 'new total');
    });

    test('handles changing the cost category', () => {
      component
        .find('Dropdown')
        .simulate('change', { target: { value: 'new category' } });
      expect(setCategory).toHaveBeenCalledWith(44, 83, 'new category');
    });

    test('handles changing the cost desc', () => {
      component
        .find('TextArea')
        .simulate('change', { target: { value: 'new desc' } });
      expect(setDescription).toHaveBeenCalledWith(44, 83, 'new desc');
    });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      setCategory: setNonPersonnelCostCategory,
      setDescription: setNonPersonnelCostDescription,
      setCost: setNonPersonnelCostForYear
    });
  });

});
