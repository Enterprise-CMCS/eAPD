import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import stickybits from 'stickybits';
import Nav from './Nav';

const Sidebar = ({ place }) => {
  useEffect(() => {
    stickybits('.site-sidebar', { stickyBitStickyOffset: 60 });
  }, []);

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
      <Nav />
    </aside>
  );
};

Sidebar.propTypes = {
  place: PropTypes.object.isRequired
};

export default Sidebar;
