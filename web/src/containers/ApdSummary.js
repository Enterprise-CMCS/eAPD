import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Waypoint from './ConnectedWaypoint';
import {
  addYear,
  removeYear,
  setNarrativeForHIE,
  setNarrativeForHIT,
  setNarrativeForMMIS,
  setProgramOverview
} from '../actions/editApd';
import Choice from '../components/Choice';
import RichText from '../components/RichText';
import Instruction from '../components/Instruction';
import { Section } from '../components/Section';
import { t } from '../i18n';
import { selectSummary } from '../reducers/apd.selectors';
import { generateKey as defaultGenerateKey } from '../util';

// Make this thing injectible for testing.
let generateKey = defaultGenerateKey;
export const setKeyGenerator = fn => {
  generateKey = fn;
};

const ApdSummary = ({
  addApdYear,
  narrativeHIE,
  narrativeHIT,
  narrativeMMIS,
  programOverview,
  removeApdYear,
  setHIE,
  setHIT,
  setMMIS,
  setOverview,
  years,
  yearOptions
}) => {
  const handleYears = e => {
    const { value } = e.target;
    if (years.includes(value)) {
      removeApdYear(value);
    } else {
      addApdYear(value);
    }
  };

  const syncRichText = action => html => {
    action(html);
  };

  return (
    <Waypoint id="apd-summary">
      <Section id="apd-summary" resource="apd">
        <h3 className="ds-h3 subsection--title">{t('apd.overview.title')}</h3>
        <Instruction source="apd.overview.instruction" />

        {yearOptions.map(option => (
          <Choice
            key={option}
            checked={years.includes(option)}
            name={`apd year ${option}`}
            onChange={handleYears}
            type="checkbox"
            value={option}
          >
            {option}
          </Choice>
        ))}

        <div className="ds-u-margin-y--3">
          <Instruction source="apd.introduction.instruction" />
          <RichText
            key={generateKey()}
            content={programOverview}
            onSync={syncRichText(setOverview)}
            editorClassName="rte-textarea-l"
          />
        </div>
        <div className="ds-u-margin-bottom--3">
          <Instruction source="apd.hit.instruction" />
          <RichText
            key={generateKey()}
            content={narrativeHIT}
            onSync={syncRichText(setHIT)}
            editorClassName="rte-textarea-l"
          />
        </div>
        <div className="ds-u-margin-bottom--3">
          <Instruction source="apd.hie.instruction" />
          <RichText
            key={generateKey()}
            content={narrativeHIE}
            onSync={syncRichText(setHIE)}
            editorClassName="rte-textarea-l"
          />
        </div>
        <div>
          <Instruction source="apd.mmis.instruction" />
          <RichText
            key={generateKey()}
            content={narrativeMMIS}
            onSync={syncRichText(setMMIS)}
            editorClassName="rte-textarea-l"
          />
        </div>
      </Section>
    </Waypoint>
  );
};

ApdSummary.propTypes = {
  addApdYear: PropTypes.func.isRequired,
  removeApdYear: PropTypes.func.isRequired,
  narrativeHIE: PropTypes.string.isRequired,
  narrativeHIT: PropTypes.string.isRequired,
  narrativeMMIS: PropTypes.string.isRequired,
  programOverview: PropTypes.string.isRequired,
  setHIE: PropTypes.func.isRequired,
  setHIT: PropTypes.func.isRequired,
  setMMIS: PropTypes.func.isRequired,
  setOverview: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.string).isRequired,
  yearOptions: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = selectSummary;

const mapDispatchToProps = {
  addApdYear: addYear,
  removeApdYear: removeYear,
  setHIE: setNarrativeForHIE,
  setHIT: setNarrativeForHIT,
  setMMIS: setNarrativeForMMIS,
  setOverview: setProgramOverview
};

export default connect(mapStateToProps, mapDispatchToProps)(ApdSummary);

export { ApdSummary as plain, mapStateToProps, mapDispatchToProps };
