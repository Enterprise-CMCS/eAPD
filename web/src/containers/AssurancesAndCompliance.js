import { Choice, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Waypoint from './ConnectedWaypoint';
import { updateApd as updateApdAction } from '../actions/apd';
import { Section, Subsection } from '../components/Section';
import regLinks from '../data/assurancesAndCompliance.yaml';
import { t } from '../i18n';

const namify = (name, title) =>
  `explanation-${name}-${title}`.replace(/\s/g, '_');

const LinkOrText = ({ link, title }) => {
  if (!link) return title;

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  );
};

LinkOrText.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string.isRequired
};

LinkOrText.defaultProps = {
  link: null
};

class AssurancesAndCompliance extends Component {
  handleCheckChange = (section, index, newValue) => () => {
    const { updateApd } = this.props;
    updateApd({
      federalCitations: { [section]: { [index]: { checked: newValue } } }
    });
  };

  handleExplanationChange = (section, index) => e => {
    const { updateApd } = this.props;
    updateApd({
      federalCitations: {
        [section]: { [index]: { explanation: e.target.value } }
      }
    });
  };

  render() {
    const { sections: apdSections } = this.props;

    return (
      <Waypoint id="assurances-compliance">
        <Section
          isNumbered
          id="assurances-compliance"
          resource="assurancesAndCompliance"
        >
          <Subsection
            id="assurances-compliance-fed-citations"
            resource="assurancesAndCompliance.citations"
          >
            {Object.entries(regLinks).map(([name, regulations]) => (
              <div key={name} className="ds-u-margin-bottom--3">
                <h3>{t(`assurancesAndCompliance.headings.${name}`)}</h3>
                {apdSections[name].map(
                  ({ title, checked, explanation }, index) => (
                    <fieldset key={title} className="ds-u-margin-top--2">
                      <legend className="ds-c-label">
                        Are you complying with{' '}
                        <strong>
                          <LinkOrText link={regulations[title]} title={title} />
                        </strong>
                        ?
                      </legend>
                      <Choice
                        type="radio"
                        value="yes"
                        name={`apd-assurances-yes-${namify(name, title)}`}
                        size="small"
                        checked={checked === true}
                        onChange={this.handleCheckChange(name, index, true)}
                      >
                        Yes
                      </Choice>
                      <Choice
                        type="radio"
                        value="no"
                        name={`apd-assurances-no-${namify(name, title)}`}
                        size="small"
                        checked={checked === false}
                        onChange={this.handleCheckChange(name, index, false)}
                        checkedChildren={
                          <div className="ds-c-choice__checkedChild">
                            <TextField
                              label="Please explain"
                              name={namify(name, title)}
                              value={explanation}
                              onChange={this.handleExplanationChange(
                                name,
                                index
                              )}
                              multiline
                              rows={5}
                            />
                          </div>
                        }
                      >
                        No
                      </Choice>
                    </fieldset>
                  )
                )}
              </div>
            ))}
          </Subsection>
        </Section>
      </Waypoint>
    );
  }
}

AssurancesAndCompliance.propTypes = {
  sections: PropTypes.object.isRequired,
  updateApd: PropTypes.func.isRequired
};

const mapStateToProps = ({
  apd: {
    data: { federalCitations: sections }
  }
}) => ({ sections });

const mapDispatchToProps = {
  updateApd: updateApdAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssurancesAndCompliance);

export {
  AssurancesAndCompliance as plain,
  mapStateToProps,
  mapDispatchToProps,
  LinkOrText
};
