import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { updateApd } from '../actions/apd';

import {
  plain as PreviousActivities,
  mapStateToProps,
  mapDispatchToProps
} from './PreviousActivities';

describe('previous activities component', () => {
  test('renders correctly if data is not loaded', () => {
    const component = shallow(
      <PreviousActivities
        previousActivitySummary="previous"
        updateApd={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('updates on text change', () => {
    const updateApdProps = sinon.spy();
    const component = shallow(
      <PreviousActivities
        previousActivitySummary="previous"
        updateApd={updateApdProps}
      />
    );
    component.find('RichText').prop('onSync')('this is html');

    expect(
      updateApdProps.calledWith({ previousActivitySummary: 'this is html' })
    ).toBeTruthy();
  });

  test('maps state to props', () => {
    const state = {
      apd: { data: { previousActivitySummary: 'moop moop' } }
    };

    expect(mapStateToProps(state)).toEqual({
      previousActivitySummary: 'moop moop'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ updateApd });
  });
});
