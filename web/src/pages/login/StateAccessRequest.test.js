import React from 'react';
import {
  render,
  fireEvent,
  axe,
  screen,
  waitFor
} from '../../shared/apd-testing-library';
import StateAccessRequest from './StateAccessRequest';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../util/api';

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });
const defaultProps = {
  errorMessage: null,
  saveAction: jest.fn(),
  fetching: false,
  secondaryButtonText: 'Back to Login',
  cancelAction: () => {}
};

// https://testing-library.com/docs/example-input-event/
const setup = (props = {}) =>
  render(<StateAccessRequest {...defaultProps} {...props} />);

describe('<StateAccessRequest />', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  // TODO: check after upgrading design system
  xit('should not fail any accessibility tests', async () => {
    fetchMock.onGet('/affiliations/me').reply(200, []);
    const { container } = setup();

    await waitFor(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('renders correct title when no existing affiliations', async () => {
    fetchMock.onGet('/affiliations/me').reply(200, []);
    setup();

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Verify Your Identity' })
      ).toBeTruthy();
    });
  });

  it('renders correct title(s) with existing affiliations', async () => {
    fetchMock.onGet('/affiliations/me').reply(200, [
      {
        stateId: 'mo',
        status: 'requested'
      }
    ]);

    setup();

    expect(
      await screen.findByRole('heading', { name: 'Manage Account' })
    ).toBeTruthy();
    expect(await screen.findByText('Existing Affiliations')).toBeTruthy();
  });

  it('renders existing affiliations', async () => {
    fetchMock.onGet('/affiliations/me').reply(200, [
      {
        stateId: 'az',
        status: 'approved'
      },
      {
        stateId: 'md',
        status: 'revoked'
      },
      {
        stateId: 'ak',
        status: 'requested'
      }
    ]);
    setup();

    expect(await screen.findByText('Active')).toBeTruthy();
    expect(await screen.findByText('Arizona')).toBeTruthy();
    expect(await screen.findByText('Revoked')).toBeTruthy();
    expect(await screen.findByText('Maryland')).toBeTruthy();
    expect(await screen.findByText('Pending')).toBeTruthy();
    expect(await screen.findByText('Alaska')).toBeTruthy();
  });

  it('renders message when no affiliations exist per status', async () => {
    fetchMock.onGet('/affiliations/me').reply(200, [
      {
        stateId: 'ar',
        status: 'requested'
      },
      {
        stateId: 'ak',
        status: 'revoked'
      }
    ]);
    setup();

    await waitFor(() => {
      expect(screen.getByText('No active affiliations')).toBeTruthy();
    });
  });

  it('renders label', async () => {
    fetchMock.onGet('/affiliations/me').reply(200, []);
    setup();

    await waitFor(() => {
      expect(
        screen.getByLabelText('Select your State Affiliation')
      ).toBeTruthy();
    });
  });

  test('Secondary button renders the right text', async () => {
    fetchMock.onGet('/affiliations/me').reply(200, []);
    setup();
    await waitFor(() => {
      expect(screen.getByText(/Back to Login/i)).toBeTruthy();
    });
  });

  test('Back to Login button renders', async () => {
    fetchMock.onGet('/affiliations/me').reply(200, []);
    setup({ secondaryButtonText: 'This is a secondary button' });
    await waitFor(() => {
      expect(screen.getByText(/This is a secondary button/i)).toBeTruthy();
    });
  });

  it('renders the input when entered', async () => {
    fetchMock.onGet('/affiliations/me').reply(200, []);
    setup();
    await screen.findByLabelText('Select your State Affiliation');
    const input = screen.getByLabelText('Select your State Affiliation');
    fireEvent.change(input, { target: { value: 'Al' } });
    expect(input.value).toBe('Al');
  });

  it('renders the selection badge when an item is picked', async () => {
    fetchMock.onGet('/affiliations/me').reply(200, []);
    setup();
    await screen.findByLabelText('Select your State Affiliation');
    const input = screen.getByLabelText('Select your State Affiliation');
    fireEvent.change(input, { target: { value: 'Alabama' } });
    fireEvent.click(screen.getByText('Alabama'));
    expect(screen.getByText('Alabama')).toBeTruthy();
  });

  it('renders the no results on an invalid entry', async () => {
    fetchMock.onGet('/affiliations/me').reply(200, []);
    setup();
    await screen.findByLabelText('Select your State Affiliation');
    const input = screen.getByLabelText('Select your State Affiliation');
    fireEvent.change(input, { target: { value: 'invalid123999' } });
    expect(screen.getByText('No results')).toBeTruthy();
  });

  it('properly removes a selection', async () => {
    fetchMock.onGet('/affiliations/me').reply(200, []);
    setup();
    await screen.findByLabelText('Select your State Affiliation');
    const input = screen.getByLabelText('Select your State Affiliation');
    fireEvent.change(input, { target: { value: 'Alabama' } });
    fireEvent.click(screen.getByText('Alabama'));
    fireEvent.click(screen.getByRole('button', { name: 'Remove Alabama' }));
    expect(screen.queryByText('Alabama')).toBeNull();
  });

  it('renders the submit button as disabled until a selection is made', async () => {
    fetchMock.onGet('/affiliations/me').reply(200, []);
    setup();
    await screen.findByLabelText('Select your State Affiliation');
    const input = screen.getByLabelText('Select your State Affiliation');
    expect(screen.getByText('Submit')).toHaveAttribute('disabled');
    fireEvent.change(input, { target: { value: 'Al' } });
    fireEvent.click(screen.getByText('Alabama'));
    expect(screen.getByText('Submit')).not.toHaveAttribute('disabled');
  });
});
