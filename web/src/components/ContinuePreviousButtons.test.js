import { mount } from 'enzyme';
import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { Button } from '@cmsgov/design-system-core';

import {
  continueLabelId,
  previousLabelId,
  plain as ContinuePreviousButtons,
  mapStateToProps
} from './ContinuePreviousButtons';

const defaultProps = {
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

const setup = (props = {}) => {
  return mount(
    <Router>
      <ContinuePreviousButtons {...defaultProps} {...props} />
    </Router>
  );
}

describe('<ContinuePreviousButtons /> component', () => {
  it('renders links, when provided', () => {
    const component = setup();
    const links = component.find(Link);
    expect(links.last().prop('to')).toBe('/apd/previous-activities');
    expect(links.first().prop('to')).toBe('/apd/state-profile');
  });

  it('does not render links, with null inputs', () => {
    const props = {
      continueLink: null,
      previousLink: null,
    };
    const component = setup(props);
    expect(component.find(Link).exists()).toBe(false);
  });

  it('provides accessible labels', () => {
    const component = setup();

    const buttons = component.find(Button);
    expect(buttons.last().prop('aria-labelledby')).toBe(continueLabelId);
    expect(buttons.first().prop('aria-labelledby')).toBe(previousLabelId);

    const continueLabel = component.find(`#${continueLabelId}`);
    const previousLabel = component.find(`#${previousLabelId}`);
    expect(continueLabel.text()).toBe('Results of Previous Activities');
    expect(previousLabel.text()).toBe('Key State Personnel');
  });

  it('is labeled with the activity number, when within an activity', () => {
    const props = {
      continueLink: {
        id: 'apd-activity-1-okrs-nav',
        label: 'Objective and key results',
        url: '/apd/activity/1/okrs'
      },
      previousLink: {
        id: 'apd-activity-0-ffp-nav',
        label: 'FFP and budget',
        url: '/apd/activity/0/ffp'
      },
    };
    const component = setup(props);

    const continueLabel = component.find(`#${continueLabelId}`);
    const previousLabel = component.find(`#${previousLabelId}`);
    expect(continueLabel.text()).toBe('Activity 2: Objective and key results');
    expect(previousLabel.text()).toBe('Activity 1: FFP and budget');
  });

  it('maps redux state to component props', () => {
    const state = {
      nav: defaultProps
    };
    expect(mapStateToProps(state).continueLink).toEqual(defaultProps.continueLink);
    expect(mapStateToProps(state).previousLink).toEqual(defaultProps.previousLink);
  });
});
