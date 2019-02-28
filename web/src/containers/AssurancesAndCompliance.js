import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateApd as updateApdAction } from '../actions/apd';
import { Textarea } from '../components/Inputs';
import Btn from '../components/Btn';
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
              <h3>{t(`assurancesAndCompliance.headings.${name}`)}</h3>
              {apdSections[name].map(
                ({ title, checked, explanation }, index) => (
                  <div key={title} className="mt2">
                    <div className="mb1 flex items-end justify-between">
                      <LinkOrText link={regulations[title]} title={title} />
                      <div>
                        <Btn
                          kind="outline"
                          size="small"
                          extraCss={`h5 ${checked ? 'bg-black white' : ''}`}
                          onClick={this.handleCheckChange(name, index, true)}
                        >
                          {yes}
                        </Btn>{' '}
                        <Btn
                          kind="outline"
                          size="small"
                          extraCss={`h5 ${checked ? '' : 'bg-black white'}`}
                          onClick={this.handleCheckChange(name, index, false)}
                        >
                          {no}
                        </Btn>
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
                          className="m0 textarea textarea-sm"
                          rows="3"
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
