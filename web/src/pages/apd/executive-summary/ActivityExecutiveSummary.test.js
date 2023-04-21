import React from 'react';
import { screen, render } from 'apd-testing-library';
import { MemoryRouter } from 'react-router-dom';

import ActivityExecutiveSummary from './ActivityExecutiveSummary';

describe('<ActivityExecutiveSummary />', () => {
  it('renders "No Activites" info when activities data is empty', () => {
    const activitiesData = [];
    render(
      <ActivityExecutiveSummary
        apdId={'1234'}
        data={activitiesData}
        years={['1999']}
      />
    );
    expect(screen.getByText('No activities were added')).toBeInTheDocument();
  });

  it('renders Activities info when activities data is present', () => {
    const activitiesData = [
      {
        activityId: '152a1e2b',
        dateRange: '9/30/2017 - 9/29/2024',
        name: 'Activity 1',
        summary: 'This is a snapshot',
        combined: 5259076,
        federal: 4353032,
        medicaid: 5154076,
        ffys: {
          2023: {
            federal: 2924848,
            medicaid: 3249831,
            state: 324983,
            total: 3354831
          },
          2024: {
            federal: 1428184,
            medicaid: 1904245,
            state: 476061,
            total: 1904245
          }
        }
      },
      {
        activityId: '3110a314',
        dateRange: '9/30/2019 - 9/29/2022',
        name: 'Activity 2',
        summary: 'Snapshot',
        combined: 4896000,
        federal: 3942450,
        medicaid: 4896000,
        ffys: {
          2023: {
            federal: 1622700,
            medicaid: 1803000,
            state: 180300,
            total: 1803000
          },
          2024: {
            federal: 2319750,
            medicaid: 3093000,
            state: 773250,
            total: 3093000
          }
        }
      }
    ];
    render(<ActivityExecutiveSummary apdId={'1234'} data={activitiesData} />);
    expect(
      screen.getByText(`Activity 1: ${activitiesData[0].name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Activity 2: ${activitiesData[1].name}`)
    ).toBeInTheDocument();
  });

  it('renders edit button when "enableEdit" is true and "apdId" exists', () => {
    const apdId = '1234';
    const activitiesData = [
      {
        activityId: '152a1e2b',
        dateRange: '9/30/2017 - 9/29/2024',
        name: 'Activity 1',
        summary: 'This is a snapshot',
        combined: 5259076,
        federal: 4353032,
        medicaid: 5154076,
        ffys: {
          2023: {
            federal: 2924848,
            medicaid: 3249831,
            state: 324983,
            total: 3354831
          },
          2024: {
            federal: 1428184,
            medicaid: 1904245,
            state: 476061,
            total: 1904245
          }
        }
      }
    ];
    render(
      <MemoryRouter>
        <ActivityExecutiveSummary
          apdId={apdId}
          data={activitiesData}
          enableEdit={true}
        />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: 'Edit' })).toHaveAttribute(
      'href',
      `/apd/${apdId}/activity/0/overview`
    );
  });

  it('hides edit button when "enableEdit" is false', () => {
    const apdId = '1234';
    const activitiesData = [
      {
        activityId: '152a1e2b',
        dateRange: '9/30/2017 - 9/29/2024',
        name: 'Activity 1',
        summary: 'This is a snapshot',
        combined: 5259076,
        federal: 4353032,
        medicaid: 5154076,
        ffys: {
          2023: {
            federal: 2924848,
            medicaid: 3249831,
            state: 324983,
            total: 3354831
          },
          2024: {
            federal: 1428184,
            medicaid: 1904245,
            state: 476061,
            total: 1904245
          }
        }
      }
    ];
    render(
      <MemoryRouter>
        <ActivityExecutiveSummary
          apdId={apdId}
          data={activitiesData}
          enableEdit={false}
        />
      </MemoryRouter>
    );
    expect(
      screen.queryByRole('link', { name: 'Edit' })
    ).not.toBeInTheDocument();
  });
});
