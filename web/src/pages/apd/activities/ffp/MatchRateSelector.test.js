import React from 'react';
import { render, screen, waitFor } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';

import MatchRateSelector from './MatchRateSelector';
import { FUNDING_CATEGORY_TYPE } from '@cms-eapd/common';

const defaultProps = {
  ffy: '2023',
  ffp: {
    federal: 0,
    state: 0,
    fundingCategory: null
  },
  setMatchRate: jest.fn()
};

const setup = async (props = {}) => {
  /* eslint react/prop-types: 0 */
  const Wrapper = props => {
    const formMethods = useForm();

    return <FormProvider {...formMethods}>{props.children}</FormProvider>;
  };

  render(
    <Wrapper>
      <MatchRateSelector {...defaultProps} {...props} />
    </Wrapper>
  );
  const user = userEvent.setup();
  return {
    user
  };
};

describe('the MatchRateSelector component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', async () => {
    await setup();

    expect(
      screen.getByRole('radio', {
        name: '90/10 Design, Development, and Installation (DDI)'
      })
    ).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '75/25' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '50/50' })).toBeInTheDocument();

    expect(
      screen.getAllByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).toHaveLength(0);
    expect(
      screen.getAllByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).toHaveLength(0);
  });

  it('handles selecting 90/10', async () => {
    const { user } = await setup();

    expect(
      screen.getByRole('radio', {
        name: '90/10 Design, Development, and Installation (DDI)'
      })
    ).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '75/25' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '50/50' })).not.toBeChecked();

    user.click(
      screen.getByRole('radio', {
        name: '90/10 Design, Development, and Installation (DDI)'
      })
    );
    await waitFor(() => {
      expect(
        screen.getByRole('radio', {
          name: '90/10 Design, Development, and Installation (DDI)'
        })
      ).toBeChecked();
    });
    expect(defaultProps.setMatchRate).toHaveBeenCalledWith(
      '2023',
      90,
      10,
      FUNDING_CATEGORY_TYPE.ddi
    );
  });

  it('handles selecting 75/25 DDI', async () => {
    const { user } = await setup();

    expect(
      screen.getByRole('radio', {
        name: '90/10 Design, Development, and Installation (DDI)'
      })
    ).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '75/25' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '50/50' })).not.toBeChecked();

    user.click(screen.getByRole('radio', { name: '75/25' }));
    await waitFor(() => {
      expect(screen.getByRole('radio', { name: '75/25' })).toBeChecked();
    });
    expect(defaultProps.setMatchRate).not.toHaveBeenCalled();

    expect(
      screen.getAllByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).toHaveLength(1);
    expect(
      screen.getAllByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).toHaveLength(1);

    expect(
      screen.getByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).not.toBeChecked();
    expect(
      screen.getByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).not.toBeChecked();

    user.click(
      screen.getByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    );
    await waitFor(() => {
      expect(
        screen.getByRole('radio', {
          name: 'Design, Development, and Installation (DDI)'
        })
      ).toBeChecked();
    });

    expect(defaultProps.setMatchRate).toHaveBeenCalledWith(
      '2023',
      75,
      25,
      FUNDING_CATEGORY_TYPE.ddi
    );
  });

  it('handles selecting 75/25 M&O', async () => {
    const { user } = await setup();

    expect(
      screen.getByRole('radio', {
        name: '90/10 Design, Development, and Installation (DDI)'
      })
    ).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '75/25' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '50/50' })).not.toBeChecked();

    user.click(screen.getByRole('radio', { name: '75/25' }));
    await waitFor(() => {
      expect(screen.getByRole('radio', { name: '75/25' })).toBeChecked();
    });
    expect(defaultProps.setMatchRate).not.toHaveBeenCalled();

    expect(
      screen.getAllByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).toHaveLength(1);
    expect(
      screen.getAllByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).toHaveLength(1);

    expect(
      screen.getByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).not.toBeChecked();
    expect(
      screen.getByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).not.toBeChecked();

    user.click(
      screen.getByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    );
    await waitFor(() => {
      expect(
        screen.getByRole('radio', {
          name: 'Maintenance & Operations (M&O)'
        })
      ).toBeChecked();
    });

    expect(defaultProps.setMatchRate).toHaveBeenCalledWith(
      '2023',
      75,
      25,
      FUNDING_CATEGORY_TYPE.mando
    );
  });

  it('handles selecting 50/50 DDI', async () => {
    const { user } = await setup();

    expect(
      screen.getByRole('radio', {
        name: '90/10 Design, Development, and Installation (DDI)'
      })
    ).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '75/25' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '50/50' })).not.toBeChecked();

    user.click(screen.getByRole('radio', { name: '50/50' }));
    await waitFor(() => {
      expect(screen.getByRole('radio', { name: '50/50' })).toBeChecked();
    });
    expect(defaultProps.setMatchRate).not.toHaveBeenCalled();

    expect(
      screen.getAllByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).toHaveLength(1);
    expect(
      screen.getAllByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).toHaveLength(1);

    expect(
      screen.getByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).not.toBeChecked();
    expect(
      screen.getByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).not.toBeChecked();

    user.click(
      screen.getByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    );
    await waitFor(() => {
      expect(
        screen.getByRole('radio', {
          name: 'Design, Development, and Installation (DDI)'
        })
      ).toBeChecked();
    });

    expect(defaultProps.setMatchRate).toHaveBeenCalledWith(
      '2023',
      50,
      50,
      FUNDING_CATEGORY_TYPE.ddi
    );
  });

  it('handles selecting 50/50 M&O', async () => {
    const { user } = await setup();

    expect(
      screen.getByRole('radio', {
        name: '90/10 Design, Development, and Installation (DDI)'
      })
    ).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '75/25' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '50/50' })).not.toBeChecked();

    user.click(screen.getByRole('radio', { name: '50/50' }));
    await waitFor(() => {
      expect(screen.getByRole('radio', { name: '50/50' })).toBeChecked();
    });
    expect(defaultProps.setMatchRate).not.toHaveBeenCalled();

    expect(
      screen.getAllByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).toHaveLength(1);
    expect(
      screen.getAllByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).toHaveLength(1);

    expect(
      screen.getByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).not.toBeChecked();
    expect(
      screen.getByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).not.toBeChecked();

    user.click(
      screen.getByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    );
    await waitFor(() => {
      expect(
        screen.getByRole('radio', {
          name: 'Maintenance & Operations (M&O)'
        })
      ).toBeChecked();
    });

    expect(defaultProps.setMatchRate).toHaveBeenCalledWith(
      '2023',
      50,
      50,
      FUNDING_CATEGORY_TYPE.mando
    );
  });

  it('loads existing values for 90/10 DDI', async () => {
    await setup({
      ffp: {
        federal: 90,
        state: 10,
        fundingCategory: FUNDING_CATEGORY_TYPE.ddi
      }
    });

    expect(
      screen.getByRole('radio', {
        name: '90/10 Design, Development, and Installation (DDI)'
      })
    ).toBeChecked();
    expect(screen.getByRole('radio', { name: '75/25' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '50/50' })).not.toBeChecked();

    expect(
      screen.getAllByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).toHaveLength(0);
    expect(
      screen.getAllByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).toHaveLength(0);
  });

  it('loads existing values for 75/25 DDI', async () => {
    await setup({
      ffp: {
        federal: 75,
        state: 25,
        fundingCategory: FUNDING_CATEGORY_TYPE.ddi
      }
    });

    expect(screen.getByRole('radio', { name: '75/25' })).toBeChecked();

    expect(
      screen.getByRole('radio', {
        name: '90/10 Design, Development, and Installation (DDI)'
      })
    ).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '50/50' })).not.toBeChecked();

    expect(
      screen.getAllByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).toHaveLength(1);
    expect(
      screen.getAllByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).toHaveLength(1);

    expect(
      screen.getByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).toBeChecked();
    expect(
      screen.getByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).not.toBeChecked();
  });

  it('loads existing values for 75/25 M&O', async () => {
    await setup({
      ffp: {
        federal: 75,
        state: 25,
        fundingCategory: FUNDING_CATEGORY_TYPE.mando
      }
    });

    expect(screen.getByRole('radio', { name: '75/25' })).toBeChecked();

    expect(
      screen.getByRole('radio', {
        name: '90/10 Design, Development, and Installation (DDI)'
      })
    ).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '50/50' })).not.toBeChecked();

    expect(
      screen.getAllByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).toHaveLength(1);
    expect(
      screen.getAllByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).toHaveLength(1);

    expect(
      screen.getByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).not.toBeChecked();
    expect(
      screen.getByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).toBeChecked();
  });

  it('loads existing values for 50/50 DDI', async () => {
    await setup({
      ffp: {
        federal: 50,
        state: 50,
        fundingCategory: FUNDING_CATEGORY_TYPE.ddi
      }
    });

    expect(screen.getByRole('radio', { name: '50/50' })).toBeChecked();
    expect(
      screen.getByRole('radio', {
        name: '90/10 Design, Development, and Installation (DDI)'
      })
    ).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '75/25' })).not.toBeChecked();

    expect(
      screen.getAllByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).toHaveLength(1);
    expect(
      screen.getAllByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).toHaveLength(1);

    expect(
      screen.getByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).toBeChecked();
    expect(
      screen.getByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).not.toBeChecked();
  });

  it('loads existing values for 50/50 M&O', async () => {
    await setup({
      ffp: {
        federal: 50,
        state: 50,
        fundingCategory: FUNDING_CATEGORY_TYPE.mando
      }
    });

    expect(screen.getByRole('radio', { name: '50/50' })).toBeChecked();
    expect(
      screen.getByRole('radio', {
        name: '90/10 Design, Development, and Installation (DDI)'
      })
    ).not.toBeChecked();
    expect(screen.getByRole('radio', { name: '75/25' })).not.toBeChecked();

    expect(
      screen.getAllByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).toHaveLength(1);
    expect(
      screen.getAllByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).toHaveLength(1);

    expect(
      screen.getByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).not.toBeChecked();
    expect(
      screen.getByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).toBeChecked();
  });

  it('loads existing values for 50/50 M&O and handles switching to 75/25 DDI', async () => {
    const { user } = await setup({
      ffp: {
        federal: 50,
        state: 50,
        fundingCategory: FUNDING_CATEGORY_TYPE.mando
      }
    });

    expect(screen.getByRole('radio', { name: '50/50' })).toBeChecked();
    expect(
      screen.getByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).toBeChecked();

    user.click(screen.getByRole('radio', { name: '75/25' }));
    await waitFor(() => {
      expect(screen.getByRole('radio', { name: '75/25' })).toBeChecked();
    });

    expect(
      screen.getByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).not.toBeChecked();
    expect(
      screen.getByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).not.toBeChecked();

    user.click(
      screen.getByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    );
    await waitFor(() => {
      expect(defaultProps.setMatchRate).toHaveBeenCalledWith(
        '2023',
        75,
        25,
        FUNDING_CATEGORY_TYPE.ddi
      );
    });
  });
});
