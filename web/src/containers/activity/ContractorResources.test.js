import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import {
  plain as ContractorResources,
  mapStateToProps,
  mapDispatchToProps
} from './ContractorResources';
import {
  addActivityContractor,
  removeActivityContractor,
  toggleActivityContractorHourly,
  updateActivity
} from '../../actions/activities';

describe('the ContractorResources component', () => {
  const sandbox = sinon.createSandbox();
  const props = {
    activityKey: 'activity key',
    contractors: [
      {
        id: 'contractor 1',
        key: 'key 1'
      },
      {
        id: 'contractor 2',
        key: 'key 2'
      },
      {
        id: 'contractor 3',
        key: 'key 3'
      }
    ],
    years: ['1066', '1067'],
    addContractor: sinon.stub(),
    removeContractor: sinon.stub(),
    toggleContractorHourly: sinon.stub(),
    updateActivity: sinon.stub()
  };

  beforeEach(() => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
  });

  test('renders correctly', () => {
    const component = shallow(<ContractorResources {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('maps redux state to component props', () => {
    expect(
      mapStateToProps(
        {
          activities: {
            byKey: {
              key: { contractorResources: 'contractorz' }
            }
          }
        },
        { aKey: 'key' }
      )
    ).toEqual({
      activityKey: 'key',
      contractors: 'contractorz'
    });
  });

  test('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      addContractor: addActivityContractor,
      removeContractor: removeActivityContractor,
      toggleContractorHourly: toggleActivityContractorHourly,
      updateActivity
    });
  });
});
