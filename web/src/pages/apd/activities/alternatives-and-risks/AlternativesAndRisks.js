import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AlternativesAndRisks = () => {
  return <div>hello</div>;
};

AlternativesAndRisks.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlternativesAndRisks);

export { AlternativesAndRisks as plain, mapStateToProps, mapDispatchToProps };
