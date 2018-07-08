import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Collapsible from './Collapsible';
import HelpText from './HelpText';
import SectionTitle from './SectionTitle';
import SectionDesc from './SectionDesc';
import { t } from '../i18n';

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

const Chunk = ({ children, resource }) => {
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

Chunk.propTypes = {
  children: PropTypes.node.isRequired,
  resource: PropTypes.string
};

Chunk.defaultProps = {
  resource: null
};

const Subsection = ({ children, id, isKey, open, resource }) => {
  const title = t([resource, 'title'], { defaultValue: '' });

  return (
    <Collapsible id={id} title={`${isKey ? 'Key ' : ''}${title}`} open={open}>
      <Chunk resource={resource}>{children}</Chunk>
    </Collapsible>
  );
};

Subsection.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  isKey: PropTypes.bool,
  open: PropTypes.bool,
  resource: PropTypes.string
};

Subsection.defaultProps = {
  resource: null,
  id: null,
  isKey: false,
  open: false
};

export default Section;
export { Chunk, Section, Subsection };
