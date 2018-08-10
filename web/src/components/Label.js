import PropTypes from 'prop-types';
import React from 'react';

const Label = props => (
  <h3 className="md-col-3 lg-col-2 my-tiny pr1 h5">{props.children}</h3>
);

Label.propTypes = {
  children: PropTypes.node.isRequired
};

export default Label;
