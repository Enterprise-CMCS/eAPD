import { shallow } from 'enzyme';
import React from 'react';

import { plain as ScheduleSummary } from './ScheduleSummaryReadOnly';

const activities = [
  {
    dateRange: '8/3/2020 - 8/4/2021',
    start: '8/3/2020',
    end: '8/4/2021',
    name: 'Program Administration',
    milestones: [
      {
        end: '12/31/2017',
        name: 'Environmental Scan Completion',
        start: '8/3/2020'
      },
      {
        end: '5/30/2018',
        name: 'HIT Roadmap Development',
        start: '8/3/2020'
      },
      {
        end: '9/7/2018',
        name: 'Implementation of Final Rule and Stage 3 System Developments',
        start: '8/3/2020'
      }
    ]
  },
  {
    dateRange: 'Dates not specified',
    start: 'Date not specified',
    end: 'Date not specified',
    name: 'HIE Claims Data Analytics',
    milestones: [
      {
        end: '12/31/2018',
        name: 'Implement MMIS-HIE Interface',
        start: 'Date not specified'
      },
      {
        end: '12/31/2018',
        name: 'Develop MMIS-HIE Interface Requirements',
        start: 'Date not specified'
      }
    ]
  }
];

describe('<ScheduleSummary /> component', () => {
  test('with no activities', () => {
    const component = shallow(<ScheduleSummary activities={[]} />);
    expect(component.text()).toMatch(/There are no milestones scheduled./);
  });

  test('with activities', () => {
    const component = shallow(<ScheduleSummary activities={activities} />);
    expect(component.text()).toMatch(/Program Administration/);
  });
});
