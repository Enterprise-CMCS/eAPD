import { shallow } from 'enzyme';
import React from 'react';

import { removeActivity } from '../../actions/editActivity';

import {
  plain as EntryDetails,
  mapStateToProps,
  mapDispatchToProps
} from './EntryDetails';

describe('the (Activity) EntryDetails component', () => {
  const props = {
    activityIndex: 2,
    activityKey: 'activity key',
    fundingSource: 'money pit',
    name: 'activity name',
    remove: jest.fn()
  };

  beforeEach(() => {
    props.remove.mockClear();
  });

  test('does not render the delete button on the first element', () => {
    const firstActivityProps = {
      activityIndex: 0,
      activityKey: 'activity 1 key',
      fundingSource: 'money pit',
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
    review
      .find('Button')
      .at(1)
      .simulate('click');
    expect(props.remove).toHaveBeenCalled();
  });

  test('renders correctly with the modal closed', () => {
    const component = shallow(<EntryDetails {...props} />);
    expect(component).toMatchSnapshot();

    const review = component.find('Review').dive();
    // First button is the edit button
    review
      .find('Button')
      .at(0)
      .simulate('click');

    // Modal is now open
    expect(component).toMatchSnapshot();

    component.find('ActivityDialog').prop('closeModal')();

    // Modal is now closed again
    expect(component).toMatchSnapshot();
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
