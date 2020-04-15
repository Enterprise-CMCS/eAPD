import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@cmsgov/design-system-core';
import { jumpTo } from '../actions/app';
import { selectActivitiesSidebar } from '../reducers/activities.selectors';
import { selectActiveSection } from '../reducers/navigation';

const NextPreviousButtons = ({
  activeSection,
  activities,
  jumpTo: jumpAction,
  context
}) => {
  const { getLinks, getPreviousNextLinks } = context;
  const history = useHistory();

  const pageNav = (id, route) => e => {
    e.stopPropagation();
    e.preventDefault();

    jumpAction(id);
    history.push(`/apd/${route}`);
    window.scrollTo(0, 0);
  };

  const anchorNav = id => () => {
    jumpAction(id);
  };

  const links = getLinks(pageNav, anchorNav, activeSection, activities);
  const {
    previousLink,
    hidePreviousLink,
    nextLink,
    hideNextLink
  } = getPreviousNextLinks(links, activeSection);

  return (
    <div>
      <div
        className={
          hidePreviousLink
            ? 'next-prev-button-left hidden-button'
            : 'next-prev-button-left'
        }
      >
        <Button onClick={previousLink.onClick}>&lt; Previous</Button>
        <div className="next-prev-section">{previousLink.label}</div>
      </div>
      <div
        className={
          hideNextLink
            ? 'next-prev-button-right hidden-button'
            : 'next-prev-button-right'
        }
      >
        <div className="next-button">
          <Button variation="primary" onClick={nextLink.onClick}>
            Continue &gt;
          </Button>
        </div>
        <div className="next-section next-prev-section">{nextLink.label}</div>
      </div>
    </div>
  );
};

NextPreviousButtons.propTypes = {
  activities: PropTypes.array.isRequired,
  activeSection: PropTypes.string.isRequired,
  jumpTo: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  activities: selectActivitiesSidebar(state),
  activeSection: selectActiveSection(state)
});

const mapDispatchToProps = {
  jumpTo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NextPreviousButtons);
export { NextPreviousButtons as plain, mapStateToProps, mapDispatchToProps };
