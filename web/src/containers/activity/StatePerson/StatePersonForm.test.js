import { shallow } from 'enzyme';
import React from 'react';

import StatePersonForm from './StatePersonForm';

describe('the StatePersonForm component', () => {
  const collapse = jest.fn();
  const handleEditCost = jest.fn();
  const handleEditFTE = jest.fn();
  const handleEditPersonDesc = jest.fn();
  const handleEditPersonTitle = jest.fn();

  const component = shallow(
    <StatePersonForm
      index={83}
      item={{
        desc: 'personnel desc',
        title: 'personnel title',
        years: {
          7473: 2398235,
          7474: 72323
        }
      }}
      handleEditCost={handleEditCost}
      handleEditFTE={handleEditFTE}
      handleEditPersonDesc={handleEditPersonDesc}
      handleEditPersonTitle={handleEditPersonTitle}
    />
  );

  beforeEach(() => {
    collapse.mockClear();
    handleEditCost.mockClear();
    handleEditFTE.mockClear();
    handleEditPersonDesc.mockClear();
    handleEditPersonTitle.mockClear();
  });

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    test('handles changing the personnel title', () => {
      component
        .findWhere(c => c.name() === 'TextField' && c.prop('name') === 'title')
        .simulate('change', { target: { value: 'new title' } });
      expect(handleEditPersonTitle).toHaveBeenCalledWith(83, 'new title');
    });

    test('handles changing the personnel desc', () => {
      component
        .findWhere(c => c.name() === 'TextArea' && c.prop('name') === 'desc')
        .simulate('change', { target: { value: 'new desc' } });
      expect(handleEditPersonDesc).toHaveBeenCalledWith(83, 'new desc');
    });

    test('handles changing the personnel cost total for a year', () => {
      component
        .find('DollarField')
        .first()
        .simulate('change', { target: { value: 'new total' } });
      expect(handleEditCost).toHaveBeenCalledWith(83, '7473', 'new total');
    });

    test('handles changing the personnel FTE for a year', () => {
      component
        .findWhere(c => c.name() === 'TextField' && c.prop('name') === 'ftes')
        .first()
        .simulate('change', { target: { value: 'new ftes' } });
      expect(handleEditFTE).toHaveBeenCalledWith(83, '7473', 'new ftes');
    });
  });
});
