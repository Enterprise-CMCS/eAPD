import { shallow } from 'enzyme';
import React from 'react';
import { LinksContextProvider } from './LinksContextProvider';

const contextProvider = new LinksContextProvider();

const links = [
  {
    id: 'apd-state-profile',
    label: 'Key State Personnel',
    items: [
      {
        id: 'apd-state-profile-office',
        label: 'State Director and Office Address'
      },
      {
        id: 'apd-state-profile-key-personnel',
        label: 'Key Personnel and Program Management'
      }
    ]
  },
  { id: 'apd-summary', label: 'Program Summary' },
  {
    id: 'activities',
    label: 'Program Activities',
    items: [
      { id: 'activities-list', label: 'Activity List' },
      {
        id: 'activity-aed63d97',
        label: 'Activity 1: HIE Enhancement and Onboarding',
        items: [
          {
            id: 'activity-aed63d97-overview',
            label: 'Activity overview'
          },
          {
            id: 'activity-aed63d97-okrs',
            label: 'Objectives and key results'
          },
          {
            id: 'activity-aed63d97-ffp',
            label: 'FFP and budget'
          }
        ]
      },
      {
        id: 'activity-wz46yd39',
        label: 'Activity 2: Public Health System Modernization',
        items: [
          {
            id: 'activity-wz46yd39-overview',
            label: 'Activity overview'
          },
          {
            id: 'activity-wz46yd39-okrs',
            label: 'Objectives and key results'
          },
          {
            id: 'activity-wz46yd39-ffp',
            label: 'FFP and budget'
          }
        ]
      }
    ]
  },
  {
    id: 'executive-summary',
    label: 'Executive Summary',
    items: [
      { id: 'executive-summary-summary', label: 'Activities Summary' },
      { id: 'executive-summary-budget-table', label: 'Program Budget Tables' }
    ]
  }
];

const pageNavMock = jest.fn();
const anchorNavMock = jest.fn();
const activities = [
  {
    anchor: '#key1',
    key: 'key-1234'
  },
  {
    anchor: '#key2',
    key: 'key-5678'
  },
  {
    anchor: '#key3',
    key: 'key-9012'
  }
];

describe('LinksContextProvider', () => {
  it('renders correctly', () => {
    expect(shallow(<LinksContextProvider />)).toMatchSnapshot();
  });

  it('returns a list of links', () => {
    const activeSection = 'apd-state-profile';
    const testLinks = contextProvider.getTheLinks(
      pageNavMock,
      anchorNavMock,
      activeSection,
      activities
    );
    expect(testLinks.length).toBe(9);
  });

  it('returns next and previous links currectly when the selected link is empty', () => {
    const activeSection = '';
    const {
      previousLink,
      hidePreviousLink,
      nextLink,
      hideNextLink
    } = contextProvider.getPreviousNextLinks(links, activeSection);
    expect(previousLink.id).toBe('apd-state-profile');
    expect(previousLink.label).toBe('Key State Personnel');
    expect(hidePreviousLink).toBe(true);
    expect(nextLink.id).toBe('apd-summary');
    expect(nextLink.label).toBe('Program Summary');
    expect(hideNextLink).toBe(false);
  });

  it('returns next and previous links currectly when the selected link is the first nav link', () => {
    const activeSection = 'apd-state-profile';
    const {
      previousLink,
      hidePreviousLink,
      nextLink,
      hideNextLink
    } = contextProvider.getPreviousNextLinks(links, activeSection);
    expect(previousLink.id).toBe('apd-state-profile');
    expect(previousLink.label).toBe('Key State Personnel');
    expect(hidePreviousLink).toBe(true);
    expect(nextLink.id).toBe('apd-summary');
    expect(nextLink.label).toBe('Program Summary');
    expect(hideNextLink).toBe(false);
  });

  it('returns next and previous links currectly when the selected link is the last nav link', () => {
    const activeSection = 'executive-summary';
    const {
      previousLink,
      hidePreviousLink,
      nextLink,
      hideNextLink
    } = contextProvider.getPreviousNextLinks(links, activeSection);
    expect(previousLink.id).toBe('activities');
    expect(previousLink.label).toBe('Program Activities');
    expect(hidePreviousLink).toBe(false);
    expect(nextLink.id).toBe('executive-summary');
    expect(nextLink.label).toBe('Executive Summary');
    expect(hideNextLink).toBe(true);
  });

  it('returns next and previous links currectly when the selected link is a second-level item', () => {
    const activeSection = 'apd-state-profile-key-personnel';
    const {
      previousLink,
      hidePreviousLink,
      nextLink,
      hideNextLink
    } = contextProvider.getPreviousNextLinks(links, activeSection);
    expect(previousLink.id).toBe('apd-state-profile');
    expect(previousLink.label).toBe('Key State Personnel');
    expect(hidePreviousLink).toBe(true);
    expect(nextLink.id).toBe('apd-summary');
    expect(nextLink.label).toBe('Program Summary');
    expect(hideNextLink).toBe(false);
  });

  it('returns next and previous links currectly when the selected link is the top-level activity section', () => {
    const activeSection = 'activities';
    const {
      previousLink,
      hidePreviousLink,
      nextLink,
      hideNextLink
    } = contextProvider.getPreviousNextLinks(links, activeSection);
    expect(previousLink.id).toBe('apd-summary');
    expect(previousLink.label).toBe('Program Summary');
    expect(hidePreviousLink).toBe(false);
    expect(nextLink.id).toBe('executive-summary');
    expect(nextLink.label).toBe('Executive Summary');
    expect(hideNextLink).toBe(false);
  });

  it('returns next and previous links currectly when the selected link is the first activity sub-section', () => {
    const activeSection = 'activity-aed63d97-overview';
    const {
      previousLink,
      hidePreviousLink,
      nextLink,
      hideNextLink
    } = contextProvider.getPreviousNextLinks(links, activeSection);
    expect(previousLink.id).toBe('activities-list');
    expect(previousLink.label).toBe('Activity List');
    expect(hidePreviousLink).toBe(false);
    expect(nextLink.id).toBe('activity-aed63d97-okrs');
    expect(nextLink.label).toBe('Activity 1: Objectives and key results');
    expect(hideNextLink).toBe(false);
  });

  it('returns next and previous links currectly when the selected link is the last activity sub-section in an activity', () => {
    const activeSection = 'activity-aed63d97-ffp';
    const {
      previousLink,
      hidePreviousLink,
      nextLink,
      hideNextLink
    } = contextProvider.getPreviousNextLinks(links, activeSection);
    expect(previousLink.id).toBe('activity-aed63d97-okrs');
    expect(previousLink.label).toBe('Activity 1: Objectives and key results');
    expect(hidePreviousLink).toBe(false);
    expect(nextLink.id).toBe('activity-wz46yd39');
    expect(nextLink.label).toBe(
      'Activity 2: Public Health System Modernization'
    );
    expect(hideNextLink).toBe(false);
  });

  it('returns next and previous links currectly when the selected link is the last activity sub-section', () => {
    const activeSection = 'activity-wz46yd39-ffp';
    const {
      previousLink,
      hidePreviousLink,
      nextLink,
      hideNextLink
    } = contextProvider.getPreviousNextLinks(links, activeSection);
    expect(previousLink.id).toBe('activity-wz46yd39-okrs');
    expect(previousLink.label).toBe('Activity 2: Objectives and key results');
    expect(hidePreviousLink).toBe(false);
    expect(nextLink.id).toBe('executive-summary');
    expect(nextLink.label).toBe('Executive Summary');
    expect(hideNextLink).toBe(false);
  });
});
