import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { updateApd as updateApdAction } from '../actions/apd';
import Collapsible from '../components/Collapsible';
import { RichText, Textarea } from '../components/Inputs';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';

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
    const { apd, updateApd } = this.props;

    return (
      <Section id="apd-summary">
        <SectionTitle>{t('apd.sectionTitle')}</SectionTitle>
        <Collapsible title={t('apd.overview.title')}>
          <div className="mb3">
            <div className="mb-tiny bold">{t('apd.overview.yearsCovered')}</div>
            {YEAR_OPTIONS.map(option => (
              <label key={option} className="mr1">
                <input
                  type="checkbox"
                  value={option}
                  checked={apd.years.includes(option)}
                  onChange={this.handleYears}
                />
                {option}
              </label>
            ))}
          </div>
          <div>
            <div className="mb-tiny bold">{t('apd.overview.labels.desc')}</div>
            <RichText
              content={apd.overview}
              onSync={this.syncRichText('overview')}
            />
          </div>
        </Collapsible>
        <Collapsible title={t('apd.hit')}>
          <Textarea
            name="hit-narrative"
            label={t('apd.hit')}
            rows="5"
            value={apd.hitNarrative}
            onChange={e => updateApd({ hitNarrative: e.target.value })}
          />
        </Collapsible>
        <Collapsible title={t('apd.hie')}>
          <Textarea
            name="hie-narrative"
            label={t('apd.hie')}
            rows="5"
            value={apd.hieNarrative}
            onChange={e => updateApd({ hieNarrative: e.target.value })}
          />
        </Collapsible>
        <Collapsible title={t('apd.mmis')}>
          <Textarea
            name="mmis-narrative"
            label={t('apd.mmis')}
            rows="5"
            value={apd.mmisNarrative}
            onChange={e => updateApd({ mmisNarrative: e.target.value })}
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
