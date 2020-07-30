import { mount } from 'enzyme';
import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { Button } from '@cmsgov/design-system-core';

import {
  plain as ContinuePreviousButtons,
  mapStateToProps
} from './ContinuePreviousButtons';

const props = {
  continueLink: {
    id: 'apd-previous-activitites-nav',
    label: 'Results of Previous Activities',
    url: '/apd/previous-activities'
  },
  previousLink: {
    id: 'apd-state-profile-nav',
    label: 'Key State Personnel',
    url: '/apd/state-profile'
  }
};

describe('<ContinuePreviousButtons /> component', () => {
  let component;

  beforeAll(() => {
    component = mount(
      <Router>
        <ContinuePreviousButtons {...props} />
      </Router>
    );
  });

  it('renders links', () => {
    const links = component.find(Link);
    expect(links.first().prop('to')).toBe('/apd/state-profile');
    expect(links.last().prop('to')).toBe('/apd/previous-activities');
  });

  it('provides labels', () => {
    const previousLabelId = 'previous-button-label';
    const continueLabelId = 'continue-button-label';

    const buttons = component.find(Button);
    expect(buttons.first().prop('aria-labelledby')).toBe(previousLabelId);
    expect(buttons.last().prop('aria-labelledby')).toBe(continueLabelId);

    const previousLabel = component.find(`#${previousLabelId}`);
    const continueLabel = component.find(`#${continueLabelId}`);
    expect(previousLabel.text()).toBe('Key State Personnel');
    expect(continueLabel.text()).toBe('Results of Previous Activities');
  });

  it('maps redux state to component props', () => {
    const state = {
      nav: props
    };
    expect(mapStateToProps(state).continueLink).toEqual(props.continueLink);
    expect(mapStateToProps(state).previousLink).toEqual(props.previousLink);
  });
});
