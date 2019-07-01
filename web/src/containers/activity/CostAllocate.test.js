import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import {
  CostAllocateRaw as CostAllocate,
  mapStateToProps,
  mapDispatchToProps
} from './CostAllocate';
import { updateActivity } from '../../actions/activities';

describe('the CostAllocate component', () => {
  const sandbox = sinon.createSandbox();
  const props = {
    activity: {
      key: 'activity key',
      costAllocationDesc: 'cost allocation',
      otherFundingDesc: 'other funding'
    },
    years: ['1066', '1067'],
    updateActivity: sinon.stub()
  };

  beforeEach(() => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
  });

  test('renders correctly', () => {
    const component = shallow(<CostAllocate {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('updates activity when text is changed', () => {
    const component = shallow(<CostAllocate {...props} />);

    component
      .find('RichText')
      .filterWhere(n => n.props().content === 'cost allocation')
      .simulate('sync', 'bloop');
    expect(
      props.updateActivity.calledWith('activity id', {
        costAllocationDesc: 'bloop'
      })
    );

    component
      .find('RichText')
      .filterWhere(n => n.props().content === 'other funding')
      .simulate('sync', 'florp');
    expect(
      props.updateActivity.calledWith('activity id', {
        otherFundingDesc: 'florp'
      })
    );
  });

  test('maps redux state to component props', () => {
    expect(
      mapStateToProps(
        {
          activities: {
            byKey: {
              key: 'this is the activity'
            }
          }
        },
        { aKey: 'key' }
      )
    ).toEqual({
      activity: 'this is the activity'
    });
  });

  test('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      updateActivity
    });
  });
});
