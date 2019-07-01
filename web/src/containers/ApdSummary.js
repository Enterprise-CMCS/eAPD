import { Choice } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Waypoint from './ConnectedWaypoint';
import { updateApd as updateApdAction } from '../actions/apd';
import { RichText } from '../components/Inputs';
import Instruction from '../components/Instruction';
import { Section } from '../components/Section';
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
    const { updateApd } = this.props;
    updateApd({ [name]: html });
  };

  render() {
    const {
      apd: {
        years,
        yearOptions,
        programOverview,
        narrativeHIT,
        narrativeHIE,
        narrativeMMIS
      }
    } = this.props;

    return (
      <Waypoint id="apd-summary">
        <Section isNumbered id="apd-summary" resource="apd">
          <h3 className="ds-h3 subsection--title">{t('apd.overview.title')}</h3>
          <Instruction source="apd.overview.instruction" />

          {yearOptions.map(option => (
            <Choice
              key={option}
              checked={years.includes(option)}
              name={`apd year ${option}`}
              onChange={this.handleYears}
              type="checkbox"
              value={option}
            >
              {option}
            </Choice>
          ))}

          <div className="ds-u-margin-y--3">
            <Instruction source="apd.introduction.instruction" />
            <RichText
              content={programOverview}
              onSync={this.syncRichText('programOverview')}
              editorClassName="rte-textarea-l"
            />
          </div>
          <div className="ds-u-margin-bottom--3">
            <Instruction source="apd.hit.instruction" />
            <RichText
              content={narrativeHIT}
              onSync={this.syncRichText('narrativeHIT')}
              editorClassName="rte-textarea-l"
            />
          </div>
          <div className="ds-u-margin-bottom--3">
            <Instruction source="apd.hie.instruction" />
            <RichText
              content={narrativeHIE}
              onSync={this.syncRichText('narrativeHIE')}
              editorClassName="rte-textarea-l"
            />
          </div>
          <div>
            <Instruction source="apd.mmis.instruction" />
            <RichText
              content={narrativeMMIS}
              onSync={this.syncRichText('narrativeMMIS')}
              editorClassName="rte-textarea-l"
            />
          </div>
        </Section>
      </Waypoint>
    );
  }
}

ApdSummary.propTypes = {
  apd: PropTypes.object.isRequired,
  updateApd: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd: { data } }) => ({ apd: data });
const mapDispatchToProps = { updateApd: updateApdAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdSummary);

export { ApdSummary as plain, mapStateToProps, mapDispatchToProps };
