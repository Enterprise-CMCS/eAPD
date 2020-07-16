import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@cmsgov/design-system-core';
import { selectActivitiesSidebar } from '../reducers/activities.selectors';
import Link from './Link'
import { buildLinks } from '../links'

const flattenLinks = (obj) => {
  const array = Array.isArray(obj) ? obj : [obj];
  return array.reduce((acc, value) => {
    acc.push(value);
    if (value.items) {
      acc = acc.concat(flattenLinks(value.items));
      delete value.items;
    }
    return acc;
  }, []);
}

const NextPreviousButtons = ({ activities }) => {
  const history = useHistory();
  const { pathname, hash } = history.location
  let links = buildLinks(activities)
  links = flattenLinks(links);
  links = links.filter(link => !!link.url)
  const pathWithFragment = [pathname, hash].join('')
  const currentIndex = links.findIndex(link => link.url === pathWithFragment)

  const previousLink = currentIndex - 1 >= 0 ? links[currentIndex - 1] : null
  const nextLink = currentIndex + 1 < links.length ? links[currentIndex + 1] : null

  console.log(previousLink)
  console.log(nextLink)

  const previousLinkComponent = !previousLink ? null : (
    <div className='next-prev-button-left'>
      <Button href={previousLink.url} component={Link}>&lt; Previous</Button>
      <div className="next-prev-section">{previousLink.label}</div>
    </div>
  )

  const nextLinkComponent = !nextLink ? null : (
    <div className='next-prev-button-right'>
      <Button variation="primary" href={nextLink.url} component={Link}>Continue &gt;</Button>
      <div className="next-section next-prev-section">{nextLink.label}</div>
    </div>
  )

  return (
    <>
      {previousLinkComponent}
      {nextLinkComponent}
    </>
  );
};

NextPreviousButtons.propTypes = {
  activities: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  activities: selectActivitiesSidebar(state)
});

export default connect(mapStateToProps)(NextPreviousButtons);

export { NextPreviousButtons as plain, mapStateToProps };
