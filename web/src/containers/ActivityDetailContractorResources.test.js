import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import {
  addActivityContractor,
  removeActivityContractor,
  updateActivity
} from '../actions/activities';

import {
  raw as ActivityDetailContractorExpenses,
  mapStateToProps,
  mapDispatchToProps
} from './ActivityDetailContractorResources';

describe('the Activities details container component', () => {
  const sandbox = sinon.createSandbox();
  const props = {
    activity: {
      id: 'activity id',
      contractorResources: [
        {
          id: 'contractor id',
          name: 'contractor name',
          desc: 'contractor description',
          start: 'start date',
          end: 'end date',
          years: {
            '1066': 100,
            '1067': 200
          }
        }
      ]
    },
    years: ['1066', '1067'],
    addContractor: sinon.stub(),
    removeContractor: sinon.stub(),
    updateActivity: sinon.stub()
  };

  beforeEach(() => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
  });

  test('renders correctly', () => {
    const component = shallow(<ActivityDetailContractorExpenses {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('adds a new contractor', () => {
    const component = shallow(<ActivityDetailContractorExpenses {...props} />);
    component.find('button.btn-primary').simulate('click');
    expect(props.addContractor.calledWith('activity id')).toBeTruthy();
  });

  test('removes a contractor', () => {
    const component = shallow(<ActivityDetailContractorExpenses {...props} />);
    component.find('button.border-silver').simulate('click');
    expect(props.addContractor.calledWith('activity id')).toBeTruthy();
  });

  test('handles changing contractor info', () => {
    const component = shallow(<ActivityDetailContractorExpenses {...props} />);

    const nameInput = component
      .find('InputHolder')
      .filterWhere(n => n.props().value === 'contractor name');
    nameInput.simulate('change', { target: { value: 'bloop' } });
    expect(
      props.updateActivity.calledWith('activity id', {
        contractorResources: { '0': { name: 'bloop' } }
      })
    ).toBeTruthy();

    const descInput = component
      .find('InputHolder')
      .filterWhere(n => n.props().value === 'contractor description');
    descInput.simulate('change', { target: { value: 'florp' } });
    expect(
      props.updateActivity.calledWith('activity id', {
        contractorResources: { '0': { desc: 'florp' } }
      })
    ).toBeTruthy();
  });

  test('handles changing contractor expense info', () => {
    const component = shallow(<ActivityDetailContractorExpenses {...props} />);
    const yearInput = component
      .find('InputHolder')
      .filterWhere(n => n.props().value === 100);

    yearInput.simulate('change', { target: { value: '300' } });
    expect(
      props.updateActivity.calledWith(
        'activity id',
        { contractorResources: { '0': { years: { '1066': '300' } } } },
        true
      )
    ).toBeTruthy();
  });

  test('maps redux state to component props', () => {
    expect(
      mapStateToProps(
        {
          activities: {
            byId: {
              id: 'this is the activity'
            }
          },
          apd: {
            data: {
              years: 'seven'
            }
          }
        },
        { aId: 'id' }
      )
    ).toEqual({
      activity: 'this is the activity',
      years: 'seven'
    });
  });

  test('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      addContractor: addActivityContractor,
      removeContractor: removeActivityContractor,
      updateActivity
    });
  });
});
