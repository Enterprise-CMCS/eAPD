import PropTypes from 'prop-types';
import React from 'react';

const MiniHeader = ({ content, handleDelete, number, title, toggleForm }) => (
  <div className="mb1 h5 flex justify-between">
    <button
      type="button"
      onClick={toggleForm}
      className="btn btn-no-focus p1 col-12 left-align bg-blue-light rounded-left"
    >
      <div className="flex items-center justify-between">
        <div className="col-4 truncate">
          {number}. <strong>{title}</strong>
        </div>
        {content}
      </div>
    </button>
    <button
      type="button"
      onClick={handleDelete}
      className="btn btn-no-focus p1 bg-blue-light rounded-right"
    >
      ✗
    </button>
  </div>
);
MiniHeader.propTypes = {
  content: PropTypes.node.isRequired,
  handleDelete: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  toggleForm: PropTypes.func.isRequired
};

export default MiniHeader;
