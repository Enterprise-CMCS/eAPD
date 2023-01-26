import React from 'react';
import { renderWithConnection, act, screen } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

import { plain as ApdOverviewHITECHFields } from './ApdOverviewHITECHFields';
// import { plain as ApdOverview } from './ApdOverview';

jest.mock('../../../util/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn()
}));

const defaultProps = {
  narrativeHIE: 'narrative HIE',
  narrativeHIT: 'narrative HIT',
  narrativeMMIS: 'narrative MMIS',
  programOverview: '',
  setHIE: jest.fn(),
  setHIT: jest.fn(),
  setMMIS: jest.fn(),
  setOverview: jest.fn()
};

const setup = async (props = {}) => {
  let util;
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    util = renderWithConnection(
      <ApdOverviewHITECHFields {...defaultProps} {...props} />,
      {
        initialState: {
          apd: {
            data: {
              activities: []
            }
          }
        }
      }
    );
  });
  const user = userEvent.setup();
  return {
    util,
    user
  };
};

describe('APD overview component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.setTimeout(30000);
    resetLDMocks();
  });

  test('dispatches on text change', async () => {
    mockFlags({ enableMmis: false });
    jest.setTimeout(30000);
    const { user } = await setup();

    await user.type(screen.getByLabelText('Introduction'), 'it is really cool');
    expect(screen.getByLabelText('Introduction')).toHaveValue(
      'it is really cool'
    );
  });
});
