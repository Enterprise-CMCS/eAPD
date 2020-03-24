import React from "react";
import moment from "moment";

// Configure moment to display '1 time-unit ago' instead of 'a time-unit ago'
// https://github.com/moment/moment/issues/3764
moment.updateLocale("en", {
  relativeTime: {
    s: "seconds",
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years",
  },
});

class SaveMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMoment: moment(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateClock(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateClock() {
    this.setState({
      currentMoment: moment(),
    });
  }

  render() {
    const { lastSaved } = this.props;
    const { currentMoment } = this.state;

    const lastSavedMoment = moment(lastSaved);
    const minutesOld = currentMoment.diff(lastSavedMoment, "minutes");
    const minutesPerDay = 60 * 24;
    const minutesPerYear = minutesPerDay * 365.25;
    let result = "Last saved";

    if (minutesOld < 1) return "Saved";
    if (1 <= minutesOld && minutesOld < minutesPerDay) {
      // https://momentjs.com/docs/#/displaying/format/
      result = `${result} ${lastSavedMoment.format("hh:mm a")}`;
    }
    if (minutesPerDay <= minutesOld && minutesOld < minutesPerYear) {
      result = `${result} ${lastSavedMoment.format("MMMM D")}`;
    }
    if (minutesPerYear <= minutesOld) {
      result = `${result} ${lastSavedMoment.format("MMMM D, YYYY")}`;
    }
    result = `${result} (${lastSavedMoment.fromNow()})`;
    return result;
  }
}

export default SaveMessage;
