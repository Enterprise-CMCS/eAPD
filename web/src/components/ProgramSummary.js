import PropTypes from 'prop-types';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';

import Section from './Section';
import SectionTitle from './SectionTitle';
import Collapsible from './Collapsible';
import { EDITOR_CONFIG } from '../util';

const ProgramSummary = ({ editYears, selectedYears }) => (
  <Section>
    <SectionTitle>Program Summary</SectionTitle>
    <Collapsible title="Overview" open>
      <div className="mb3">
        <div className="mb1 bold">What years does this APD cover?</div>
        {['2018', '2019', '2020'].map(year => (
          <label key={year} className="mr1">
            <input
              type="checkbox"
              value={year}
              checked={selectedYears.includes(year)}
              onChange={editYears(year, selectedYears)}
            />
            {year}
          </label>
        ))}
      </div>
      <div>
        <div className="mb1 bold">Please...</div>
        <Editor toolbar={EDITOR_CONFIG} />
      </div>
    </Collapsible>
    <Collapsible title="HIT Narrative">
      <div>
        <label htmlFor="hit-narrative">HIT Narrative</label>
        <textarea
          className="m0 textarea col-8"
          id="hit-narrative"
          rows="5"
          spellCheck="true"
        />
      </div>
    </Collapsible>
    <Collapsible title="HIE Narrative">
      <div>
        <label htmlFor="hie-narrative">HIE Narrative</label>
        <textarea
          className="m0 textarea col-8"
          id="hie-narrative"
          rows="5"
          spellCheck="true"
        />
      </div>
    </Collapsible>
  </Section>
);

ProgramSummary.propTypes = {
  editYears: PropTypes.func.isRequired,
  selectedYears: PropTypes.array.isRequired
};

export default ProgramSummary;
