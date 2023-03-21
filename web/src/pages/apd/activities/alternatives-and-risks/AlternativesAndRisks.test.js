import React from 'react';
import { renderWithConnection, screen, waitFor } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import AlternativesAndRisks from './AlternativesAndRisks';

const initialStateEmpty = {
  apd: {
    data: {
      apdType: 'MMIS',
      activities: [
        {
          analysisOfAlternativesAndRisks: {
            alternativeAnalysis: '',
            costBenefitAnalysis: '',
            feasibilityStudy: '',
            requirementsAnalysis: '',
            forseeableRisks: ''
          }
        }
      ]
    }
  }
};

const initialState = {
  apd: {
    data: {
      apdType: 'MMIS',
      activities: [
        {
          analysisOfAlternativesAndRisks: {
            alternativeAnalysis: 'Test alternative analysis',
            costBenefitAnalysis: 'Test cost benefit analysis',
            feasibilityStudy: 'Test feasibility study',
            requirementsAnalysis: 'Test requirements analysis',
            forseeableRisks: 'Test forseeable risks'
          }
        }
      ]
    }
  }
};

const defaultProps = {
  activityIndex: 0,
  setAlternativeAnalysis: jest.fn(),
  setCostBenefitAnalysis: jest.fn(),
  setFeasibilityStudy: jest.fn(),
  setRequirementsAnalysis: jest.fn(),
  setForseeableRisks: jest.fn()
};

const setup = async (props = {}, options = {}) => {
  renderWithConnection(
    <AlternativesAndRisks {...defaultProps} {...props} />,
    options
  );
  const user = userEvent.setup();
  return { user };
};

describe('Alternatives and Risks', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly with no data', async () => {
    await setup({}, { initialState: initialStateEmpty });

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: 'Analysis of Alternatives and Risk',
          level: 3
        })
      ).toBeInTheDocument();
    });
    expect(screen.getByLabelText(/Alternative Analysis/i)).toHaveValue('');
    expect(screen.getByLabelText(/Cost Benefit Analysis/i)).toHaveValue('');
    expect(screen.getByLabelText(/Feasibility Study/i)).toHaveValue('');
    expect(screen.getByLabelText(/Requirements Analysis/i)).toHaveValue('');
    expect(screen.getByLabelText(/Forseeable Risks/i)).toHaveValue('');
  });

  it('should handle entering data in the fields', async () => {
    const { user } = await setup({}, { initialState: initialStateEmpty });

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: 'Analysis of Alternatives and Risk',
          level: 3
        })
      ).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Alternative Analysis/i)).toHaveValue('');
    user.type(
      screen.getByLabelText(/Alternative Analysis/i),
      'Entering an alternative analysis'
    );
    await waitFor(() => {
      expect(screen.getByLabelText(/Alternative Analysis/i)).toHaveValue(
        'Entering an alternative analysis'
      );
    });

    expect(screen.getByLabelText(/Cost Benefit Analysis/i)).toHaveValue('');
    user.type(
      screen.getByLabelText(/Cost Benefit Analysis/i),
      'Entering an cost benefit analysis'
    );
    await waitFor(() => {
      expect(screen.getByLabelText(/Cost Benefit Analysis/i)).toHaveValue(
        'Entering an cost benefit analysis'
      );
    });

    expect(screen.getByLabelText(/Feasibility Study/i)).toHaveValue('');
    user.type(
      screen.getByLabelText(/Feasibility Study/i),
      'Entering an feasibility study'
    );
    await waitFor(() => {
      expect(screen.getByLabelText(/Feasibility Study/i)).toHaveValue(
        'Entering an feasibility study'
      );
    });

    expect(screen.getByLabelText(/Requirements Analysis/i)).toHaveValue('');
    user.type(
      screen.getByLabelText(/Requirements Analysis/i),
      'Entering an requirements analysis'
    );
    await waitFor(() => {
      expect(screen.getByLabelText(/Requirements Analysis/i)).toHaveValue(
        'Entering an requirements analysis'
      );
    });

    expect(screen.getByLabelText(/Forseeable Risks/i)).toHaveValue('');
    user.type(
      screen.getByLabelText(/Forseeable Risks/i),
      'Entering an forseeable risks'
    );
    await waitFor(() => {
      expect(screen.getByLabelText(/Forseeable Risks/i)).toHaveValue(
        'Entering an forseeable risks'
      );
    });
  });

  it('should load existing data', async () => {
    await setup({}, { initialState });

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: 'Analysis of Alternatives and Risk',
          level: 3
        })
      ).toBeInTheDocument();
    });
    expect(screen.getByLabelText(/Alternative Analysis/i)).toHaveValue(
      'Test alternative analysis'
    );
    expect(screen.getByLabelText(/Cost Benefit Analysis/i)).toHaveValue(
      'Test cost benefit analysis'
    );
    expect(screen.getByLabelText(/Feasibility Study/i)).toHaveValue(
      'Test feasibility study'
    );
    expect(screen.getByLabelText(/Requirements Analysis/i)).toHaveValue(
      'Test requirements analysis'
    );
    expect(screen.getByLabelText(/Forseeable Risks/i)).toHaveValue(
      'Test forseeable risks'
    );
  });
});
