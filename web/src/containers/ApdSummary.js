import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateApd as updateApdAction } from '../actions/apd';
import { RichText } from '../components/Inputs';
import { Section, Subsection } from '../components/Section';
import HelpText from '../components/HelpText';
import { t } from '../i18n';

class ApdSummary extends Component {
  handleYears = e => {
    const { value } = e.target;
    const { apd, updateApd } = this.props;
    const { years } = apd;

    const yearsNew = years.includes(value)
      ? years.filter(y => y !== value)
      : [...years, value].sort();

    updateApd({ years: yearsNew });
  };

  syncRichText = name => html => {
    this.props.updateApd({ [name]: html });
  };

  render() {
    const {
      years,
      yearOptions,
      overview,
      hitNarrative,
      hieNarrative,
      mmisNarrative
    } = this.props.apd;

    return (
      <Section id="apd-summary" resource="apd">
        <Subsection id="apd-summary-overview" resource="apd.overview">
          <div className="mb3">
            <div className="mb-tiny bold">{t('apd.overview.yearsCovered')}</div>
            {yearOptions.map(option => (
              <label key={option} className="mr1">
                <input
                  type="checkbox"
                  value={option}
                  checked={years.includes(option)}
                  onChange={this.handleYears}
                />
                {option}
              </label>
            ))}
          </div>
          <div className="mb3">
            <div className="mb-tiny bold">{t('apd.overview.labels.desc')}</div>
            <HelpText text="apd.overview.labels.helpText" />
            <RichText
              content={overview}
              onSync={this.syncRichText('overview')}
            />
          </div>
          <div className="mb3">
            <div className="bold">{t('apd.hit.title')}</div>
            <HelpText text="apd.hit.helpText" />
            <RichText
              content={hitNarrative}
              onSync={this.syncRichText('hitNarrative')}
            />
          </div>
          <div className="mb3">
            <div className="bold">{t('apd.hie.title')}</div>
            <HelpText text="apd.hie.helpText" />
            <RichText
              content={hieNarrative}
              onSync={this.syncRichText('hieNarrative')}
            />
          </div>
          <div>
            <div className="bold">{t('apd.mmis.title')}</div>
            <HelpText text="apd.mmis.helpText" />
            <RichText
              content={mmisNarrative}
              onSync={this.syncRichText('mmisNarrative')}
            />
          </div>
        </Subsection>
      </Section>
    );
  }
}

ApdSummary.propTypes = {
  apd: PropTypes.object.isRequired,
  updateApd: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd: { data } }) => ({ apd: data });
const mapDispatchToProps = { updateApd: updateApdAction };

export default connect(mapStateToProps, mapDispatchToProps)(ApdSummary);
