import { shallow } from 'enzyme';
import React from 'react';
import { renderWithConnection, screen, waitFor } from 'apd-testing-library';

import {
  plain as PreviousActivities,
  mapStateToProps,
  mapDispatchToProps
} from './PreviousActivities';

import { setPreviousActivitySummary } from '../../../redux/actions/editApd';

const setup = (props = {}, options = {}) => {
  return renderWithConnection(<PreviousActivities {...props} />, options);
};

const hitechState = {
  initialState: {
    apd: {
      data: {
        apdType: 'HITECH',
        years: ['2022', '2023'],
        previousActivities: {
          previousActivitySummary: 'bob',
          actualExpenditures: {
            2022: {
              hithie: { federalActual: 146346, totalApproved: 234526 },
              mmis: {
                50: { federalActual: 129387, totalApproved: 375445 },
                75: { federalActual: 413246, totalApproved: 654455 },
                90: { federalActual: 614544, totalApproved: 863455 }
              }
            },
            2023: {
              hithie: { federalActual: 320000, totalApproved: 540000 },
              mmis: {
                50: { federalActual: 0, totalApproved: 0 },
                75: { federalActual: 0, totalApproved: 0 },
                90: { federalActual: 0, totalApproved: 0 }
              }
            }
          }
        },
        activities: []
      }
    }
  }
};

const mmisState = {
  initialState: {
    apd: {
      data: {
        apdType: 'MMIS',
        years: ['2022', '2023'],
        previousActivities: {
          previousActivitySummary: 'bob2',
          actualExpenditures: {
            2022: {
              mmis: {
                50: { federalActual: 129387, totalApproved: 375445 },
                75: { federalActual: 413246, totalApproved: 654455 },
                90: { federalActual: 614544, totalApproved: 863455 }
              }
            },
            2023: {
              mmis: {
                50: { federalActual: 0, totalApproved: 0 },
                75: { federalActual: 0, totalApproved: 0 },
                90: { federalActual: 0, totalApproved: 0 }
              }
            }
          }
        },
        activities: []
      }
    }
  }
};

describe('previous activities component', () => {
  const hitechProps = {
    previousActivities: {
      previousActivitySummary: 'bob'
    },
    setSummary: jest.fn(),
    apdType: 'HITECH'
  };

  const mmisProps = {
    previousActivities: {
      previousActivitySummary: 'bob2'
    },
    setSummary: jest.fn(),
    apdType: 'MMIS'
  };

  beforeEach(() => {
    hitechProps.setSummary.mockClear();
  });

  it('updates on text change', () => {
    const component = shallow(<PreviousActivities {...hitechProps} />);
    component.find('Connect(RichText)').prop('onSync')('this is html');

    expect(hitechProps.setSummary).toHaveBeenCalledWith('this is html');
  });

  it('maps state to props', () => {
    expect(
      mapStateToProps({
        apd: {
          data: {
            apdType: 'HITECH',
            previousActivities: { previousActivitySummary: 'summary' }
          }
        }
      })
    ).toEqual({ apdType: 'HITECH', previousActivitySummary: 'summary' });
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      setSummary: setPreviousActivitySummary
    });
  });

  it('renders correctly for HITECH', async () => {
    setup(hitechProps, hitechState);

    await waitFor(() => {
      expect(screen.getAllByRole('table')).toHaveLength(5);
    });

    expect(
      screen.getByRole('table', {
        name: 'Grand totals: Federal HIT, HIE, MMIS'
      })
    );
  });

  it('renders correctly for MMIS', async () => {
    setup(mmisProps, mmisState);

    await waitFor(() => {
      expect(screen.getAllByRole('table')).toHaveLength(4);
    });

    expect(screen.getByRole('table', { name: 'Grand totals: Federal MMIS' }));
  });
});
