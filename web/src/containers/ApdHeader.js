import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import EditableLabel from 'react-inline-editing';

import { getAPDCreation, getAPDName, getAPDYearRange } from '../reducers/apd';
import { setApdName } from '../actions/editApd';

const ApdHeader = ({ apdName, setName, year }) => {
  return (
    <div>
      <EditableLabel
        text={apdName}
        value={apdName}
        labelClassName='ds-h1 apd--title'
        inputClassName='ds-h1 apd--title'
        inputWidth='250px'
        inputHeight='46px'
        onFocusOut={text => setName(text)}
      />
      <h1 className="ds-h4">
        HITECH IAPD | FFY {year}
      </h1>
    </div>
  );
};

ApdHeader.propTypes = {
  apdName: PropTypes.string,
  setName: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired
};

ApdHeader.defaultProps = { apdName: '' };

const mapStateToProps = state => ({
  apdCreated: getAPDCreation(state),
  apdName: getAPDName(state),
  year: getAPDYearRange(state)
});

const mapDispatchToProps = {
  setName: setApdName
}

export default connect(mapStateToProps, mapDispatchToProps)(ApdHeader);

export { ApdHeader as plain, mapStateToProps };
