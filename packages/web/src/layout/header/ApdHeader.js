import PropTypes from 'prop-types';
import { Button, FormLabel } from '@cmsgov/design-system';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  getAPDCreation,
  getAPDName,
  getAPDYearRange
} from '../../reducers/apd';
import { setApdName } from '../../actions/editApd';

import Icon, { faEdit } from '../../components/Icons';

const ApdHeader = ({ apdCreated, apdName, setName, year }) => {
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    const inputEl = document.getElementById('apd-title-input');

    if (isEditing === true) {
      inputEl.focus();
    }
  }, [isEditing]);

  const onBlur = e => {
    const apdNameInput = e.target.value;

    if (apdNameInput.trim() === '') {
      setName('Untitled APD');
    } else {
      setName(apdNameInput);
    }

    setEditing(false);
  };

  const onKeyPress = event => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.target.blur();
    }
  };

  return (
    <div>
      <div id="apd-title-container" className="flex-align-row">
        <div id="editable-label">
          {isEditing ? (
            <input
              id="apd-title-input"
              className="ds-h1 apd--title"
              type="text"
              value={apdName}
              onChange={value => setName(value.target.value)}
              onBlur={onBlur}
            />
          ) : (
            <div>
              <FormLabel className="ds-u-visibility--screen-reader">
                Edit APD Name
              </FormLabel>
              <div
                id="apd-title-input"
                className="ds-h1 apd--title"
                onClick={() => setEditing(true)}
                onKeyPress={onKeyPress}
                role="button"
                tabIndex="0"
              >
                {apdName}
              </div>
            </div>
          )}
        </div>
        <Button
          id="title-edit-link"
          className="ds-c-button ds-c-button--transparent"
          onClick={() => {
            setEditing(true);
            const e = document.getElementById('apd-title-input');
            e.click();
          }}
        >
          <Icon icon={faEdit} style={{ width: '14px' }} /> Edit
        </Button>
      </div>
      <div id="apd-header-info">
        <h1 className="ds-h5 ds-u-margin-top--1">HITECH IAPD | FFY {year}</h1>

        <span className="ds-h6 ds-u-display--block ds-u-margin-top--1 ds-u-margin-bottom--3">
          <strong>Created:</strong> {apdCreated}
        </span>
      </div>
    </div>
  );
};

ApdHeader.propTypes = {
  apdCreated: PropTypes.string.isRequired,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ApdHeader);

export { ApdHeader as plain, mapStateToProps };
