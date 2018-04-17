import PropTypes from 'prop-types';
import React from 'react';

import Icon, { faCog } from './Icons';
import Tooltip from './Tooltip';

const YearActions = ({ update }) => (
  <Tooltip
    theme="dark"
    trigger="click"
    position="top-end"
    interactive
    render={
      <div className="py1 fs-10p">
        <button
          type="button"
          className="block col-12 btn btn-primary btn-small bg-white black"
          onClick={update}
        >
          Not applicable
        </button>
      </div>
    }
  >
    <Icon icon={faCog} size="sm" />
  </Tooltip>
);

YearActions.propTypes = {
  update: PropTypes.func.isRequired
};

export default YearActions;
