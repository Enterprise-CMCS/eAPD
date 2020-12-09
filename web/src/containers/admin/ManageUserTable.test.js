import React from 'react';
import { renderWithConnection, fireEvent } from 'apd-testing-library';
import ManageUserTable from './ManageUserTable';

let props;
let renderUtils;

describe('<ManageUserTable />', () => {
  beforeEach(() => {
    props = {
      tab: 'active',
      affiliations: [
        {
          displayName: "Liz Lemon",
          email: "jenn.downs@a1msolutions.com",
          id: 24,
          mobilePhone: null,
          primaryPhone: "4045555555",
          role: null,
          secondEmail: null,
          stateId: "md",
          status: "requested",
          userId: "00u5mfj967KsdvIDZ297"
        }
      ],
      isFetching: false,
      actions: ""
    };
    renderUtils = renderWithConnection(<ManageUserTable {...props} />);
  });

  test('table title Name renders', () => {
    const { getByText } = renderUtils;
    expect(getByText(/Name/)).toBeTruthy();
  });

});
