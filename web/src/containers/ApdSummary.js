import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

const ApdSummary = () => {
  const dispatch = useDispatch();

  const {
    narrativeHIE,
    narrativeHIT,
    narrativeMMIS,
    programOverview,
    years,
    yearOptions
  } = useSelector(({ apd: { data } }) => data);

  const handleYears = e => {
    const { value } = e.target;
    if (years.includes(value)) {
      dispatch(removeYear(value));
    } else {
      dispatch(addYear(value));
    }
  };

  const syncRichText = action => html => {
    dispatch(action(html));
  };

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
            content={programOverview}
            onSync={syncRichText(setProgramOverview)}
            editorClassName="rte-textarea-l"
          />
        </div>
        <div className="ds-u-margin-bottom--3">
          <Instruction source="apd.hit.instruction" />
          <RichText
            content={narrativeHIT}
            onSync={syncRichText(setNarrativeForHIT)}
            editorClassName="rte-textarea-l"
          />
        </div>
        <div className="ds-u-margin-bottom--3">
          <Instruction source="apd.hie.instruction" />
          <RichText
            content={narrativeHIE}
            onSync={syncRichText(setNarrativeForHIE)}
            editorClassName="rte-textarea-l"
          />
        </div>
        <div>
          <Instruction source="apd.mmis.instruction" />
          <RichText
            content={narrativeMMIS}
            onSync={syncRichText(setNarrativeForMMIS)}
            editorClassName="rte-textarea-l"
          />
        </div>
      </Section>
    </Waypoint>
  );
};

export default ApdSummary;
