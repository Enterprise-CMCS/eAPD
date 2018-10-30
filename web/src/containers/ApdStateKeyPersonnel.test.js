import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as KeyPersonnel,
  mapStateToProps,
  mapDispatchToProps,
  PersonForm
} from './ApdStateKeyPersonnel';
import {
  addKeyPerson,
  removeKeyPerson,
  setPrimaryKeyPerson,
  updateApd
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
      years: ['1', '2']
    };

    test('renders correctly', () => {
      expect(shallow(<KeyPersonnel {...props} />)).toMatchSnapshot();
    });

    test('dispatches adding a new person', () => {
      shallow(<KeyPersonnel {...props} />)
        .find('Btn')
        .simulate('click');

      expect(props.addKeyPerson.called).toBeTruthy();
    });

    test('dispatches removing a person', () => {
      shallow(<KeyPersonnel {...props} />)
        .find('MiniHeader')
        .at(0)
        .prop('handleDelete')();

      expect(props.removeKeyPerson.calledWith(0)).toBeTruthy();
    });

    test('dispatches setting a person primary', () => {
      shallow(<KeyPersonnel {...props} />)
        .find('PersonForm')
        .at(0)
        .prop('setPrimary')('args');

      expect(props.setPrimaryKeyPerson.calledWith('args')).toBeTruthy();
    });

    test('dispatches when a person changes', () => {
      shallow(<KeyPersonnel {...props} />)
        .find('PersonForm')
        .at(0)
        .prop('handleChange')('field', 0)({ target: { value: 'new value' } });

      expect(
        props.updateApd.calledWith({
          keyPersonnel: { 0: { field: 'new value' } }
        })
      ).toBeTruthy();
    });

    test('dispatches when person years change', () => {
      shallow(<KeyPersonnel {...props} />)
        .find('PersonForm')
        .at(0)
        .prop('handleYearChange')(0, '1908')({
        target: { value: 'new value' }
      });

      expect(
        props.updateApd.calledWith({
          keyPersonnel: { 0: { costs: { '1908': 'new value' } } }
        })
      ).toBeTruthy();
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
        setPrimaryKeyPerson,
        updateApd
      });
    });
  });

  describe('person form component', () => {
    const fns = {
      handleChange: sandbox.stub(),
      handleYearChange: sandbox.stub(),
      setPrimary: sandbox.spy()
    };

    const handleChangeImpl = sandbox.spy();
    fns.handleChange.returns(handleChangeImpl);

    const handleYearChangeImpl = sandbox.spy();
    fns.handleYearChange.returns(handleYearChangeImpl);

    const props = {
      idx: 12,
      person: {
        name: 'name',
        email: 'email',
        position: 'position',
        percentTime: '30',
        isPrimary: false,
        hasCosts: true,
        costs: { '1': 99, '2': 100 }
      },
      years: ['1', '2'],
      ...fns
    };

    test('renders properly', () => {
      const localProps = JSON.parse(JSON.stringify(props));
      expect(
        shallow(<PersonForm {...localProps} {...fns} />)
      ).toMatchSnapshot();

      localProps.isPrimary = true;
      expect(
        shallow(<PersonForm {...localProps} {...fns} />)
      ).toMatchSnapshot();

      localProps.hasCosts = false;
      expect(
        shallow(<PersonForm {...localProps} {...fns} />)
      ).toMatchSnapshot();
    });

    test('raises event when text is changed', () => {
      shallow(<PersonForm {...props} />)
        .find('InputHolder')
        .at(0)
        .simulate('change', 'event value');

      expect(handleChangeImpl.calledWith('event value')).toBeTruthy();
    });

    test('raises event when primary is toggled on', () => {
      shallow(<PersonForm {...props} />)
        .find('Btn[children="Yes"]')
        .at(0)
        .simulate('click');

      expect(fns.setPrimary.calledWith(12)).toBeTruthy();
    });

    test('raises event when primary is toggled off', () => {
      shallow(<PersonForm {...props} />)
        .find('Btn[children="No"]')
        .at(0)
        .simulate('click');

      expect(
        handleChangeImpl.calledWith({ target: { value: false } })
      ).toBeTruthy();
    });

    test('raises event when has-costs is toggled on', () => {
      shallow(<PersonForm {...props} />)
        .find('Btn[children="Yes"]')
        .at(1)
        .simulate('click');

      expect(
        handleChangeImpl.calledWith({ target: { value: true } })
      ).toBeTruthy();
    });

    test('raises event when has-costs is toggled off', () => {
      shallow(<PersonForm {...props} />)
        .find('Btn[children="No"]')
        .at(1)
        .simulate('click');

      expect(
        handleChangeImpl.calledWith({ target: { value: false } })
      ).toBeTruthy();
    });
  });
});
