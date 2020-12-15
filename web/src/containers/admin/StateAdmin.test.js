import React from 'react';
import { renderWithConnection } from 'apd-testing-library';
import StateAdmin from './StateAdmin';

let renderUtils;

const requestedAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 24,
  mobilePhone: null,
  primaryPhone: '4045555555',
  role: null,
  secondEmail: null,
  stateId: 'md',
  status: 'requested',
  userId: '00u5mfj967KsdvBBB297'
};

describe('<StateAdmin />', () => {
  beforeEach(() => {

  });

  test('header renders', () => {
    const props = {
      currentState: {
        id: "md",
        name: "Maryland"
      },
      affiliations: [requestedAffiliation],
      roleTypes: [
        {id: 50, name: "eAPD Federal Admin"}
      ]
    };
    renderUtils = renderWithConnection(<StateAdmin {...props} />);

    const { getByText } = renderUtils;
    expect(getByText('Maryland eAPD State Administrator Portal')).toBeTruthy();
  });
});
