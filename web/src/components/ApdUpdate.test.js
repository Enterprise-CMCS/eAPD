import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import { APD_TYPE } from '@cms-eapd/common';
import ApdUpdate from './ApdUpdate';

const setup = (props = {}, options = {}) => {
  return renderWithConnection(<ApdUpdate {...props} />, options);
};

let reduxState;
beforeEach(() => {
  reduxState = {
    initialState: {
      apd: {
        data: {
          apdOverview: {
            updateStatus: {
              isUpdateAPD: true,
              annualUpdate: true,
              asNeededUpdate: false
            }
          },
          apdType: APD_TYPE.MMIS
        }
      }
    }
  };
});

describe('APD Update for any APD type', () => {
  it('allows both "annualUpdate" and "asNeededUpdate" options to be checked', () => {
    const { updateStatus } = reduxState.initialState.apd.data.apdOverview;
    updateStatus.annualUpdate = true;
    updateStatus.asNeededUpdate = true;
    setup(null, reduxState);

    expect(screen.getByLabelText('Annual update')).toBeChecked();
    expect(screen.getByLabelText('As-needed update')).toBeChecked();
  });
});

describe('APD Update for MMIS APD type', () => {
  beforeEach(() => {
    reduxState.initialState.apd.data.apdType = APD_TYPE.MMIS;
  });
  it('renders "Is this an APD update?" options and "Update Type" options when "isUpdateAPD" is true', () => {
    const updateStatus = {
      isUpdateAPD: true,
      annualUpdate: true,
      asNeededUpdate: false
    };
    reduxState.initialState.apd.data.apdOverview.updateStatus = updateStatus;
    setup(null, reduxState);

    expect(screen.getByText('Is this an APD update?')).toBeInTheDocument();
    expect(
      screen.getByLabelText('No, this is for a new project.')
    ).not.toBeChecked();
    expect(screen.getByLabelText('Yes, it is an update.')).toBeChecked();

    expect(screen.getByText('Update Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Annual update')).toBeChecked();
    expect(screen.getByLabelText('As-needed update')).not.toBeChecked();
  });

  it('renders "Is this an APD update?" options only when "isUpdateAPD" is false', () => {
    const updateStatus = {
      isUpdateAPD: false,
      annualUpdate: false,
      asNeededUpdate: false
    };
    reduxState.initialState.apd.data.apdOverview.updateStatus = updateStatus;
    setup(null, reduxState);

    expect(screen.getByText('Is this an APD update?')).toBeInTheDocument();
    expect(
      screen.getByLabelText('No, this is for a new project.')
    ).toBeChecked();
    expect(screen.getByLabelText('Yes, it is an update.')).not.toBeChecked();

    expect(screen.queryByText('Update Type')).not.toBeInTheDocument();
  });

  it('hides "Update Type" options when "Is this an APD update?" option has not yet been selected', () => {
    reduxState.initialState.apd.data.apdOverview.updateStatus.isUpdateAPD =
      null;
    setup(null, reduxState);

    expect(screen.getByText('Is this an APD update?')).toBeInTheDocument();
    expect(
      screen.getByLabelText('No, this is for a new project.')
    ).not.toBeChecked();
    expect(screen.getByLabelText('Yes, it is an update.')).not.toBeChecked();

    expect(screen.queryByText('Update Type')).not.toBeInTheDocument();
  });
});

describe('APD Update for HITECH APD type', () => {
  beforeEach(() => {
    reduxState.initialState.apd.data.apdType = APD_TYPE.HITECH;
  });
  it('renders "Update Type" options only', () => {
    const { updateStatus } = reduxState.initialState.apd.data.apdOverview;
    updateStatus.annualUpdate = true;
    updateStatus.asNeededUpdate = false;
    setup(null, reduxState);

    expect(screen.getByText('Update Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Annual update')).toBeChecked();
    expect(screen.getByLabelText('As-needed update')).not.toBeChecked();

    expect(
      screen.queryByText('Is this an APD update?')
    ).not.toBeInTheDocument();
  });
});
