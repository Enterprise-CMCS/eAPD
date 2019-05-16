import { shallow } from 'enzyme';
import React from 'react';

import { plain as ScheduleSummary, mapStateToProps } from './ScheduleSummary';

describe('schedule summary component', () => {
  const activities = [
    {
      name: 'Number One',
      milestones: [
        // Mariah Carey and Boz II Men's "One Sweet Day" sits at #1 on the
        // Billboard Hot 100 for a record 16 consecutive weeks.
        { end: '1996/03/16', name: 'one-one', start: '1995/12/02' },
        // The Beatles begin their record-holding streak of #1 hits on
        // Billboard with "Love Me Do" and wrap things up with "The Long and
        // Winding Road"
        { end: '1970/05/23', name: 'one-two', start: '1962/10/05' }
      ],
      // For the first time, Captain Picard gives Commander Riker his most
      // famous order:  "Make it so, Number One."
      start: '1988/12/10'
    },
    {
      name: 'Number 💩',
      milestones: [
        // The Squatty Potty commercial hits YouTube and instantly goes viral.
        { end: '2016/10/06', name: 'three-one', start: '2016/10/06' },
        // National Geographic publishes a story about a 50,000-year old poop
        // discovered in Spain.
        { end: '2014/06/25', name: 'two-two', start: '2014/06/25' },
        // The Gemini V mission marks the first time humans pooped in space.
        // During the 8-day mission, Gordon Cooper and Pete Conrad pooped a
        // total of 4 times.
        { end: '1965/08/21', name: 'two-three', start: '1965/08/29' }
      ],
      // First flush toilet installed in the White House during the Millard
      // Filmore administration, possibly its only noteworthy contribution.
      start: '1853/02/18'
    },
    {
      name: 'Number Three',
      // The horse Justify wins the Triple Crown, 99 years after it was first
      // won by the horse Sir Barton.
      milestones: [
        { end: '2018/06/09', name: 'three-one', start: '2018/05/05' }
      ],
      // Dale Earnhardt wins his 3rd NASCAR championship driving car #3.
      start: '1987/11/22'
    }
  ];

  test('renders correctly', () => {
    expect(
      shallow(<ScheduleSummary activities={activities} />)
    ).toMatchSnapshot();
  });

  test('renders correctly with no data', () => {
    expect(shallow(<ScheduleSummary activities={[]} />)).toMatchSnapshot();
  });

  test('maps state to props', () => {
    const state = {
      activities: {
        byKey: {
          key1: {
            name: 'activity 1',
            // The Centennial Light, a 60-watt lightbulb was installed at a
            // firehouse in Livermore, California, where it's still lit.
            plannedStartDate: '1901-01-01',
            schedule: [
              // Sandra Day O'Connor, first woman to serve on the US Supreme
              // Court, retires.
              { endDate: '2006-01-31', milestone: '1-one' },
              // Thurgood Marshall, first African-American to serve on the US
              // Supreme Court, retires.
              { endDate: '1991-10-01', milestone: '1-two' },
              // Samuel Nelson, first person to retire from the US Supreme
              // Court, retires.
              { endDate: '1872-11-28', milestone: '1-three' }
            ]
          },
          key2: {
            name: 'activity 2',
            // The United States Camel Corps is created. Seriously, look it up.
            plannedStartDate: '1855-03-03',
            schedule: [
              // The Army sells its camels at auction, giving up the project.
              { endDate: '1864-06-06', milestone: '2-one' },
              // The last of the Army camels is sighted for the last time,
              // wandering the desert. Nobody knows what happened to it after
              // that, but through at least 1883, stories pop up from time to
              // time of a giant camel overturning wagons and trampling people
              // to death. They're probably not entirely true, though.
              { endDate: '1873-08-08', milestone: '2-two' }
            ]
          }
        }
      }
    };

    const props = mapStateToProps(state);

    expect(props).toMatchObject({
      activities: [
        {
          name: 'activity 1',
          milestones: [
            { end: '1872/11/28', name: '1-three' },
            { end: '1991/10/01', name: '1-two' },
            { end: '2006/01/31', name: '1-one' }
          ],
          start: '1901/01/01'
        },
        {
          name: 'activity 2',
          milestones: [
            { end: '1864/06/06', name: '2-one' },
            { end: '1873/08/08', name: '2-two' }
          ],
          start: '1855/03/03'
        }
      ]
    });
  });
});
