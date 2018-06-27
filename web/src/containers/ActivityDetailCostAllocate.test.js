import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import { updateActivity } from '../actions/activities';

import {
  raw as ActivityDetailCostAllocate,
  mapStateToProps,
  mapDispatchToProps
} from './ActivityDetailCostAllocate';

describe('the activities cost allocation container component', () => {
  const sandbox = sinon.createSandbox();
  const props = {
    activity: {
      id: 'activity id',
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
    const component = shallow(<ActivityDetailCostAllocate {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('updates activity when text is changed', () => {
    const component = shallow(<ActivityDetailCostAllocate {...props} />);

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
            byId: {
              id: 'this is the activity'
            }
          }
        },
        { aId: 'id' }
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
