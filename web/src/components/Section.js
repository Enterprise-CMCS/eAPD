import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Waypoint } from 'react-waypoint';

import Collapsible from './Collapsible';
import Instruction from './Instruction';
import { scrollTo } from '../actions/navigation';
import { t } from '../i18n';

const SectionTitle = ({ children }) => <h2>{children}</h2>;

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired
};

const SectionDesc = ({ children }) => <p className="mb4 text-l">{children}</p>;

SectionDesc.propTypes = {
  children: PropTypes.node.isRequired
};

class SectionPlain extends Component {
  hitWaypoint = id => () => {
    const { hasOverview, scrollTo: action } = this.props;
    action(hasOverview ? `${id}-overview` : id);
  };

  render() {
    const { children, id, isNumbered, resource } = this.props;
    const title = t([resource, 'title'], { defaultValue: false });
    const helptext = t([resource, 'helpText'], { defaultValue: false });

    return (
      <section id={id} className={isNumbered && 'numbered-section'}>
        <Waypoint onEnter={this.hitWaypoint(id)} bottomOffset="90%" />
        <h2 className="ds-h2">{title}</h2>
        <span className="ds-text--lead">{helptext}</span>
        {children}
      </section>
    );
  }
}

SectionPlain.propTypes = {
  children: PropTypes.node.isRequired,
  hasOverview: PropTypes.bool,
  id: PropTypes.string,
  resource: PropTypes.string,
  isNumbered: PropTypes.bool,
  scrollTo: PropTypes.func.isRequired
};

SectionPlain.defaultProps = {
  hasOverview: true,
  id: null,
  resource: null,
  isNumbered: false
};

class SubsectionPlain extends Component {
  hitWaypoint = id => () => {
    const { hasWaypoint, scrollTo: action } = this.props;
    if (hasWaypoint) {
      action(id);
    }
  };

  render() {
    const { children, id, nested, open, resource } = this.props;
    const title = t([resource, 'title'], { defaultValue: '' });

    return (
      <Fragment>
        <Waypoint onEnter={this.hitWaypoint(id)} bottomOffset="90%" />
        <Collapsible id={id} title={title} open={open} nested={nested}>
          <Instruction source={`${resource}.instruction`} />
          {children}
        </Collapsible>
      </Fragment>
    );
  }
}

SubsectionPlain.propTypes = {
  children: PropTypes.node.isRequired,
  hasWaypoint: PropTypes.bool,
  id: PropTypes.string,
  nested: PropTypes.bool,
  open: PropTypes.bool,
  resource: PropTypes.string,
  scrollTo: PropTypes.func.isRequired
};

SubsectionPlain.defaultProps = {
  resource: null,
  hasWaypoint: true,
  id: null,
  nested: false,
  open: false
};

const Section = connect(
  null,
  { scrollTo }
)(SectionPlain);

const Subsection = connect(
  null,
  { scrollTo }
)(SubsectionPlain);

export default Section;

export { Section, SectionDesc, SectionTitle, Subsection };
