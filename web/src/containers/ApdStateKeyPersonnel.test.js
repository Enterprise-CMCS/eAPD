import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

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
  const sandbox = sinon.createSandbox();
  beforeEach(() => {
    sandbox.resetHistory();
  });

  describe('main component', () => {
    const props = {
      addKeyPerson: sandbox.spy(),
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
      removeKeyPerson: sandbox.spy(),
      setPrimaryKeyPerson: sandbox.spy(),
      updateApd: sandbox.spy(),
      updateBudget: sandbox.spy(),
      years: ['1', '2']
    };

    test('renders correctly', () => {
      expect(shallow(<KeyPersonnel {...props} />)).toMatchSnapshot();
    });

    test('dispatches adding a new person', () => {
      shallow(<KeyPersonnel {...props} />)
        .find('Button')
        .simulate('click');

      expect(props.addKeyPerson.called).toBeTruthy();
    });

    test('dispatches removing a person', () => {
      shallow(<KeyPersonnel {...props} />)
        .find('ApdStateKeyPerson')
        .first()
        .prop('remove')('person object');

      expect(props.removeKeyPerson.calledWith(0)).toBeTruthy();
    });

    test('dispatches when a person changes', () => {
      shallow(<KeyPersonnel {...props} />)
        .find('ApdStateKeyPerson')
        .first()
        .prop('handleChange')('field')({ target: { value: 'new value' } });

      console.log(props.updateApd.args);
      expect(
        props.updateApd.calledWith({
          keyPersonnel: { 0: { field: 'new value' } }
        })
      ).toBeTruthy();
    });

    test('dispatches when person years change', () => {
      shallow(<KeyPersonnel {...props} />)
        .find('ApdStateKeyPerson')
        .first()
        .prop('handleYearChange')('1908')({
        target: { value: '235235' }
      });

      expect(
        props.updateApd.calledWith({
          keyPersonnel: { 0: { costs: { '1908': 235235 } } }
        })
      ).toBeTruthy();
      expect(props.updateBudget.called).toBeTruthy();
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
});
