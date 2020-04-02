import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Button } from '@cmsgov/design-system-core';
import { LinksContextConsumer } from '../contexts/LinksContextProvider';
import { jumpTo } from '../actions/app';
import { selectActivitiesSidebar } from '../reducers/activities.selectors';
import { selectActiveSection } from '../reducers/navigation';

const SecondaryNav = ({ activeSection, activities, jumpTo: jumpAction }) => {

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

  const NextPreviousButtons = (props) => {
    const links = props.context.getLinks(pageNav, anchorNav, activeSection, activities);
    const previousLink = props.context.getPreviousLink(links, activeSection);
    const nextLink = props.context.getNextLink(links, activeSection);

    return (
      <div>
        <div className="next-prev-button-left"> 
          <Button onClick={previousLink.onClick}>&lt; Previous</Button>
          <div className="next-prev-section">{previousLink.label}</div>
        </div>
        <div className="next-prev-button-right">
          <div className="next-button">
            <Button variation="primary" onClick={nextLink.onClick}>Continue &gt;</Button>
          </div>
          <div className="next-section next-prev-section">{nextLink.label}</div>
        </div>
      </div>
    );
  }

  return (
    <LinksContextConsumer>
      {context => (
        <div className="next-prev-buttons">
          <NextPreviousButtons context={context} />
        </div>
      )}
    </LinksContextConsumer>
    );
  };

  SecondaryNav.propTypes = {
    activities: PropTypes.array,
    activeSection: PropTypes.string,
    jumpTo: PropTypes.func
    };

  SecondaryNav.defaultProps = {
    activities: [],
    activeSection: 'apd-state-profile',
    jumpTo: function() { return undefined; }
  };
    
  const mapStateToProps = state => ({
    activities: selectActivitiesSidebar(state),
    activeSection: selectActiveSection(state)
  });

  const mapDispatchToProps = {
    jumpTo
  };

  export default connect(mapStateToProps, mapDispatchToProps)(SecondaryNav);
