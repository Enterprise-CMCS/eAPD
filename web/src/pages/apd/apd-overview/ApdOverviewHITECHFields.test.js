import React from 'react';
import { act, renderWithConnection, screen } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import { plain as ApdOverviewHITECHFields } from './ApdOverviewHITECHFields';

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
  programOverview: 'introduction',
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
  });

  test('allows text changes', async () => {
    const { user } = await setup();

    const introductionElement = screen.getByLabelText('Introduction');
    const hitOverviewElement = screen.getByLabelText('HIT Overview');
    const hieOverviewElement = screen.getByLabelText('HIE Overview');
    const mmisOverviewElement = screen.getByLabelText('MMIS Overview');

    const newIntroductionText = 'it is really cool';
    const newHitText = 'still so cool';
    const newHieText = 'yup, cool';
    const newMmisText = 'cooool';

    // Introduction
    expect(introductionElement).toHaveValue(defaultProps.programOverview);
    await user.clear(introductionElement);
    await user.type(introductionElement, newIntroductionText);
    expect(introductionElement).toHaveValue(newIntroductionText);

    // HIT Overview
    expect(hitOverviewElement).toHaveValue(defaultProps.narrativeHIT);
    await user.clear(hitOverviewElement);
    await user.type(hitOverviewElement, newHitText);
    expect(hitOverviewElement).toHaveValue(newHitText);

    // HIE Overview
    expect(hieOverviewElement).toHaveValue(defaultProps.narrativeHIE);
    await user.clear(hieOverviewElement);
    await user.type(hieOverviewElement, newHieText);
    expect(hieOverviewElement).toHaveValue(newHieText);

    // MMIS Overview
    expect(mmisOverviewElement).toHaveValue(defaultProps.narrativeMMIS);
    await user.clear(mmisOverviewElement);
    await user.type(mmisOverviewElement, newMmisText);
    expect(mmisOverviewElement).toHaveValue(newMmisText);
  });
});
