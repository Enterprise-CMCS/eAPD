import React from "react";
import { create, act } from "react-test-renderer";
import moment from "moment";
import SaveMessage from "./SaveMessage";

describe("<SaveMessage />", () => {
  let subject;

  describe('when saved less than 1 minute ago, it displays "Saved"', () => {
    [
      ["1 second ago", 1],
      ["2 seconds ago", 2],
      ["30 seconds ago", 30],
      ["59 seconds", 59],
    ].forEach(([testName, seconds]) => {
      test(testName, () => {
        const lastSaved = moment().subtract(seconds, "seconds");
        // https://reactjs.org/docs/test-renderer.html#testrendereract
        act(() => {
          subject = create(<SaveMessage lastSaved={lastSaved} />);
        })
        expect(subject.toJSON()).toEqual("Saved");
      });
    });
  });

  describe("when observed saved time changes to 1 minute ago", () => {
    const now = new Date(2020, 0, 1, 12, 0);
    const oneMinuteFromNow = new Date(2020, 0, 1, 12, 1);
    let mockDateNow;

    beforeEach(() => {
      jest.useFakeTimers();
      mockDateNow = jest
        .spyOn(Date, "now")
        .mockReturnValueOnce(now)
        .mockReturnValueOnce(now)
        .mockReturnValueOnce(now)
        .mockReturnValue(oneMinuteFromNow);
    });

    afterEach(() => {
      mockDateNow.mockRestore();
      jest.clearAllTimers();
    });

    it('auto-updates from "Saved" to (1 minute ago)', () => {
      act(() => {
        subject = create(<SaveMessage lastSaved={now} />);
      })
      expect(subject.toJSON()).toMatch("Saved");
      act(() => jest.advanceTimersByTime(60 * 1000));
      expect(subject.toJSON()).toMatch(/\(1 minute ago\)$/);
    });
  });

  describe("given current time is January 1, 2020 12:00 pm", () => {
    const jan1AtNoon = new Date(2020, 0, 1, 12, 0);
    let mockDateNow;

    beforeEach(() => {
      mockDateNow = jest
        .spyOn(Date, "now")
        .mockReturnValue(jan1AtNoon.getTime());
    });

    afterEach(() => {
      mockDateNow.mockRestore();
    });

    [
      [1, "minute", "Last saved 11:59 am (1 minute ago)"],
      [60 * 24 - 1, "minutes", "Last saved 12:01 pm (1 day ago)"],
      [3, "hours", "Last saved 9:00 am (3 hours ago)"],
      [1, "day", "Last saved December 31 (1 day ago)"],
      [30, "days", "Last saved December 2 (1 month ago)"],
      [364, "days", "Last saved January 2 (1 year ago)"],
      [3, "years", "Last saved January 1, 2017 (3 years ago)"],
    ].forEach(([value, timeUnit, result]) => {
      test(`when saved ${value} ${timeUnit} ago, it displays "${result}"`, () => {
        const lastSaved = moment().subtract(value, timeUnit);
        act(() => {
          subject = create(<SaveMessage lastSaved={lastSaved} />);
        })
        expect(subject.toJSON()).toEqual(result);
      });
    });
  });
});
