import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as KeyPersonnel,
  mapStateToProps,
  mapDispatchToProps
} from './ApdStateKeyPersonnel';
import { addKeyPerson, removeKeyPerson } from '../actions/editApd';

describe('apd state profile, Medicaid office component', () => {
  const props = {
    add: jest.fn(),
    poc: [
      {
        key: 'person1',
        name: 'person name',
        email: 'person1@theplace.gov',
        position: 'unobservable',
        percentTime: { '1': 0.27, '2': 0.27 },
        hasCosts: true,
        costs: { '1': 100, '2': 200 }
      },
      {
        key: 'person2',
        name: '',
        email: 'person2@theplace.gov',
        position: '',
        percentTime: { '1': 0.72, '2': 0.72 },
        hasCosts: false,
        costs: { '1': 0, '2': 0 }
      }
    ],
    remove: jest.fn(),
    years: ['1', '2']
  };

  const component = shallow(<KeyPersonnel {...props} />);

  beforeEach(() => {
    props.add.mockClear();
    props.remove.mockClear();
  });

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    const list = component.find('FormAndReviewList');

    it('handles adding a new key person', () => {
      list.prop('onAddClick')();
      expect(props.add).toHaveBeenCalled();
    });

    it('handles deleting a key person', () => {
      list.prop('onDeleteClick')(0);
      expect(props.remove).toHaveBeenCalledWith(0);
    });
  });

  it('maps state to props', () => {
    expect(
      mapStateToProps({
        apd: {
          data: {
            keyPersonnel: 'these are my people',
            years: 'and these are my years'
          }
        }
      })
    ).toEqual({ poc: 'these are my people', years: 'and these are my years' });
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      add: addKeyPerson,
      remove: removeKeyPerson
    });
  });
});
