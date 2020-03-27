import React from "react";
import { act } from 'react-dom/test-utils';
import { mount, shallow } from "enzyme";
import moment from "moment";
import SaveMessage from "./SaveMessage";

describe("<SaveMessage />", () => {
  describe('when saved less than 1 minute ago, it displays "Saved"', () => {
    [
      ["1 second ago", 1],
      ["2 seconds ago", 2],
      ["30 seconds ago", 30],
      ["59 seconds", 59],
    ].forEach(([testName, seconds]) => {
      test(testName, () => {
        const lastSaved = moment().subtract(seconds, "seconds");
        const subject = shallow(
          <SaveMessage lastSaved={lastSaved} />
        );
        expect(subject.text()).toEqual("Saved");
      });
    });
  });

  xdescribe("when observed saved time changes to 1 minute ago", () => {
    // const now = new Date(2020, 0, 1, 12, 0);
    // const oneMinuteFromNow = new Date(2020, 0, 1, 12, 1);
    // let mockDateNow;

    beforeEach(() => {
      jest.useFakeTimers();
      // mockDateNow = jest
      //   .spyOn(Date, "now")
      //   .mockReturnValueOnce(now)
      //   .mockReturnValueOnce(now)
      //   .mockReturnValue(oneMinuteFromNow);
    });

    afterEach(() => {
      // mockDateNow.mockRestore();
      jest.clearAllTimers();
    });

    it('auto-updates from "Saved" to (1 minute ago)', () => {
      const subject = shallow(
        <SaveMessage lastSaved={moment()} />
      );
      expect(subject.text()).toMatch("Saved");
      jest.advanceTimersByTime(65*1000);
      // subject.setProps();
      act(() => {subject.setProps()});
      expect(subject.text()).toMatch(/\(1 minute ago\)$/);
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
        const subject = shallow(
          <SaveMessage lastSaved={lastSaved} />
        );
        expect(subject.text()).toEqual(result);
      });
    });
  });
});
