import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import Container from './Container';
import Collapsible from './Collapsible';

class NumberRow extends Component {
  state = { detailsOpen: false };

  toggleDetails = () => {
    this.setState(prev => ({ detailsOpen: !prev.detailsOpen }));
  };

  render() {
    const { n, title } = this.props;
    const { detailsOpen } = this.state;

    return (
      <Fragment>
        <tr>
          <td>
            <button
              type="button"
              className="right btn px-tiny py0"
              onClick={this.toggleDetails}
            >
              {detailsOpen ? '-' : '+'}
            </button>
            {title}
          </td>
          {[...Array(n)].map((_, i) => (
            <td key={i} className="mono right-align">
              123
            </td>
          ))}
        </tr>
        {detailsOpen && (
          <tr className="bg-white">
            <td colSpan={n + 1}>
              <div className="p1">
                <p className="bold">
                  Details will go here! Could be words or another table:
                </p>
                <table className="table-bordered col-6">
                  <tbody>
                    <tr>
                      <td>abc</td>
                      <td>123</td>
                    </tr>
                    <tr>
                      <td>def</td>
                      <td>456</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        )}
      </Fragment>
    );
  }
}

NumberRow.propTypes = {
  n: PropTypes.number,
  title: PropTypes.string.isRequired
};

NumberRow.defaultProps = {
  n: 9
};

const Filler = () => (
  <Fragment>
    <NumberRow title="Project state staff" />
    <NumberRow title="Non-personnel" />
    <NumberRow title="Contracted resources" />
    <NumberRow title="Subtotal" />
  </Fragment>
);

const BudgetTable = () => (
  <Container>
    <Collapsible title="Budget Table" open>
      <div className="py1 overflow-auto">
        <table
          className="h6 table-fixed table-bordered table-budget"
          style={{ minWidth: 1000 }}
        >
          <thead>
            <tr>
              <th style={{ width: 200 }} />
              <th className="bg-black white center" colSpan="3">
                FFY 2018
              </th>
              <th className="bg-black white center" colSpan="3">
                FFY 2019
              </th>
              <th className="bg-black white center" colSpan="3">
                Total
              </th>
            </tr>
            <tr>
              <th />
              {[...Array(3)].map((_, i) => (
                <Fragment key={i}>
                  <th className="col-4">Total</th>
                  <th className="col-4">Federal share</th>
                  <th className="col-4">State share</th>
                </Fragment>
              ))}
            </tr>
          </thead>
          <tbody className="bg-light-blue">
            <tr>
              <td className="bold">HIT activities</td>
              {[...Array(9)].map((_, i) => <td key={i} />)}
            </tr>
            <Filler />
          </tbody>
          <tbody className="bg-light-yellow">
            <tr>
              <td className="bold">HIT activities</td>
              {[...Array(9)].map((_, i) => <td key={i} />)}
            </tr>
            <Filler />
          </tbody>
          <tbody className="bg-light-green">
            <tr>
              <td className="bold">HIE activities</td>
              {[...Array(9)].map((_, i) => <td key={i} />)}
            </tr>
            <Filler />
          </tbody>
          <tbody>
            <tr className="bold">
              <td>Project total</td>
              {[...Array(9)].map((_, i) => (
                <td key={i} className="mono right-align">
                  123
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Collapsible>
  </Container>
);

export default BudgetTable;
