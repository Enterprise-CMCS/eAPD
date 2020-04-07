import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Button } from '@cmsgov/design-system-core';
import { jumpTo } from '../actions/app';
import { selectActivitiesSidebar } from '../reducers/activities.selectors';
import { selectActiveSection } from '../reducers/navigation';

const NextPreviousButtons = ({ activeSection, activities, jumpTo: jumpAction, ...props}) => {

  const history = useHistory();
  const { path: routePath } = useRouteMatch();

  const pageNav = (id, route) => e => {
    e.stopPropagation();
    e.preventDefault();

    jumpAction(id);
//    history.push(`${routePath}/${route}`);
    history.push(`/apd/${route}`);
    window.scrollTo(0, 0);
  };

  const anchorNav = id => () => {
    jumpAction(id);
  };

  const links = props.context.getLinks(pageNav, anchorNav, activeSection, activities);
  const [previousLink, hidePreviousLink, nextLink, hideNextLink] = props.context.getPreviousNextLinks(links, activeSection);
  const previousButtonClass = hidePreviousLink ? 'next-prev-button-left hidden-button' : 'next-prev-button-left';
  const nextButtonClass = hideNextLink ? 'next-prev-button-right hidden-button' : 'next-prev-button-right';

  return (
    <div>
      <div className={previousButtonClass}> 
        <Button onClick={previousLink.onClick}>&lt; Previous</Button>
        <div className="next-prev-section">{previousLink.label}</div>
      </div>
      <div className={nextButtonClass} next-hidden={activeSection === nextLink.id}>
        <div className="next-button">
          <Button variation="primary" onClick={nextLink.onClick}>Continue &gt;</Button>
        </div>
        <div className="next-section next-prev-section">{nextLink.label}</div>
      </div>
    </div>
  );
}

NextPreviousButtons.propTypes = {
  activities: PropTypes.array.isRequired,
  activeSection: PropTypes.string.isRequired,
  jumpTo: PropTypes.func.isRequired
  };
  
const mapStateToProps = state => ({
  activities: selectActivitiesSidebar(state),
  activeSection: selectActiveSection(state)
});

const mapDispatchToProps = {
  jumpTo
};

export default connect(mapStateToProps, mapDispatchToProps)(NextPreviousButtons);
export { NextPreviousButtons as plain, mapStateToProps, mapDispatchToProps };
