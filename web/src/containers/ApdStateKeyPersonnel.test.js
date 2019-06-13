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
