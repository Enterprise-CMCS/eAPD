import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import SaveMessage from "./SaveMessage";

describe("<SaveMessage />", () => {
  let lastSaved;
  let subject;

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

  describe("when observed saved time changes from 59.500s to 1m", () => {
    it('auto-updates', (done) => {
      lastSaved = moment().subtract(59500, "milliseconds");
      subject = shallow(
        <SaveMessage isSaving={false} lastSaved={lastSaved} />
      );
      expect(subject.text()).toMatch("Saved");

      setTimeout(() => {
        try {
          expect(subject.text()).toMatch(/\(1 minute ago\)$/);
          done();
        } catch (e) {
          done.fail(e);
        }
      }, 1000);
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

    describe("when saved 1 minute ago", () => {
      it('displays "Last saved 11:59 am (1 minute ago)"', () => {
        lastSaved = moment(jan1AtNoon).subtract(1, "minutes");
        subject = shallow(
          <SaveMessage lastSaved={lastSaved} />
        );
        expect(subject.text()).toMatch(/^Last saved/);
        expect(subject.text()).toMatch(/11:59 am/);
        expect(subject.text()).toMatch(/\(1 minute ago\)$/);
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
        expect(subject.text()).toMatch(/^Last saved/);
        expect(subject.text()).toMatch(/12:01 pm/);
        expect(subject.text()).toMatch(/\(1 day ago\)$/);
      });
    });

    describe("when saved 1 day ago", () => {
      it('displays "Last saved December 30 (1 day ago)"', () => {
        lastSaved = moment().subtract(1, "day");
        subject = shallow(
          <SaveMessage lastSaved={lastSaved} />
        );
        expect(subject.text()).toMatch(/^Last saved/);
        expect(subject.text()).toMatch(/December 31/);
        expect(subject.text()).toMatch(/\(1 day ago\)$/);
      });
    });

    describe("when saved 30 days ago", () => {
      it('displays "Last saved December 2 (1 month ago)"', () => {
        lastSaved = moment().subtract(30, "day");
        subject = shallow(
          <SaveMessage lastSaved={lastSaved} />
        );
        expect(subject.text()).toMatch(/^Last saved/);
        expect(subject.text()).toMatch(/December 2/);
        expect(subject.text()).not.toMatch(/2019/);
        expect(subject.text()).toMatch(/\(1 month ago\)$/);
      });
    });

    describe("when saved 364 days ago", () => {
      it('displays "Last saved January 2 (1 year ago)"', () => {
        lastSaved = moment().subtract(364, "day");
        subject = shallow(
          <SaveMessage lastSaved={lastSaved} />
        );
        expect(subject.text()).toMatch(/^Last saved/);
        expect(subject.text()).toMatch(/January 2/);
        expect(subject.text()).not.toMatch(/2019/);
        expect(subject.text()).toMatch(/\(1 year ago\)$/);
      });
    });

    describe("when saved 3 years ago", () => {
      it('displays "Last saved January 1, 2017 (3 years ago)"', () => {
        lastSaved = moment().subtract(3, "years");
        subject = shallow(
          <SaveMessage lastSaved={lastSaved} />
        );
        expect(subject.text()).toMatch(/^Last saved/);
        expect(subject.text()).toMatch(/January 1, 2017/);
        expect(subject.text()).toMatch(/\(3 years ago\)$/);
      });
    });
  });
});
