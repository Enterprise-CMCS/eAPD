import { shallow } from 'enzyme';
import React from 'react';

import { removeActivity } from '../../../../actions/editActivity';

import {
  plain as EntryDetails,
  mapStateToProps,
  mapDispatchToProps
} from './Activity';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn().mockReturnValue({ push: () => mockPush() }),
    useRouteMatch: jest.fn().mockReturnValue({ path: '---path---' })
  };
});

describe('the (Activity) EntryDetails component', () => {
  const props = {
    apdId: '0123456789abcdef01234567',
    activityIndex: 2,
    activityKey: 'activity key',
    fundingSource: 'money pit',
    jumpAction: jest.fn(),
    name: 'activity name',
    remove: jest.fn()
  };

  beforeEach(() => {
    if (mockPush) {
      mockPush.mockReset();
    }
    props.jumpAction.mockReset();
    props.remove.mockClear();
  });

  test('renders correctly with no activity name', () => {
    expect(shallow(<EntryDetails {...props} name={null} />)).toMatchSnapshot();
  });

  test('renders correctly with no activity funding source/program', () => {
    expect(
      shallow(<EntryDetails {...props} fundingSource={null} />)
    ).toMatchSnapshot();
  });

  test('renders correctly with no activity name or funding source/program', () => {
    expect(
      shallow(<EntryDetails {...props} fundingSource={null} name={null} />)
    ).toMatchSnapshot();
  });

  test('does not render the delete button on the first element', () => {
    const firstActivityProps = {
      apdId: '0123456789abcdef01234567',
      activityIndex: 0,
      activityKey: 'activity 1 key',
      fundingSource: 'money pit',
      jumpAction: jest.fn(),
      name: 'activity 1 name',
      remove: jest.fn()
    };
    const component = shallow(<EntryDetails {...firstActivityProps} />);
    expect(component).toMatchSnapshot();
  });

  test('deletes the element', () => {
    const component = shallow(<EntryDetails {...props} />);
    const review = component.find('Review').dive();
    // Second button is the delete button
    review.find('Button').at(1).simulate('click');
    // The remove function should not have fired.
    expect(props.remove).toHaveBeenCalledTimes(0);
  });

  test('maps state to props', () => {
    const state = {
      apd: {
        data: {
          activities: [
            {
              fundingSource: 'money pit',
              key: 'key1',
              name: 'that free money guy'
            },
            {
              fundingSource: 'black market kidneys',
              key: 'key2',
              name: 'scary alley'
            },
            {
              fundingSource: 'appropriations',
              key: 'key3',
              name: 'Congress Dollars'
            },
            {
              fundingSource: 'blackjack',
              key: 'key4',
              name: 'Lucky Pete'
            }
          ]
        }
      }
    };

    expect(mapStateToProps(state, { activityIndex: 2 })).toEqual({
      activityKey: 'key3',
      fundingSource: 'appropriations',
      name: 'Congress Dollars'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      remove: removeActivity
    });
  });
});
