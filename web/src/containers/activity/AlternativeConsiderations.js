import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { Subsection } from '../../components/Section';

const AlternativeConsiderations = ({activityIndex}) => {
  return (
    <Subsection
      resource="activities.alternatives"
      id={`activity-outcomes-${activityIndex}`}
    >
      <hr className="subsection-rule" />
    <h1>blah</h1>
    </Subsection>
  );
};

AlternativeConsiderations.propTypes = {
  activityIndex: PropTypes.number.isRequired,
};

const mapStateToProps = (state, { activityIndex }) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(AlternativeConsiderations);

export { AlternativeConsiderations as plain, mapStateToProps, mapDispatchToProps };
