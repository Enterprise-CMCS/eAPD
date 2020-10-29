import { mount } from 'enzyme';
import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';

import {
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
};

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
      previousLink: null
    };
    const component = setup(props);
    expect(component.find(Link).exists()).toBe(false);
  });

  it('provides accessible labels', () => {
    const component = setup();

    const links = component.find(Link);
    expect(links.last().prop('aria-label')).toBe(
      `Continue to ${defaultProps.continueLink.label}`
    );
    expect(links.first().prop('aria-label')).toBe(
      `Back to ${defaultProps.previousLink.label}`
    );

    const continueLabel = component.find('#continue-text');
    const previousLabel = component.find('#previous-text');
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
      }
    };
    const component = setup(props);

    const continueLabel = component.find('#continue-text');
    const previousLabel = component.find('#previous-text');
    expect(continueLabel.text()).toBe('Activity 2: Objective and key results');
    expect(previousLabel.text()).toBe('Activity 1: FFP and budget');
  });

  it('maps redux state to component props', () => {
    const state = {
      nav: defaultProps
    };
    expect(mapStateToProps(state).continueLink).toEqual(
      defaultProps.continueLink
    );
    expect(mapStateToProps(state).previousLink).toEqual(
      defaultProps.previousLink
    );
  });
});
