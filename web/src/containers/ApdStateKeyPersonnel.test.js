import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as KeyPersonnel,
  mapStateToProps,
  mapDispatchToProps
} from './ApdStateKeyPersonnel';
import {
  addKeyPerson,
  removeKeyPerson,
  updateApd,
  updateBudget
} from '../actions/apd';

describe('apd state profile, Medicaid office component', () => {
  const props = {
    addKeyPerson: jest.fn(),
    poc: [
      {
        key: 'person1',
        name: 'person name',
        position: 'unobservable',
        hasCosts: true,
        costs: { '1': 100, '2': 200 }
      },
      {
        key: 'person2',
        name: '',
        position: '',
        hasCosts: false,
        costs: { '1': 0, '2': 0 }
      }
    ],
    removeKeyPerson: jest.fn(),
    updateApd: jest.fn(),
    updateBudget: jest.fn(),
    years: ['1', '2']
  };

  const component = shallow(<KeyPersonnel {...props} />);

  beforeEach(() => {
    props.addKeyPerson.mockClear();
    props.removeKeyPerson.mockClear();
    props.updateApd.mockClear();
    props.updateBudget.mockClear();
  });

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    const list = component.find('FormAndReviewList');

    it('handles adding a new key person', () => {
      list.prop('onAddClick')();
      expect(props.addKeyPerson).toHaveBeenCalledWith();
    });

    it('handles deleting a key person', () => {
      list.prop('onDeleteClick')('person key');
      expect(props.removeKeyPerson).toHaveBeenCalledWith('person key');
    });

    it('handles editing a non-expense property of a key person', () => {
      list.prop('handleChange')(3, 'field', 'new value');
      expect(props.updateApd).toHaveBeenCalledWith({
        keyPersonnel: { 3: { field: 'new value' } }
      });
      expect(props.updateBudget).not.toHaveBeenCalled();
    });

    it('handles editing an expense property of a key person', () => {
      list.prop('handleChange')(3, 'field', 'new value', true);
      expect(props.updateApd).toHaveBeenCalledWith({
        keyPersonnel: { 3: { field: 'new value' } }
      });
      expect(props.updateBudget).toHaveBeenCalled();
    });

    it('handles changing a key person FFY cost', () => {
      list.prop('handleYearChange')(3, 2004, 'new cost');
      expect(props.updateApd).toHaveBeenCalledWith({
        keyPersonnel: { 3: { costs: { 2004: 'new cost' } } }
      });
      expect(props.updateBudget).toHaveBeenCalled();
    });
  });

  test('maps state to props', () => {
    const state = {
      apd: {
        data: {
          keyPersonnel: 'key people',
          years: 'some years'
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({
      poc: 'key people',
      years: 'some years'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      addKeyPerson,
      removeKeyPerson,
      updateApd,
      updateBudget
    });
  });
});
