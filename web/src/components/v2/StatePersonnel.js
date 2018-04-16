import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import YearActions from './YearActions';

class StatePersonnel extends Component {
  state = { naYears: { '2018': false, '2019': false, '2020': false } };

  update = year => () => {
    this.setState(prev => ({
      naYears: {
        ...prev.naYears,
        [year]: !prev.naYears[year]
      }
    }));
  };

  render() {
    const { activity } = this.props;
    const { naYears } = this.state;

    return (
      <div>
        <div className="overflow-auto">
          <table
            className="mb2 h5 table table-condensed table-fixed"
            style={{ minWidth: 700 }}
          >
            <thead>
              <tr>
                <th className="col-1" />
                <th className="col-4" />
                <th className="col-5" />
                {activity.years.map((year, i) => (
                  <th key={year} className="col-4" colSpan="2">
                    {year} Cost{' '}
                    {i > 0 && <YearActions update={this.update(year)} />}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="col-1">#</th>
                <th className="col-4">Title</th>
                <th className="col-5">Description</th>
                {activity.years.map(year => (
                  <Fragment key={year}>
                    <th>Amount</th>
                    <th>% FTE</th>
                  </Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="mono">{i + 1}.</td>
                  <td>
                    <input type="text" className="m0 input" />
                  </td>
                  <td>
                    <textarea className="mb2 textarea" rows="3" />
                  </td>
                  {activity.years.map(year => (
                    <Fragment key={year}>
                      <td>
                        <input
                          type="text"
                          className="m0 input"
                          disabled={naYears[year]}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="m0 input"
                          disabled={naYears[year]}
                        />
                      </td>
                    </Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" className="btn btn-primary bg-black">
          Add entry
        </button>
      </div>
    );
  }
}

StatePersonnel.propTypes = {
  activity: PropTypes.object.isRequired
};

export default StatePersonnel;
