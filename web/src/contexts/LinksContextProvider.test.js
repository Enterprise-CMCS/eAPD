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
    expect(testLinks.length).toMatchSnapshot();
  });

  it('returns next and previous links currectly when the selected link is empty', () => {
    const activeSection = '';
    const nextPrevLinks = contextProvider.getPreviousNextLinks(
      links,
      activeSection
    );
    expect(nextPrevLinks).toMatchSnapshot();
  });

  it('returns next and previous links currectly when the selected link is the first nav link', () => {
    const activeSection = 'apd-state-profile';
    const nextPrevLinks = contextProvider.getPreviousNextLinks(
      links,
      activeSection
    );
    expect(nextPrevLinks).toMatchSnapshot();
  });

  it('returns next and previous links currectly when the selected link is the last nav link', () => {
    const activeSection = 'executive-summary';
    const nextPrevLinks = contextProvider.getPreviousNextLinks(
      links,
      activeSection
    );
    expect(nextPrevLinks).toMatchSnapshot();
  });

  it('returns next and previous links currectly when the selected link is a second-level item', () => {
    const activeSection = 'apd-state-profile-key-personnel';
    const nextPrevLinks = contextProvider.getPreviousNextLinks(
      links,
      activeSection
    );
    expect(nextPrevLinks).toMatchSnapshot();
  });

  it('returns next and previous links currectly when the selected link is the top-level activity section', () => {
    const activeSection = 'activities';
    const nextPrevLinks = contextProvider.getPreviousNextLinks(
      links,
      activeSection
    );
    expect(nextPrevLinks).toMatchSnapshot();
  });

  it('returns next and previous links currectly when the selected link is the first activity sub-section', () => {
    const activeSection = 'activity-aed63d97-overview';
    const nextPrevLinks = contextProvider.getPreviousNextLinks(
      links,
      activeSection
    );
    expect(nextPrevLinks).toMatchSnapshot();
  });

  it('returns next and previous links currectly when the selected link is the last activity sub-section in an activity', () => {
    const activeSection = 'activity-aed63d97-ffp';
    const nextPrevLinks = contextProvider.getPreviousNextLinks(
      links,
      activeSection
    );
    expect(nextPrevLinks).toMatchSnapshot();
  });

  it('returns next and previous links currectly when the selected link is the last activity sub-section', () => {
    const activeSection = 'activity-wz46yd39-ffp';
    const nextPrevLinks = contextProvider.getPreviousNextLinks(
      links,
      activeSection
    );
    expect(nextPrevLinks).toMatchSnapshot();
  });
});
