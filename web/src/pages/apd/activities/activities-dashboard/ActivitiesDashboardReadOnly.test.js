import React from 'react';
import { renderWithConnection, within, screen } from 'apd-testing-library';
import Activities from './ActivitiesDashboardReadOnly';
import apd, { activities } from '../../../../fixtures/mo-hitech-apd';
import budget from '../../../../fixtures/mo-hitech-budget.json';

const defaultProps = {
  activities
};

const setup = (props = {}) =>
  renderWithConnection(<Activities {...defaultProps} {...props} />, {
    initialState: {
      apd,
      budget,
      user: { data: { state: { name: 'Maryland' } } }
    }
  });

describe('viewOnly <Activities />', () => {
  test('should show the activity list', () => {
    setup();
    const listHeader = screen.getByText(/^Activities$/i);
    // eslint-disable-next-line testing-library/no-node-access
    const { getByText: getByTextWithin } = within(listHeader.nextSibling);

    activities.forEach((activity, index) => {
      expect(
        getByTextWithin(
          `${index + 1}. ${activity.name || 'Untitled'} | ${
            activity.fundingSource
          }`
        )
      ).toBeTruthy();
    });
  });

  test('should show the correct values for Activity 1', () => {
    const { container } = setup();

    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect(container.querySelector('#activity0-ffy2020')).toBeTruthy();
    const { getByText: getByTextFrom2020 } = within(
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      container.querySelector('#activity0-ffy2020')
    );
    expect(getByTextFrom2020('James Holden (APD Key Personnel)')).toBeTruthy();

    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect(container.querySelector('#activity0-ffy2021')).toBeTruthy();
    const { getByText: getByTextFrom2021 } = within(
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      container.querySelector('#activity0-ffy2021')
    );
    expect(getByTextFrom2021('James Holden (APD Key Personnel)')).toBeTruthy();
  });

  test('should show the correct values for Activity 2', () => {
    const { container } = setup();

    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect(container.querySelector('#activity1-ffy2020')).toBeTruthy();
    const { getByText: getByTextFrom2020 } = within(
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      container.querySelector('#activity1-ffy2020')
    );
    expect(getByTextFrom2020('Project Assistant')).toBeTruthy();

    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect(container.querySelector('#activity1-ffy2021')).toBeTruthy();
    const { getByText: getByTextFrom2021 } = within(
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      container.querySelector('#activity1-ffy2021')
    );
    expect(getByTextFrom2021('Project Assistant')).toBeTruthy();
  });

  test('should show the correct values for Activity 3', () => {
    const { container } = setup();

    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect(container.querySelector('#activity2-ffy2020')).toBeTruthy();
    const { getByText: getByTextFrom2020 } = within(
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      container.querySelector('#activity2-ffy2020')
    );
    expect(
      getByTextFrom2020(
        'Services Integration Architect/ Programmer (Analyst Programmer V)'
      )
    ).toBeTruthy();

    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect(container.querySelector('#activity2-ffy2021')).toBeTruthy();
    const { getByText: getByTextFrom2021 } = within(
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      container.querySelector('#activity2-ffy2021')
    );
    expect(
      getByTextFrom2021(
        'Services Integration Architect/ Programmer (Analyst Programmer V)'
      )
    ).toBeTruthy();
  });

  test('should show the correct values for Activity 4', () => {
    const { container } = setup();

    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect(container.querySelector('#activity3-ffy2020')).toBeTruthy();
    const { getByText: getByTextFrom2020 } = within(
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      container.querySelector('#activity3-ffy2020')
    );
    expect(getByTextFrom2020('Blue Button Builder Inc.')).toBeTruthy();

    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect(container.querySelector('#activity3-ffy2021')).toBeTruthy();
    const { getByText: getByTextFrom2021 } = within(
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      container.querySelector('#activity3-ffy2021')
    );
    expect(getByTextFrom2021('Blue Button Builder Inc.')).toBeTruthy();
  });

  test('should show the correct values for Activity 5', () => {
    const { container } = setup();

    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect(container.querySelector('#activity4-ffy2020')).toBeTruthy();
    const { getByText: getByTextFrom2020 } = within(
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      container.querySelector('#activity4-ffy2020')
    );
    expect(getByTextFrom2020('Gateway Vendor Inc.')).toBeTruthy();

    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect(container.querySelector('#activity4-ffy2021')).toBeTruthy();
    const { getByText: getByTextFrom2021 } = within(
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      container.querySelector('#activity4-ffy2021')
    );
    expect(getByTextFrom2021('Gateway Vendor Inc.')).toBeTruthy();
  });

  test('should show the correct values for Activity 6', () => {
    const { container } = setup();

    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect(container.querySelector('#activity5-ffy2020')).toBeTruthy();
    const { getByText: getByTextFrom2020 } = within(
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      container.querySelector('#activity5-ffy2020')
    );
    expect(getByTextFrom2020('State MITA Person')).toBeTruthy();

    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect(container.querySelector('#activity5-ffy2021')).toBeTruthy();
    const { getByText: getByTextFrom2021 } = within(
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      container.querySelector('#activity5-ffy2021')
    );
    expect(getByTextFrom2021('State MITA Person')).toBeTruthy();
  });
});
