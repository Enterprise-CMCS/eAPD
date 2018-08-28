import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import {
  ContractorResourcesRaw as ContractorResources,
  mapStateToProps,
  mapDispatchToProps
} from './ContractorResources';
import {
  addActivityContractor,
  deleteActivityContractorFile,
  removeActivityContractor,
  toggleActivityContractorHourly,
  updateActivity,
  uploadActivityContractorFile
} from '../../actions/activities';

describe('the ContractorResources component', () => {
  const sandbox = sinon.createSandbox();
  const props = {
    activity: {
      key: 'activity key',
      contractorResources: [
        {
          id: 'contractor id',
          key: 'contractor key',
          name: 'contractor name',
          desc: 'contractor description',
          start: 'start date',
          end: 'end date',
          years: {
            '1066': 100,
            '1067': 200
          },
          hourly: {
            useHourly: false,
            data: {
              '1066': { hours: '', rate: '' },
              '1067': { hours: '', rate: '' }
            }
          }
        }
      ]
    },
    years: ['1066', '1067'],
    addContractor: sinon.stub(),
    deleteFile: sinon.stub(),
    removeContractor: sinon.stub(),
    toggleContractorHourly: sinon.stub(),
    updateActivity: sinon.stub(),
    uploadFile: sinon.stub()
  };

  beforeEach(() => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
  });

  test('renders correctly', () => {
    const component = shallow(<ContractorResources {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('adds a new contractor', () => {
    const component = shallow(<ContractorResources {...props} />);
    component.find('Btn[children="Add contractor"]').simulate('click');
    expect(props.addContractor.calledWith('activity key')).toBeTruthy();
  });

  test('removes a contractor', () => {
    const component = shallow(<ContractorResources {...props} />);
    component.find('Btn[children="Remove resource"]').simulate('click');
    expect(
      props.removeContractor.calledWith('activity key', 'contractor key')
    ).toBeTruthy();
  });

  test('handles changing contractor info', () => {
    const component = shallow(<ContractorResources {...props} />);

    const nameInput = component
      .find('InputHolder')
      .filterWhere(n => n.props().value === 'contractor name');
    nameInput.simulate('change', { target: { value: 'bloop' } });
    expect(
      props.updateActivity.calledWith('activity key', {
        contractorResources: { '0': { name: 'bloop' } }
      })
    ).toBeTruthy();

    const descInput = component
      .find('InputHolder')
      .filterWhere(n => n.props().value === 'contractor description');
    descInput.simulate('change', { target: { value: 'florp' } });
    expect(
      props.updateActivity.calledWith('activity key', {
        contractorResources: { '0': { desc: 'florp' } }
      })
    ).toBeTruthy();
  });

  test('handles changing contractor expense info', () => {
    const component = shallow(<ContractorResources {...props} />);
    const yearInput = component
      .find('InputHolder')
      .filterWhere(n => n.props().value === 100);

    yearInput.simulate('change', { target: { value: '300' } });
    expect(
      props.updateActivity.calledWith(
        'activity key',
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
            byKey: {
              key: 'this is the activity'
            }
          },
          apd: {
            data: {
              years: 'seven'
            }
          }
        },
        { aKey: 'key' }
      )
    ).toEqual({
      activity: 'this is the activity',
      years: 'seven'
    });
  });

  test('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      addContractor: addActivityContractor,
      deleteFile: deleteActivityContractorFile,
      removeContractor: removeActivityContractor,
      toggleContractorHourly: toggleActivityContractorHourly,
      updateActivity,
      uploadFile: uploadActivityContractorFile
    });
  });
});
