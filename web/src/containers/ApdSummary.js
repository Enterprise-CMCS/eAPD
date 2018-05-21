import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ApdKeyPersonnel from './ApdKeyPersonnel';
import { updateApd as updateApdAction } from '../actions/apd';
import Collapsible from '../components/Collapsible';
import { RichText } from '../components/Inputs';
import Section from '../components/Section';
import SectionDesc from '../components/SectionDesc';
import SectionTitle from '../components/SectionTitle';
import HelpText from '../components/HelpText';
import { t } from '../i18n';

const YEAR_OPTIONS = ['2018', '2019', '2020'];

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
      overview,
      hitNarrative,
      hieNarrative,
      mmisNarrative
    } = this.props.apd;

    return (
      <Section id="apd-summary">
        <SectionTitle>{t('apd.sectionTitle')}</SectionTitle>
        <SectionDesc>{t('apd.helpText')}</SectionDesc>
        <Collapsible title={t('apd.overview.title')}>
          <HelpText
            text="apd.overview.helpText"
            reminder="apd.overview.reminder"
          />
          <div className="mb3">
            <div className="mb-tiny bold">{t('apd.overview.yearsCovered')}</div>
            {YEAR_OPTIONS.map(option => (
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
          <div>
            <div className="mb-tiny bold">{t('apd.overview.labels.desc')}</div>
            <RichText
              content={overview}
              onSync={this.syncRichText('overview')}
            />
          </div>
        </Collapsible>
        <ApdKeyPersonnel />
        <Collapsible title={t('apd.hit.title')}>
          <HelpText text="apd.hit.helpText" />
          <RichText
            content={hitNarrative}
            onSync={this.syncRichText('hitNarrative')}
          />
        </Collapsible>
        <Collapsible title={t('apd.hie.title')}>
          <HelpText text="apd.hie.helpText" />
          <RichText
            content={hieNarrative}
            onSync={this.syncRichText('hieNarrative')}
          />
        </Collapsible>
        <Collapsible title={t('apd.mmis.title')}>
          <HelpText text="apd.mmis.helpText" />
          <RichText
            content={mmisNarrative}
            onSync={this.syncRichText('mmisNarrative')}
          />
        </Collapsible>
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
