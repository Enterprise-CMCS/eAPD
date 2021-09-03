import { Button } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const Card = ({
  width,
  title,
  body,
  buttonTitle,
  buttonOnClick  
}) => {
  return (
    <Fragment>
      <div className="eapd-card ds-u-border--1 ds-u-padding--2" style={{width: `${width}rem`}}>
        <div className="card-body">
          <h5 className="ds-h5 card-title ds-u-margin-top--0">{title}</h5>
          <p className="card-text">{body}</p>
          <div className="ds-u-display--flex ds-u-justify-content--end ds-u-padding-top--3 ds-u-padding-bottom--1">
          {buttonTitle && (
            <Button variation="primary" onClick={buttonOnClick}>{buttonTitle}</Button>            
          )}
          </div>
        </div>
      </div>
    </Fragment>
  )
};

Card.propTypes = {
  width: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string,
  buttonOnClick: PropTypes.func
};

Card.defaultProps = { 
  buttonTitle: '',
  buttonOnClick: null
};

export default Card;