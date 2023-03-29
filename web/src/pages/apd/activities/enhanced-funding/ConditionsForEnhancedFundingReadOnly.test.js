import React from 'react';
import { render, screen } from 'apd-testing-library';

import ConditionsForEnhancedFundingReadOnly from './ConditionsForEnhancedFundingReadOnly';
import {
  EmptyEnhancedFundingReadOnlyStory,
  NoQualificationReadOnlyStory,
  YesQualificationEmptyJustificationReadOnlyStory,
  YesQualificationJustificationReadOnlyStory
} from './ConditionsForEnhancedFundingReadOnly.stories';

const defaultProps = {
  activityIndex: 0
};

const setup = async (props = {}) =>
  render(<ConditionsForEnhancedFundingReadOnly {...defaultProps} {...props} />);

/* eslint-disable testing-library/no-node-access */
describe('Conditions for Enhanced Funding Read-Only', () => {
  it('should render empty values correctly', async () => {
    await setup({ ...EmptyEnhancedFundingReadOnlyStory.args });
    expect(
      screen.getByText(/Activity 1: Pharmacy Management/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Conditions for Enhanced Funding/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Enhanced Funding Qualification/i).closest('div')
    ).toHaveTextContent('No response was provided.');
    expect(
      screen.getByText(/Enhanced Funding Justification/i).closest('div')
    ).toHaveTextContent('No response was provided.');
  });

  it('should render the No qualification values correctly', async () => {
    await setup({ ...NoQualificationReadOnlyStory.args });

    expect(
      screen.getByText(/Enhanced Funding Qualification/i).closest('div')
    ).toHaveTextContent(
      'No, not applicable for enhanced funding, this activity has a 50/50 federal state split.'
    );
    expect(screen.queryByText(/Enhanced Funding Justification/i)).toBeNull();
  });

  it('should render the Yes qualification with no justification values correctly', async () => {
    await setup({ ...YesQualificationEmptyJustificationReadOnlyStory.args });

    expect(
      screen.getByText(/Enhanced Funding Qualification/i).closest('div')
    ).toHaveTextContent(
      'Yes, this activity is qualified for enhanced funding.'
    );
    expect(
      screen.getByText(/Enhanced Funding Justification/i).closest('div')
    ).toHaveTextContent('No response was provided.');
  });

  it('should render the Yest qualification with justification values correctly', async () => {
    await setup({ ...YesQualificationJustificationReadOnlyStory.args });
    expect(
      screen.getByText(/Enhanced Funding Qualification/i).closest('div')
    ).toHaveTextContent(
      'Yes, this activity is qualified for enhanced funding.'
    );
    expect(
      screen.getByText(/Enhanced Funding Justification/i).closest('div')
    ).toHaveTextContent(
      YesQualificationJustificationReadOnlyStory.args.activity
        .conditionsForEnhancedFunding.enhancedFundingJustification
    );
  });
});
