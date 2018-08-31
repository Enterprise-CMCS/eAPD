import deline from 'deline';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Icon from '@fortawesome/react-fontawesome';

import { faChevronDown, faChevronUp } from './Icons';

const icon = (expanded, handler) => {
  if (expanded !== true && expanded !== false) return null;

  return (
    <button
      className="btn px-tiny py0 white"
      aria-label={expanded ? 'Collapse' : 'Expand'}
      onClick={handler}
    >
      <Icon icon={expanded ? faChevronUp : faChevronDown} size="sm" />
    </button>
  );
};

const getClasses = (depth, hash, anchor) => deline`
  mb1 relative flex items-center justify-between sb-item
  ${depth ? 'pl2' : ''} ${hash === anchor ? 'sb-item-active' : ''}
`;

const SidebarLink = ({
  anchor,
  children,
  depth,
  expanded,
  hash,
  sub,
  toggleExpand,
  ...rest
}) => (
  <Fragment>
    <li className={getClasses(depth, hash, anchor)}>
      <a
        href={`#${anchor || '!'}`}
        className="white text-decoration-none truncate"
        onClick={depth === 0 ? toggleExpand : undefined}
        {...rest}
      >
        {children}
      </a>
      {icon(expanded, toggleExpand)}
    </li>
    {expanded &&
      sub.map(l => (
        <SidebarLink key={l.id} anchor={l.id} hash={hash} depth={depth + 1}>
          {l.name}
        </SidebarLink>
      ))}
  </Fragment>
);

SidebarLink.propTypes = {
  anchor: PropTypes.string,
  children: PropTypes.node.isRequired,
  depth: PropTypes.number,
  expanded: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  hash: PropTypes.string,
  sub: PropTypes.array,
  toggleExpand: PropTypes.func
};

SidebarLink.defaultProps = {
  anchor: null,
  depth: 0,
  expanded: null,
  hash: null,
  sub: [],
  toggleExpand: () => {}
};

export default SidebarLink;
