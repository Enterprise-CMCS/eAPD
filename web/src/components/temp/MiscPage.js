import React from 'react';

import Container from '../Container';
import ExecutiveSummaryBudget from '../../containers/ExecutiveSummaryBudget';

const MiscPage = () => (
  <Container>
    <h1 className="h2">Misc Components (for testing purposes)</h1>
    <div className="p3 bg-white overflow-auto">
      <ExecutiveSummaryBudget />

      <table className="table-cms mt4 rounded">
        <thead>
          <tr>
            <th>A</th>
            <th>B</th>
            <th>AC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>123</td>
            <td>456</td>
            <td>789</td>
          </tr>
          <tr>
            <td>123</td>
            <td>456</td>
            <td>789</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Container>
);

export default MiscPage;
