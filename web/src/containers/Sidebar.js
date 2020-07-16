import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  useRouteMatch,
  useHistory,
} from 'react-router-dom';

import stickybits from 'stickybits';
import VerticalNav from '@cmsgov/design-system-core/dist/components/VerticalNav/VerticalNav';
import Link from '../components/Link'

import { jumpTo } from '../actions/app';
import { selectActivitiesSidebar } from '../reducers/activities.selectors';
import { selectActiveSection } from '../reducers/navigation';

import { buildLinks } from '../links'

const scrollToPageSection = ({ hash }) => {
    window.scrollTo(0, 0)
    if (!hash) return
    const id = hash.replace('#', '')
    const element = document.getElementById(id)
    if (!element) return
    const elementPosition = element.getBoundingClientRect().top
    const headerOffset = document.getElementsByTagName('header')[0].offsetHeight
    window.scrollTo({ top: elementPosition - headerOffset })
}

const Sidebar = ({ activeSection, activities, place }) => {
  const history = useHistory();

  useEffect(() => {
    stickybits('.site-sidebar', { stickyBitStickyOffset: 60 });
  }, []);

  useEffect(() => scrollToPageSection(history.location), [history.location])

  const hasImage = [].indexOf(place.id) < 0;
  const imgExt = ['png', 'svg'][
    ['as', 'gu', 'mp', 'vi'].indexOf(place.id) < 0 ? 1 : 0
  ];

  return (
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
        component={Link}
        selectedId={activeSection}
        items={buildLinks(activities)}
      />
    </aside>
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
