import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateApd as updateApdAction } from '../actions/apd';
import { Textarea } from '../components/Inputs';
import { Section, Subsection } from '../components/Section';
import regLinks from '../data/assurancesAndCompliance.yaml';
import { t } from '../i18n';

const yes = t('assurancesAndCompliance.formLabels._yes');
const no = t('assurancesAndCompliance.formLabels._no');

const namify = (name, title) =>
  `explanation-${name}-${title}`.replace(/\s/g, '_');

const LinkOrText = ({ link, title }) => {
  if (!link) return title;

  return (
    <a href={link} target="_blank">
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
    this.props.updateApd({
      federalCitations: { [section]: { [index]: { checked: newValue } } }
    });
  };

  handleExplanationChange = (section, index) => e => {
    this.props.updateApd({
      federalCitations: {
        [section]: { [index]: { explanation: e.target.value } }
      }
    });
  };

  render() {
    const { sections: apdSections } = this.props;

    return (
      <Section id="assurances-compliance" resource="assurancesAndCompliance">
        <Subsection
          id="assurances-compliance-fed-citations"
          resource="assurancesAndCompliance.citations"
        >
          {Object.entries(regLinks).map(([name, regulations]) => (
            <div key={name} className="mb3">
              <h3>{t(`assurancesAndCompliance.headers.${name}`)}</h3>
              {apdSections[name].map(
                ({ title, checked, explanation }, index) => (
                  <div key={title} className="mt2">
                    <div className="mb-tiny flex items-center justify-between">
                      <div>
                        <LinkOrText link={regulations[title]} title={title} />
                      </div>
                      <div>
                        <label className="mr1">
                          <input
                            type="radio"
                            value={yes}
                            checked={checked}
                            onChange={this.handleCheckChange(name, index, true)}
                          />
                          {yes}
                        </label>
                        <label>
                          <input
                            type="radio"
                            value={no}
                            checked={!checked}
                            onChange={this.handleCheckChange(
                              name,
                              index,
                              false
                            )}
                          />
                          {no}
                        </label>
                      </div>
                    </div>
                    {checked ? (
                      <hr className="my2 border-grey" />
                    ) : (
                      <div>
                        <Textarea
                          name={namify(name, title)}
                          label={`Explanation for why you do not comply with ${title}`}
                          placeholder="Please explain..."
                          hideLabel
                          value={explanation}
                          onChange={this.handleExplanationChange(name, index)}
                        />
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          ))}
        </Subsection>
      </Section>
    );
  }
}

AssurancesAndCompliance.propTypes = {
  sections: PropTypes.object.isRequired,
  updateApd: PropTypes.func.isRequired
};

const mapStateToProps = ({
  apd: { data: { federalCitations: sections } }
}) => ({ sections });

const mapDispatchToProps = {
  updateApd: updateApdAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AssurancesAndCompliance
);
