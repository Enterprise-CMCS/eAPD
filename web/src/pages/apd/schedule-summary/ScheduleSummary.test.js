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
        { end: '03/16/1996', name: 'one-one' },
        // The Beatles begin their record-holding streak of #1 hits on
        // Billboard with "Love Me Do" and wrap things up with "The Long and
        // Winding Road"
        { end: '05/23/1970', name: 'one-two' }
      ],
      dateRange: 'date range 1',
      // The first modern Olympics come to a close in Athens, Greece.
      end: '4/15/1896',
      // For the first time, Captain Picard gives Commander Riker his most
      // famous order:  "Make it so, Number One."
      start: '12/10/1988'
    },
    {
      name: 'Number 💩',
      milestones: [
        // The Squatty Potty commercial hits YouTube and instantly goes viral.
        { end: '10/06/2016', name: 'three-one' },
        // National Geographic publishes a story about a 50,000-year old poop
        // discovered in Spain.
        { end: '06/25/2014', name: 'two-two' },
        // The Gemini V mission marks the first time humans pooped in space.
        // During the 8-day mission, Gordon Cooper and Pete Conrad pooped a
        // total of 4 times.
        { end: '08/21/1965', name: 'two-three' }
      ],
      dateRange: 'date range 2',
      // Al Roker trusted a fart in the White House press room. He soon
      // realized his mistake.
      end: '07/14/2002',
      // First flush toilet installed in the White House during the Millard
      // Filmore administration, possibly its only noteworthy contribution.
      start: '02/18/1853'
    },
    {
      name: 'Number Three',
      // The horse Justify wins the Triple Crown, 99 years after it was first
      // won by the horse Sir Barton.
      milestones: [{ end: '06/09/2018', name: 'three-one' }],
      dateRange: 'date range 3',
      // Researchers conclude that bronze medalists are happier than silver
      // medalists.
      end: '10/15/2009',
      // Dale Earnhardt wins his 3rd NASCAR championship driving car #3.
      start: '11/22/1987'
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
      apd: {
        data: {
          activities: [
            {
              name: 'activity 1',
              activitySchedule: {
                // The Centennial Light, a 60-watt lightbulb was installed at a
                // firehouse in Livermore, California, where it's still lit.
                plannedStartDate: '1901-01-01',
                // Chuck Yeager became the first person to break the sound barrier.
                plannedEndDate: '1947-10-14'
              },
              milestones: [
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
            {
              name: 'activity 2',
              activitySchedule: {
                // The United States Camel Corps is created. Seriously, look it up.
                plannedStartDate: '1855-03-03',
                // Franklin Pierce becomes President, and kicks off a truly bizarre
                // episode in American military history.
                plannedEndDate: '1853-03-04'
              },
              milestones: [
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
          ]
        }
      }
    };

    const props = mapStateToProps(state);

    expect(props).toMatchObject({
      activities: [
        {
          dateRange: '1/1/1901 - 10/14/1947',
          end: '10/14/1947',
          name: 'activity 1',
          milestones: [
            { end: '11/28/1872', name: '1-three' },
            { end: '10/1/1991', name: '1-two' },
            { end: '1/31/2006', name: '1-one' }
          ],
          start: '1/1/1901'
        },
        {
          dateRange: '3/3/1855 - 3/4/1853',
          end: '3/4/1853',
          name: 'activity 2',
          milestones: [
            { end: '6/6/1864', name: '2-one' },
            { end: '8/8/1873', name: '2-two' }
          ],
          start: '3/3/1855'
        }
      ]
    });
  });
});
