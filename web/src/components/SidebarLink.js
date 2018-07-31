import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Icon from '@fortawesome/react-fontawesome';

import { faChevronDown, faChevronUp } from './Icons';

const addIf = (condit, yes, no = '') => (condit ? yes : no);

const icon = (expanded, handler) => {
  if (expanded !== true && expanded !== false) return null;

  return (
    <button
      className="btn block right white"
      aria-label={expanded ? 'Collapse' : 'Expand'}
      onClick={handler}
    >
      <Icon icon={expanded ? faChevronUp : faChevronDown} size="sm" />
    </button>
  );
};

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
    <li
      className={`mb1 relative sb-item ${addIf(depth, 'pl2')} ${addIf(
        hash === anchor,
        'sb-item-active'
      )}`}
    >
      <a
        href={`#${anchor || '!'}`}
        className="white text-decoration-none truncate"
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
