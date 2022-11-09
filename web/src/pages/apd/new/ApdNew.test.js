import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  waitFor
} from 'apd-testing-library';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';
import userEvent from '@testing-library/user-event';

import ApdNew from './ApdNew';

jest.mock('../../../util/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

const defaultProps = {
  createApd: jest.fn(),
  years: ['2023', '2024'],
  yearOptions: ['2023', '2024', '2025']
};

let options;
let props;
const setup = async (props = {}, options = {}) => {
  let util;
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    util = renderWithConnection(
      <ApdNew {...defaultProps} {...props} />,
      options
    );
  });
  const user = userEvent.setup();
  return {
    util,
    user
  };
};

describe('<ApdNew />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.setTimeout(30000);
    resetLDMocks();
  });

  describe('form with Mmis enabled', () => {
    beforeEach(() => {
      mockFlags({ enableMmis: true });
    });

    it('should display form with MMIS', async () => {
      await setup(props, options);
      expect(
        screen.getByText(/Create a New Advanced Planning Document/)
      ).toBeTruthy();
      expect(screen.getByText(/MMIS IAPD/)).toBeTruthy();
      expect(
        screen.getByRole('button', { name: /Create an APD/ })
      ).toBeDisabled();
    });

    describe('selecting and filling out HITECH form', () => {
      it('HITECH selected should show HITECH form', async () => {
        const { user } = await setup(props, options);
        user.click(screen.getByRole('radio', { name: /HITECH IAPD/i }));

        await waitFor(() => {
          expect(
            screen.getByRole('radio', { name: /HITECH IAPD/i })
          ).toBeChecked();
        });

        expect(screen.getByText(/Update Type/i)).toBeTruthy();
        expect(screen.queryByText(/Is this an APD update/i)).toBeFalsy();
        expect(screen.queryByText(/Medicaid Business Areas/i)).toBeFalsy();
        expect(
          screen.getByRole('button', { name: /Create an APD/ })
        ).toBeDisabled();
      });

      it('Filled out HITECH form should enable Create APD button', async () => {
        const { user } = await setup(props, options);
        const disabledBtn = screen.getByRole('button', {
          name: /Create an APD/
        });

        user.click(screen.getByRole('radio', { name: /HITECH IAPD/i }));

        await waitFor(() => {
          expect(
            screen.getByRole('radio', { name: /HITECH IAPD/i })
          ).toBeChecked();
        });

        expect(disabledBtn).toBeDisabled();

        await user.type(
          screen.getByRole('textbox', { name: /name/i }),
          'APD Name'
        );

        expect(disabledBtn).toBeDisabled();

        expect(screen.getByRole('checkbox', { name: /2023/i })).toBeChecked();
        expect(screen.getByRole('checkbox', { name: /2024/i })).toBeChecked();
        expect(
          screen.getByRole('checkbox', { name: /2025/i })
        ).not.toBeChecked();

        await user.click(screen.getByRole('checkbox', { name: /2024/i }));
        expect(
          screen.getByRole('checkbox', { name: /2024/i })
        ).not.toBeChecked();

        await user.click(
          screen.getByRole('checkbox', { name: /Annual update/i })
        );
        expect(
          screen.getByRole('checkbox', { name: /Annual update/i })
        ).toBeChecked();
        expect(disabledBtn).toBeEnabled();
      });
    });

    describe('selecting and filling out MMIS form', () => {
      it('MMIS selected should show MMIS form', async () => {
        const { user } = await setup(props, options);
        user.click(screen.getByRole('radio', { name: /MMIS IAPD/i }));

        await waitFor(() => {
          expect(
            screen.getByRole('radio', { name: /MMIS IAPD/i })
          ).toBeChecked();
        });

        expect(screen.getByText(/Is this an APD update/i)).toBeTruthy();
        expect(screen.getByText(/Medicaid Business Areas/i)).toBeTruthy();
        expect(
          screen.getByRole('button', { name: /Create an APD/ })
        ).toBeDisabled();
      });

      it('Filled out MMIS form should enable Create APD button', async () => {
        const { user } = await setup(props, options);
        const disabledBtn = screen.getByRole('button', {
          name: /Create an APD/
        });

        await user.click(screen.getByRole('radio', { name: /MMIS IAPD/i }));
        expect(screen.getByRole('radio', { name: /MMIS IAPD/i })).toBeChecked();
        expect(disabledBtn).toBeDisabled();

        await user.type(
          screen.getByRole('textbox', { name: /name/i }),
          'APD Name'
        );
        expect(disabledBtn).toBeDisabled();

        expect(screen.getByRole('checkbox', { name: /2023/i })).toBeChecked();
        expect(screen.getByRole('checkbox', { name: /2024/i })).toBeChecked();
        expect(
          screen.getByRole('checkbox', { name: /2025/i })
        ).not.toBeChecked();

        await user.click(screen.getByRole('checkbox', { name: /2024/i }));
        expect(
          screen.getByRole('checkbox', { name: /2024/i })
        ).not.toBeChecked();

        await user.click(
          screen.getByRole('checkbox', { name: /Claims Processing/i })
        );
        expect(
          screen.getByRole('checkbox', { name: /Claims Processing/i })
        ).toBeChecked();
        expect(disabledBtn).toBeDisabled();

        user.click(
          screen.getByRole('radio', { name: /No, this is for a new project/i })
        );
        await waitFor(() => {
          expect(
            screen.getByRole('radio', {
              name: /No, this is for a new project/i
            })
          ).toBeChecked();
        });
        expect(disabledBtn).toBeEnabled();

        await user.click(screen.getByRole('checkbox', { name: /Other/i }));
        expect(screen.getByRole('checkbox', { name: /Other/i })).toBeChecked();
        expect(disabledBtn).toBeDisabled();

        const otherBox = screen.getByRole('textbox', {
          name: 'Other Medicaid Business Area(s) Since the Medicaid Business is not listed above, provide the name of the Medicaid Business Area. If there are multiple, separate other business areas with a semi-colon.'
        });

        await user.type(otherBox, 'other');

        await user.click(
          screen.getByRole('checkbox', { name: /Claims Processing/i })
        );
        expect(
          screen.getByRole('checkbox', { name: /Claims Processing/i })
        ).not.toBeChecked();
        expect(disabledBtn).toBeEnabled();
      });
    });
  });
});
