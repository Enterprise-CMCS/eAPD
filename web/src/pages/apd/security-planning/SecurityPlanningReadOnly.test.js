import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

import { APD_TYPE } from '@cms-eapd/common';

import SecurityPlanningSummary from './SecurityPlanningReadOnly';

const emptyState = {
  apd: {
    data: {
      securityPlanning: {
        securityAndInterfacePlan: '',
        businessContinuityAndDisasterRecovery: ''
      }
    }
  }
};

const initialState = {
  apd: {
    data: {
      apdType: APD_TYPE.MMIS,
      securityPlanning: {
        securityAndInterfacePlan:
          'From where I am sitting, I can see thousands of files. Many spread loosely around the place, others crushed into unmarked boxes. A few have dates on them or helpful labels such as 86-91 G/H. Not only that, but most of these appear to be handwritten or produced on a typewriter with no accompanying digital or audio versions of any sort. In fact, I believe the first computer to ever enter this room is the laptop that I brought in today. More importantly, it seems as though little of the actual investigations have been stored in the Archives, so the only thing in most of the files are the statements themselves.',
        businessContinuityAndDisasterRecovery:
          'It is going to take me a long, long time to organise this mess. I’ve managed to secure the services of two researchers to assist me. Well, technically three, but I don’t count Martin as he’s unlikely to contribute anything but delays. I plan to digitise the files as much as possible and record audio versions, though some will have to be on tape recorder, as my attempts to get them on my laptop have met with… significant audio distortions.'
      }
    }
  }
};

const setup = async (props = {}, options = {}) => {
  renderWithConnection(<SecurityPlanningSummary {...props} />, options);

  expect(await screen.findByText(/Security Planning/)).toBeInTheDocument();
};

describe('security planning summary component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetLDMocks();
    mockFlags({ enableMmis: true });
  });

  test('renders correctly without data', async () => {
    await setup(
      {},
      {
        initialState: emptyState
      }
    );

    expect(await screen.findByText(/Security Planning/)).toBeInTheDocument();
    expect(await screen.findAllByText(/No response was provided/)).toHaveLength(
      2
    );
  });

  test('renders correctly with data', async () => {
    await setup(
      {},
      {
        initialState
      }
    );

    expect(await screen.findByText(/Security Planning/)).toBeInTheDocument();
    expect(
      await screen.findByText(
        initialState.apd.data.securityPlanning.securityAndInterfacePlan
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        initialState.apd.data.securityPlanning
          .businessContinuityAndDisasterRecovery
      )
    ).toBeInTheDocument();
  });
});
