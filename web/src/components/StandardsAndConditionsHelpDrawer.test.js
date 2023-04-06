import React from 'react';
import { render, screen, waitFor } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import StandardsAndConditionsHelpDrawer from './StandardsAndConditionsHelpDrawer';

const setup = async () => {
  render(
    <main id="start-main-content" className="site-main">
      <StandardsAndConditionsHelpDrawer />
    </main>
  );
  const user = userEvent.setup();
  return { user };
};

describe('Standards and Conditions Help Drawer', () => {
  it('should only render the link initially', async () => {
    await setup();

    expect(
      screen.getByText('Review Standards and Conditions Regulation')
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        'An Excerpt 42 CFR 433.112 and Additional Conditions for Enhanced Funding'
      )
    ).toBeNull();
  });

  it('should open the help drawer when the user clicks the link', async () => {
    const { user } = await setup();

    user.click(screen.getByText('Review Standards and Conditions Regulation'));

    await waitFor(() => {
      expect(
        screen.getByText(
          'An Excerpt 42 CFR 433.112 and Additional Conditions for Enhanced Funding'
        )
      ).toBeInTheDocument();
    });
  });
});
