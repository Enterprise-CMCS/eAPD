import React from 'react';
import { render, screen } from 'apd-testing-library';
import moment from 'moment';
import SaveMessage from './SaveMessage';

describe('<SaveMessage />', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('when saved less than 1 minute ago, it displays "Saved"', () => {
    [
      ['1 second ago', 1],
      ['2 seconds ago', 2],
      ['30 seconds ago', 30],
      ['59 seconds', 59]
    ].forEach(([testName, seconds]) => {
      it(testName, async () => {
        const lastSaved = moment().subtract(seconds, 'seconds');
        // https://reactjs.org/docs/test-renderer.html#testrendereract
        render(<SaveMessage lastSaved={lastSaved} />);
        // await waitFor(() =>
        screen.getByText('Saved');
        // );
        expect(screen.getByText('Saved')).toBeTruthy();
      });
    });
  });

  describe('when attempting to save with an error, show the last saved time instead of Saved"', () => {
    it('last saved', async () => {
      const date = new Date(Date.now());
      render(<SaveMessage lastSaved={date} error />);
      // await waitFor(() =>
      screen.getByText(/Last saved/i);
      // );
      expect(screen.getByText(/Last saved/i)).toBeTruthy();
    });
  });

  describe('when observed saved time changes to 1 minute ago', () => {
    const now = new Date(2020, 0, 1, 12, 0);
    const oneMinuteFromNow = new Date(2020, 0, 1, 12, 1);
    let mockDateNow;

    beforeEach(() => {
      mockDateNow = jest
        .spyOn(Date, 'now')
        .mockReturnValueOnce(now)
        .mockReturnValueOnce(now)
        .mockReturnValueOnce(now)
        .mockReturnValue(oneMinuteFromNow);
    });

    afterEach(() => {
      mockDateNow.mockRestore();
    });

    it('auto-updates from "Saved" to (1 minute ago)', async () => {
      render(<SaveMessage lastSaved={now} />);
      // await waitFor(() =>
      screen.getByText('Saved');
      // );
      expect(screen.getByText('Saved')).toBeTruthy();
      jest.advanceTimersByTime(60 * 1000);
      expect(screen.getByText(/Last saved/i)).toHaveTextContent(
        /\(1 minute ago\)$/
      );
    });
  });

  describe('given current time is January 1, 2020 12:00 pm', () => {
    const jan1AtNoon = new Date(2020, 0, 1, 12, 0);
    let mockDateNow;

    beforeEach(() => {
      mockDateNow = jest
        .spyOn(Date, 'now')
        .mockReturnValue(jan1AtNoon.getTime());
    });

    afterEach(() => {
      mockDateNow.mockRestore();
    });

    [
      [1, 'minute', 'Last saved 11:59 am (1 minute ago)'],
      [60 * 24 - 1, 'minutes', 'Last saved 12:01 pm (1 day ago)'],
      [3, 'hours', 'Last saved 9:00 am (3 hours ago)'],
      [1, 'day', 'Last saved December 31 (1 day ago)'],
      [30, 'days', 'Last saved December 2 (1 month ago)'],
      [364, 'days', 'Last saved January 2 (1 year ago)'],
      [3, 'years', 'Last saved January 1, 2017 (3 years ago)']
    ].forEach(([value, timeUnit, result]) => {
      test(`when saved ${value} ${timeUnit} ago, it displays "${result}"`, async () => {
        const lastSaved = moment().subtract(value, timeUnit);
        render(<SaveMessage lastSaved={lastSaved} />);
        // await waitFor(() =>
        screen.getByText(/Last saved/i);
        // );
        expect(screen.getByText(/Last saved/i)).toHaveTextContent(result);
      });
    });
  });
});
