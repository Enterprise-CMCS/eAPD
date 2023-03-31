import React from 'react';
import { render, screen } from 'apd-testing-library';

import ConditionsForEnhancedFundingReadOnly from './ConditionsForEnhancedFundingReadOnly';

const defaultProps = {
  activityIndex: 0
};

const setup = async (props = {}) =>
  render(<ConditionsForEnhancedFundingReadOnly {...defaultProps} {...props} />);

/* eslint-disable testing-library/no-node-access */
describe('Conditions for Enhanced Funding Read-Only', () => {
  it('should render empty values correctly', async () => {
    await setup({
      activityIndex: 0,
      activity: {
        name: 'Pharmacy Management',
        conditionsForEnhancedFunding: {
          enhancedFundingQualification: null,
          enhancedFundingJustification: null
        }
      }
    });
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
    await setup({
      activityIndex: 0,
      activity: {
        name: 'Pharmacy Management',
        conditionsForEnhancedFunding: {
          enhancedFundingQualification: false,
          enhancedFundingJustification: null
        }
      }
    });

    expect(
      screen.getByText(/Enhanced Funding Qualification/i).closest('div')
    ).toHaveTextContent(
      'No, not applicable for enhanced funding, this activity has a 50/50 federal state split.'
    );
    expect(screen.queryByText(/Enhanced Funding Justification/i)).toBeNull();
  });

  it('should render the Yes qualification with no justification values correctly', async () => {
    await setup({
      activityIndex: 0,
      activity: {
        name: 'Pharmacy Management',
        conditionsForEnhancedFunding: {
          enhancedFundingQualification: true,
          enhancedFundingJustification: null
        }
      }
    });

    expect(
      screen.getByText(/Enhanced Funding Qualification/i).closest('div')
    ).toHaveTextContent(
      'Yes, this activity is qualified for enhanced funding.'
    );
    expect(
      screen.getByText(/Enhanced Funding Justification/i).closest('div')
    ).toHaveTextContent('No response was provided.');
  });

  it('should render the Yes qualification with justification values correctly', async () => {
    const enhancedFundingJustification =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at tellus elit. Pellentesque sed porttitor velit. In at dui vitae elit fringilla mattis. Fusce aliquet tincidunt arcu sit amet volutpat. Aenean maximus ultrices nulla, quis ultrices odio maximus eget. Duis blandit nisl libero, id hendrerit sem elementum nec. In est turpis, sodales sed nisl sed, pulvinar cursus tortor. Ut sit amet imperdiet velit. Ut maximus dui at purus tempor, et accumsan magna aliquam. Pellentesque vitae lorem elementum, eleifend turpis vitae, congue diam. Vestibulum in magna auctor, imperdiet sem vel, placerat sapien. Mauris facilisis neque metus, eu ultricies tortor tempor id.';
    await setup({
      activityIndex: 0,
      activity: {
        name: 'Pharmacy Management',
        conditionsForEnhancedFunding: {
          enhancedFundingQualification: true,
          enhancedFundingJustification
        }
      }
    });
    expect(
      screen.getByText(/Enhanced Funding Qualification/i).closest('div')
    ).toHaveTextContent(
      'Yes, this activity is qualified for enhanced funding.'
    );
    expect(
      screen.getByText(/Enhanced Funding Justification/i).closest('div')
    ).toHaveTextContent(enhancedFundingJustification);
  });
});
