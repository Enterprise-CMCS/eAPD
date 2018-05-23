import PropTypes from 'prop-types';
import React from 'react';
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
    <section id={id} className="p2 sm-px3 border-bottom border-gray">
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

const Subsection = ({ children, open, resource }) => {
  const title = t([resource, 'title'], { defaultValue: false });
  const subheader = t([resource, 'subheader'], { defaultValue: false });
  const helptext = t([resource, 'helpText'], { defaultValue: false });

  return (
    <Collapsible title={title} open={open}>
      {subheader && <div>{subheader}</div>}
      {helptext && (
        <HelpText
          text={`${resource}.helpText`}
          reminder={`${resource}.reminder`}
        />
      )}
      {children}
    </Collapsible>
  );
};

Subsection.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  resource: PropTypes.string
};

Subsection.defaultProps = {
  resource: null,
  open: false
};

export default Section;
export { Section, Subsection };
