import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Container from './Container';
import Collapsible from './Collapsible';

const NumberRow = ({ title, n = 9 }) => (
  <tr>
    <td>{title}</td>
    {[...Array(n)].map((_, i) => (
      <td key={i} className="mono right-align">
        123
      </td>
    ))}
  </tr>
);

NumberRow.propTypes = {
  title: PropTypes.string.isRequired,
  n: PropTypes.number.isRequired
};

const Filler = () => (
  <Fragment>
    <NumberRow title="Project state staff" />
    <NumberRow title="Non-personnel" />
    <NumberRow title="Contracted resources" />
    <NumberRow title="Subtotal" />
  </Fragment>
);

const ActivitiesPage = () => (
  <Container>
    <Collapsible title="Budget Table" open>
      <div className="py1 overflow-auto">
        <table
          className="h6 table-fixed table-bordered table-budget"
          style={{ minWidth: 1000 }}
        >
          <thead>
            <tr>
              <th
                style={{
                  width: 175
                }}
              />
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

export default ActivitiesPage;
