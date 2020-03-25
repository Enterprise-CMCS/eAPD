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
    const difference = currentMoment.diff(lastSavedMoment);
    const duration = moment.duration(difference);
    let result = "Last saved";

    if (duration.asMinutes() < 1) return "Saved";

    if (1 <= duration.asMinutes() && duration.asDays() < 1) {
      // https://momentjs.com/docs/#/displaying/format/
      result = `${result} ${lastSavedMoment.format("hh:mm a")}`;
    }
    if (1 <= duration.asDays() && duration.asYears() < 1) {
      result = `${result} ${lastSavedMoment.format("MMMM D")}`;
    }
    if (1 <= duration.asYears()) {
      result = `${result} ${lastSavedMoment.format("MMMM D, YYYY")}`;
    }
    result = `${result} (${lastSavedMoment.fromNow()})`;

    return result;
  }
}

export default SaveMessage;
