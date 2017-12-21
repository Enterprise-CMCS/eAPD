import PropTypes from 'prop-types';
import React from 'react';
import { Measure, Subhead } from 'rebass';

import Alert from '../styles/Alert';

const Hello = props => (
  <div>
    <h1>Hello {props.name}!</h1>
    <Alert kind="error">
      <Subhead>Hey-oh!</Subhead>
      <Measure>This is a fake alert :)</Measure>
    </Alert>
  </div>
);

Hello.propTypes = {
  name: PropTypes.string
};

Hello.defaultProps = {
  name: 'Friend'
};

export default Hello;
