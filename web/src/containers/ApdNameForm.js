import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';

import { setApdName } from '../actions/editApd';

const ApdNameForm = ({
  setName
}) => {
  const changeName = useCallback(({ target: { value } }) => {
    setName(value);
  })

  return (
    <Fragment>
      <TextField
        autoFocus
        label="APD name"
        name="apd-name"
        value={string}
        onChange={changeName}
      />
    </Fragment>
  )
};

ApdNameForm.PropTypes = {
  setName: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setName: setApdName
};

export default connect(null, mapDispatchToProps)(ApdNameForm);

export { ApdNameForm as plain, mapDispatchToProps };
