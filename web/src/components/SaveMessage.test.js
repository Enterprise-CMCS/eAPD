import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import SaveMessage from "./SaveMessage";

describe("<SaveMessage />", () => {
  let lastSaved, subject;

  describe('when saved less than 1 minute ago, it displays "Saved"', () => {
    [
      ["1 second ago", 1],
      ["2 seconds ago", 2],
      ["30 seconds ago", 30],
      ["59 seconds", 59],
    ].forEach(([testName, seconds]) => {
      test(testName, () => {
        lastSaved = moment().subtract(seconds, "seconds");
        subject = shallow(
          <SaveMessage lastSaved={lastSaved} />
        );
        expect(subject.text()).toEqual("Saved");
      });
    });
  });

  describe("given current time is January 1, 2020 12:00 pm", () => {
    let jan1AtNoon = new Date(2020, 0, 1, 12, 0);
    let mockDateNow;

    beforeEach(() => {
      mockDateNow = jest
        .spyOn(Date, "now")
        .mockReturnValue(jan1AtNoon.getTime());
    });

    afterEach(() => {
      mockDateNow.mockRestore();
    });

    describe("when saved 1 minute ago", () => {
      it('displays "Last saved 11:59 am (1 minute ago)"', () => {
        lastSaved = moment(jan1AtNoon).subtract(1, "minutes");
        subject = shallow(
          <SaveMessage lastSaved={lastSaved} />
        );
        expect(subject.text().startsWith("Last saved")).toEqual(true);
        expect(subject.text().includes("11:59 am")).toEqual(true);
        expect(subject.text().endsWith("(1 minute ago)")).toEqual(true);
      });
    });

    describe("when saved 23 hours and 59 minutes ago", () => {
      it('displays "Last saved 12:01 pm (1 day ago)"', () => {
        lastSaved = moment(jan1AtNoon)
          .subtract(23, "hours")
          .subtract(59, "minutes");
        subject = shallow(
          <SaveMessage lastSaved={lastSaved} />
        );
        expect(subject.text().startsWith("Last saved")).toEqual(true);
        expect(subject.text().includes("12:01 pm")).toEqual(true);
        expect(subject.text().endsWith("(1 day ago)")).toEqual(true);
      });
    });

    describe("when saved 24 hours ago", () => {
      it('displays "Last saved December 30 (1 day ago)"', () => {
        lastSaved = moment().subtract(1, "day");
        subject = shallow(
          <SaveMessage lastSaved={lastSaved} />
        );
        expect(subject.text().startsWith("Last saved")).toEqual(true);
        expect(subject.text().includes("December 31")).toEqual(true);
        expect(subject.text().endsWith("(1 day ago)")).toEqual(true);
      });
    });

    describe("when saved 30 days ago", () => {
      it('displays "Last saved December 30 (1 month ago)"', () => {
        lastSaved = moment().subtract(30, "day");
        subject = shallow(
          <SaveMessage lastSaved={lastSaved} />
        );
        expect(subject.text().startsWith("Last saved")).toEqual(true);
        expect(subject.text().includes("December 2")).toEqual(true);
        expect(subject.text().endsWith("(1 month ago)")).toEqual(true);
      });
    });

    describe("when saved 354 days ago", () => {
      it('displays "Last saved January 2 (1 year ago)"', () => {
        lastSaved = moment().subtract(364, "day");
        subject = shallow(
          <SaveMessage lastSaved={lastSaved} />
        );
        expect(subject.text().startsWith("Last saved")).toEqual(true);
        expect(subject.text().includes("January 2")).toEqual(true);
        expect(subject.text().includes("2019")).toEqual(false);
        expect(subject.text().endsWith("(1 year ago)")).toEqual(true);
      });
    });

    describe("when saved 3 years ago", () => {
      it('displays "Last saved January 1, 2017 (3 years ago)"', () => {
        lastSaved = moment().subtract(3, "years");
        subject = shallow(
          <SaveMessage lastSaved={lastSaved} />
        );
        expect(subject.text().startsWith("Last saved")).toEqual(true);
        expect(subject.text().includes("January 1, 2017")).toEqual(true);
        expect(subject.text().endsWith("(3 years ago)")).toEqual(true);
      });
    });
  });
});
