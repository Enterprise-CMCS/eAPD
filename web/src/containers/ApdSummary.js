import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateApd as updateApdAction } from '../actions/apd';
import { RichText } from '../components/Inputs';
import Instruction from '../components/Instruction';
import { Section, Subsection } from '../components/Section';

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
      programOverview,
      narrativeHIT,
      narrativeHIE,
      narrativeMMIS
    } = this.props.apd;

    return (
      <Section id="apd-summary" resource="apd">
        <Subsection id="apd-summary-overview" resource="apd.overview">
          <div className="mb3">
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
            <Instruction source="apd.introduction.instruction" />
            <RichText
              content={programOverview}
              onSync={this.syncRichText('programOverview')}
              editorClassName="rte-textarea-l"
            />
          </div>
          <div className="mb3">
            <Instruction source="apd.hit.instruction" />
            <RichText
              content={narrativeHIT}
              onSync={this.syncRichText('narrativeHIT')}
              editorClassName="rte-textarea-l"
            />
          </div>
          <div className="mb3">
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdSummary);

export { ApdSummary as plain, mapStateToProps, mapDispatchToProps };
