import React from 'react';
import { renderWithConnection, within } from 'apd-testing-library';
import Activities from './ActivitiesDashboardReadOnly';
import apd, { activities } from '../../../../fixtures/mo-hitech-apd';
import budget from '../../../../fixtures/mo-hitech-budget';

let props;
let renderUtils;
describe('viewOnly <Activities />', () => {
  beforeEach(() => {
    props = {
      activities
    };
    renderUtils = renderWithConnection(<Activities {...props} />, {
      initialState: {
        apd,
        budget,
        user: { data: { state: { name: 'Maryland' } } }
      }
    });
  });

  test('should show the activity list', () => {
    const { getByText } = renderUtils;
    const listHeader = getByText(/^Activities$/i);
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
    const { container } = renderUtils;

    expect(container.querySelector('#activity0-ffy2020')).toBeTruthy();
    const { getByText: getByTextFrom2020 } = within(
      container.querySelector('#activity0-ffy2020')
    );
    expect(getByTextFrom2020('James Holden (APD Key Personnel)')).toBeTruthy();

    expect(container.querySelector('#activity0-ffy2021')).toBeTruthy();
    const { getByText: getByTextFrom2021 } = within(
      container.querySelector('#activity0-ffy2021')
    );
    expect(getByTextFrom2021('James Holden (APD Key Personnel)')).toBeTruthy();
  });

  test('should show the correct values for Activity 2', () => {
    const { container } = renderUtils;

    expect(container.querySelector('#activity1-ffy2020')).toBeTruthy();
    const { getByText: getByTextFrom2020 } = within(
      container.querySelector('#activity1-ffy2020')
    );
    expect(getByTextFrom2020('Project Assistant')).toBeTruthy();

    expect(container.querySelector('#activity1-ffy2021')).toBeTruthy();
    const { getByText: getByTextFrom2021 } = within(
      container.querySelector('#activity1-ffy2021')
    );
    expect(getByTextFrom2021('Project Assistant')).toBeTruthy();
  });

  test('should show the correct values for Activity 3', () => {
    const { container } = renderUtils;

    expect(container.querySelector('#activity2-ffy2020')).toBeTruthy();
    const { getByText: getByTextFrom2020 } = within(
      container.querySelector('#activity2-ffy2020')
    );
    expect(
      getByTextFrom2020(
        'Services Integration Architect/ Programmer (Analyst Programmer V)'
      )
    ).toBeTruthy();

    expect(container.querySelector('#activity2-ffy2021')).toBeTruthy();
    const { getByText: getByTextFrom2021 } = within(
      container.querySelector('#activity2-ffy2021')
    );
    expect(
      getByTextFrom2021(
        'Services Integration Architect/ Programmer (Analyst Programmer V)'
      )
    ).toBeTruthy();
  });

  test('should show the correct values for Activity 4', () => {
    const { container } = renderUtils;

    expect(container.querySelector('#activity3-ffy2020')).toBeTruthy();
    const { getByText: getByTextFrom2020 } = within(
      container.querySelector('#activity3-ffy2020')
    );
    expect(getByTextFrom2020('Blue Button Builder Inc.')).toBeTruthy();

    expect(container.querySelector('#activity3-ffy2021')).toBeTruthy();
    const { getByText: getByTextFrom2021 } = within(
      container.querySelector('#activity3-ffy2021')
    );
    expect(getByTextFrom2021('Blue Button Builder Inc.')).toBeTruthy();
  });

  test('should show the correct values for Activity 5', () => {
    const { container } = renderUtils;

    expect(container.querySelector('#activity4-ffy2020')).toBeTruthy();
    const { getByText: getByTextFrom2020 } = within(
      container.querySelector('#activity4-ffy2020')
    );
    expect(getByTextFrom2020('Gateway Vendor Inc.')).toBeTruthy();

    expect(container.querySelector('#activity4-ffy2021')).toBeTruthy();
    const { getByText: getByTextFrom2021 } = within(
      container.querySelector('#activity4-ffy2021')
    );
    expect(getByTextFrom2021('Gateway Vendor Inc.')).toBeTruthy();
  });

  test('should show the correct values for Activity 6', () => {
    const { container } = renderUtils;

    expect(container.querySelector('#activity5-ffy2020')).toBeTruthy();
    const { getByText: getByTextFrom2020 } = within(
      container.querySelector('#activity5-ffy2020')
    );
    expect(getByTextFrom2020('State MITA Person')).toBeTruthy();

    expect(container.querySelector('#activity5-ffy2021')).toBeTruthy();
    const { getByText: getByTextFrom2021 } = within(
      container.querySelector('#activity5-ffy2021')
    );
    expect(getByTextFrom2021('State MITA Person')).toBeTruthy();
  });
});
