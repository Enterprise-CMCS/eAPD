import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Collapsible from './Collapsible';
import HelpText from './HelpText';
import { t } from '../i18n';

const SectionTitle = ({ children }) => (
  <h2 className="mt1 mb2 h1 sm-h0 teal light">{children}</h2>
);

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired
};

const SectionDesc = ({ children }) => <p className="mb4 h3">{children}</p>;

SectionDesc.propTypes = {
  children: PropTypes.node.isRequired
};

const Section = ({ children, id, resource }) => {
  const title = t([resource, 'title'], { defaultValue: false });
  const subheader = t([resource, 'subheader'], { defaultValue: false });
  const helptext = t([resource, 'helpText'], { defaultValue: false });

  return (
    <section id={id} className="py2 border-bottom border-grey border-width-3">
      {title && <SectionTitle>{title}</SectionTitle>}
      {subheader && <div>{subheader}</div>}
      {helptext && <SectionDesc>{helptext}</SectionDesc>}
      {children}
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  resource: PropTypes.string
};

Section.defaultProps = {
  id: null,
  resource: null
};

const SubsectionChunk = ({ children, resource }) => {
  const subheader = t([resource, 'subheader'], { defaultValue: false });

  return (
    <Fragment>
      {subheader && <div className="mb-tiny bold">{subheader}</div>}
      <HelpText
        text={`${resource}.helpText`}
        reminder={`${resource}.reminder`}
      />
      {children}
    </Fragment>
  );
};

SubsectionChunk.propTypes = {
  children: PropTypes.node.isRequired,
  resource: PropTypes.string
};

SubsectionChunk.defaultProps = {
  resource: null
};

const Subsection = ({ children, id, open, resource }) => {
  const title = t([resource, 'title'], { defaultValue: '' });

  return (
    <Collapsible id={id} title={title} open={open}>
      <SubsectionChunk resource={resource}>{children}</SubsectionChunk>
    </Collapsible>
  );
};

Subsection.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  open: PropTypes.bool,
  resource: PropTypes.string
};

Subsection.defaultProps = {
  resource: null,
  id: null,
  open: false
};

export default Section;
export { Section, SectionDesc, SectionTitle, Subsection, SubsectionChunk };
