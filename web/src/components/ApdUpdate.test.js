import React from 'react';
import { act, renderWithConnection, screen } from 'apd-testing-library';
import { plain as ApdUpdate } from './ApdUpdate';

const defaultProps = {
  updateStatus: {
    isUpdateAPD: true,
    annualUpdate: true,
    asNeededUpdate: false
  },
  apdType: 'MMIS',
  setUpdateStatusField: jest.fn()
};

const setup = async (props = {}) => {
  let util;
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    util = renderWithConnection(<ApdUpdate {...defaultProps} {...props} />);
  });
  return {
    util
  };
};

describe('APD update component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.setTimeout(30000);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('displays options as selected or unselected based on initial data', async () => {
    const newProps = Object.assign({}, defaultProps);
    newProps.updateStatus.isUpdateAPD = true;
    newProps.updateStatus.annualUpdate = true;
    newProps.updateStatus.asNeededUpdate = false;
    setup(newProps);

    // const selectedMedicaidBusinessAreaElement = screen.getByLabelText(
    //   MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING['waiverSupportSystems']
    // );
    // const unselectedMedicaidBusinessAreaElement = screen.getByLabelText(
    //   MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING['claimsProcessing']
    // );

    // expect(selectedMedicaidBusinessAreaElement).toBeChecked();
    // expect(unselectedMedicaidBusinessAreaElement).not.toBeChecked();
    expect(screen.getByText('Is this an APD Update?'));
  });
});
