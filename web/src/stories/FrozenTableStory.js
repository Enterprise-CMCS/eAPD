import React, { Component, Fragment } from 'react';

import RenderViewbox from './RenderViewbox';

class FrozenTableStory extends Component {

  render = () => (
    <Fragment>
      <h1> Frozen-pane scrollable table</h1>
      <h2> It renders like this (artificially constrained here to show scroll capability):</h2>
      <RenderViewbox>
        <div className="table-frozen-wrapper" style={{ width: 500 }}>
          <h3>HIT and HIE</h3>
          <div className="table-frozen-scroller">
            <table className="table-cms table-frozen-left-pane" aria-hidden="true">
              <thead>
                <tr>
                  <th className="table-frozen-null-cell">--</th>
                </tr>
                <tr>
                  <th className="table-frozen-null-cell">--</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>In-House Costs</td>
                  <td className="mono right-align nowrap table-frozen-spacer-cell"></td>
                </tr>
                <tr>
                  <td>Private Contractor Costs</td>
                  <td className="mono right-align nowrap table-frozen-spacer-cell"></td>
                </tr>
                <tr className="bold">
                  <td>Total Enhanced FFP</td>
                  <td className="mono right-align nowrap table-frozen-spacer-cell"></td>
                </tr>
              </tbody>
            </table>
            <table className="table-cms table-frozen-data">
              <thead>
                <tr>
                  <th id="quarterly-budget-summary-hitAndHie-null1"></th>
                  <th className="center" colspan="5" id="quarterly-budget-summary-hitAndHie-fy-2019">FFY 2019</th>
                  <th className="center" colspan="5" id="quarterly-budget-summary-hitAndHie-fy-2020">FFY 2020</th>
                  <th className="center" id="quarterly-budget-summary-hitAndHie-total">Total</th>
                </tr>
                <tr>
                  <th id="quarterly-budget-summary-hitAndHie-null2"></th>
                  <th className="center" id="quarterly-budget-summary-hitAndHie-fy-2019-q1">Q1</th>
                  <th className="center" id="quarterly-budget-summary-hitAndHie-fy-2019-q2">Q2</th>
                  <th className="center" id="quarterly-budget-summary-hitAndHie-fy-2019-q3">Q3</th>
                  <th className="center" id="quarterly-budget-summary-hitAndHie-fy-2019-q4">Q4</th>
                  <th className="right-align" id="quarterly-budget-summary-hitAndHie-fy-2019-subtotal">Subtotal</th>
                  <th className="center" id="quarterly-budget-summary-hitAndHie-fy-2020-q1">Q1</th>
                  <th className="center" id="quarterly-budget-summary-hitAndHie-fy-2020-q2">Q2</th>
                  <th className="center" id="quarterly-budget-summary-hitAndHie-fy-2020-q3">Q3</th>
                  <th className="center" id="quarterly-budget-summary-hitAndHie-fy-2020-q4">Q4</th>
                  <th className="right-align" id="quarterly-budget-summary-hitAndHie-fy-2020-subtotal">Subtotal</th>
                  <th className="bg-gray-light" id="quarterly-budget-summary-hitAndHie-total2"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td headers="quarterly-budget-summary-hitAndHie-null1 quarterly-budget-summary-hitAndHie-null2">In-House Costs</td>
                  <td className="mono right-align nowrap " headers="quarterly-budget-summary-hitAndHie-fy-2019 quarterly-budget-summary-hitAndHie-fy-2019-q1">--</td>
                  <td className="mono right-align nowrap " headers="quarterly-budget-summary-hitAndHie-fy-2019 quarterly-budget-summary-hitAndHie-fy-2019-q2">--</td>
                  <td className="mono right-align nowrap " headers="quarterly-budget-summary-hitAndHie-fy-2019 quarterly-budget-summary-hitAndHie-fy-2019-q3">--</td>
                  <td className="mono right-align nowrap " headers="quarterly-budget-summary-hitAndHie-fy-2019 quarterly-budget-summary-hitAndHie-fy-2019-q4">--</td>
                  <td className="bold mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-fy-2019 quarterly-budget-summary-hitAndHie-fy-2019-subtotal">--</td>
                  <td className="mono right-align nowrap " headers="quarterly-budget-summary-hitAndHie-fy-2020 quarterly-budget-summary-hitAndHie-fy-2020-q1">--</td>
                  <td className="mono right-align nowrap " headers="quarterly-budget-summary-hitAndHie-fy-2020 quarterly-budget-summary-hitAndHie-fy-2020-q2">--</td>
                  <td className="mono right-align nowrap " headers="quarterly-budget-summary-hitAndHie-fy-2020 quarterly-budget-summary-hitAndHie-fy-2020-q3">--</td>
                  <td className="mono right-align nowrap " headers="quarterly-budget-summary-hitAndHie-fy-2020 quarterly-budget-summary-hitAndHie-fy-2020-q4">--</td>
                  <td className="bold mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-fy-2020 quarterly-budget-summary-hitAndHie-fy-2020-subtotal">--</td>
                  <td className="bold mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-total2 quarterly-budget-summary-hitAndHie-total">--</td>
                </tr>
                <tr>
                  <td headers="quarterly-budget-summary-hitAndHie-null1 quarterly-budget-summary-hitAndHie-null2">Private Contractor Costs</td><td className="mono right-align nowrap " headers="quarterly-budget-summary-hitAndHie-fy-2019 quarterly-budget-summary-hitAndHie-fy-2019-q1">--</td>
                  <td className="mono right-align nowrap " headers="quarterly-budget-summary-hitAndHie-fy-2019 quarterly-budget-summary-hitAndHie-fy-2019-q2">--</td>
                  <td className="mono right-align nowrap " headers="quarterly-budget-summary-hitAndHie-fy-2019 quarterly-budget-summary-hitAndHie-fy-2019-q3">--</td>
                  <td className="mono right-align nowrap " headers="quarterly-budget-summary-hitAndHie-fy-2019 quarterly-budget-summary-hitAndHie-fy-2019-q4">--</td>
                  <td className="bold mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-fy-2019 quarterly-budget-summary-hitAndHie-fy-2019-subtotal">--</td>
                  <td className="mono right-align nowrap " headers="quarterly-budget-summary-hitAndHie-fy-2020 quarterly-budget-summary-hitAndHie-fy-2020-q1">--</td>
                  <td className="mono right-align nowrap " headers="quarterly-budget-summary-hitAndHie-fy-2020 quarterly-budget-summary-hitAndHie-fy-2020-q2">--</td>
                  <td className="mono right-align nowrap " headers="quarterly-budget-summary-hitAndHie-fy-2020 quarterly-budget-summary-hitAndHie-fy-2020-q3">--</td>
                  <td className="mono right-align nowrap " headers="quarterly-budget-summary-hitAndHie-fy-2020 quarterly-budget-summary-hitAndHie-fy-2020-q4">--</td>
                  <td className="bold mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-fy-2020 quarterly-budget-summary-hitAndHie-fy-2020-subtotal">--</td>
                  <td className="bold mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-total2 quarterly-budget-summary-hitAndHie-total">--</td>
                </tr>
                <tr className="bold"><td headers="quarterly-budget-summary-hitAndHie-null1 quarterly-budget-summary-hitAndHie-null2">Total Enhanced FFP</td>
                  <td className="mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-fy-2019 quarterly-budget-summary-hitAndHie-fy-2019-q1">--</td>
                  <td className="mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-fy-2019 quarterly-budget-summary-hitAndHie-fy-2019-q2">--</td>
                  <td className="mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-fy-2019 quarterly-budget-summary-hitAndHie-fy-2019-q3">--</td>
                  <td className="mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-fy-2019 quarterly-budget-summary-hitAndHie-fy-2019-q4">--</td>
                  <td className="bold mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-fy-2019 quarterly-budget-summary-hitAndHie-fy-2019-subtotal">--</td>
                  <td className="mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-fy-2020 quarterly-budget-summary-hitAndHie-fy-2020-q1">--</td>
                  <td className="mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-fy-2020 quarterly-budget-summary-hitAndHie-fy-2020-q2">--</td>
                  <td className="mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-fy-2020 quarterly-budget-summary-hitAndHie-fy-2020-q3">--</td>
                  <td className="mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-fy-2020 quarterly-budget-summary-hitAndHie-fy-2020-q4">--</td>
                  <td className="bold mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-fy-2020 quarterly-budget-summary-hitAndHie-fy-2020-subtotal">--</td>
                  <td className="bold mono right-align nowrap" headers="quarterly-budget-summary-hitAndHie-total2 quarterly-budget-summary-hitAndHie-total">--</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </RenderViewbox>
      <h2>The basic structure to create this is as follows:</h2>
      <pre>
        <code>
          {`<div className="table-frozen-wrapper">
            <div className="table-frozen-scroller">
              <table className="table-cms table-frozen-left-pane" aria-hidden="true">
                <thead>
                  <tr>
                    <th className="table-frozen-null-cell">--</th>
                  </tr>
                  <tr>
                    <th className="table-frozen-null-cell">--</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>In-House Costs</td>
                    <td className="mono right-align nowrap"></td>
                  </tr>
                  <tr>
                    <td>Private Contractor Costs</td>
                    <td className="mono right-align nowrap"></td>
                  </tr>
                  <tr className="bold">
                    <td>Total Enhanced FFP</td>
                    <td className="mono right-align nowrap"></td>
                  </tr>
                </tbody>
              </table>
              <table className="table-cms table-frozen-data">
                [your table header and body go here]
              </table>
            </div>
          </div>
        </code>
      </pre>
      <p>
        Essentially, this renders a table of just headers on top of the full table.  The first table is what creates the scrollable sticky pane.  In order to get the height of the columns in the header table right, we render the first column of real content, also (this is especially helpful when the table contains input elements).
      </p>
      <p>
        If you have a table with a very wordy or terse set of headers in the left pane, you can use `table-frozen-wide-header` or `table-frozen-narrow-header` on the `table-frozen-wrapper` class to change the constraints.
      </p>
      <p>
        When you have a table with inputs, you should give the inputs in the frozen pane a `name` of `fake-spacer-input` (otherwise some tests may fail).
      </p>
    </Fragment>
  )
}

export default FrozenTableStory;
