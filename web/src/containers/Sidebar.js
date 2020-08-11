import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';

import stickybits from 'stickybits';
import { VerticalNav } from '@cmsgov/design-system';

import { jumpTo } from '../actions/app';
import { selectActivitiesSidebar } from '../reducers/activities.selectors';
import { selectActiveSection } from '../reducers/navigation';
import { LinksContextConsumer } from '../contexts/LinksContextProvider';

const Sidebar = ({ activeSection, activities, jumpTo: jumpAction, place }) => {
  useEffect(() => {
    stickybits('.site-sidebar', { stickyBitStickyOffset: 60 });
  }, []);

  const history = useHistory();
  const { path: routePath } = useRouteMatch();

  const pageNav = (id, route) => e => {
    e.stopPropagation();
    e.preventDefault();

    jumpAction(id);
    history.push(`${routePath}/${route}`);
    window.scrollTo(0, 0);
  };

  const anchorNav = id => () => {
    jumpAction(id);
  };

  const hasImage = [].indexOf(place.id) < 0;
  const imgExt = ['png', 'svg'][
    ['as', 'gu', 'mp', 'vi'].indexOf(place.id) < 0 ? 1 : 0
  ];

  return (
    <LinksContextConsumer>
      {context => (
        <aside className="site-sidebar">
        <div className="ds-u-display--flex ds-u-align-items--center ds-u-border-bottom--1 ds-u-padding-y--2 ds-u-margin-bottom--4">
          {hasImage && (
            <img
              src={`/static/img/states/${place.id}.${imgExt}`}
              alt={place.name}
              className="ds-u-margin-right--2"
              width="40"
              height="40"
            />
          )}
          <h1>{place.name}</h1>
        </div>
        <VerticalNav
          selectedId={activeSection || 'apd-state-profile-overview'}
          items={context.getLinks(pageNav, anchorNav, activeSection, activities)}
        />
      </aside>
      )}
    </LinksContextConsumer>
  );
};

Sidebar.propTypes = {
  activities: PropTypes.array.isRequired,
  activeSection: PropTypes.string.isRequired,
  jumpTo: PropTypes.func.isRequired,
  place: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  activities: selectActivitiesSidebar(state),
  activeSection: selectActiveSection(state)
});

const mapDispatchToProps = {
  jumpTo
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export { Sidebar as plain, mapStateToProps, mapDispatchToProps };
