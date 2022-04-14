import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { titleCase } from 'title-case';
import {
  setComplyingWithProcurement,
  setComplyingWithRecordsAccess,
  setComplyingWithSecurity,
  setComplyingWithSoftwareRights,
  setJustificationForProcurement,
  setJustificationForRecordsAccess,
  setJustificationForSecurity,
  setJustificationForSoftwareRights
} from '../../../actions/editApd';
import { ChoiceList } from '@cmsgov/design-system';
import { Section, Subsection } from '../../../components/Section';
import TextArea from '../../../components/TextArea';
import regLinks from '../../../data/assurancesAndCompliance.yaml';
import { t } from '../../../i18n';
import { selectFederalCitations } from '../../../reducers/apd.selectors';
import AlertMissingFFY from '../../../components/AlertMissingFFY';

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

const AssurancesAndCompliance = ({
  citations,
  complyingWithProcurement,
  complyingWithRecordsAccess,
  complyingWithSecurity,
  complyingWithSoftwareRights,
  justificationForProcurement,
  justificationForRecordsAccess,
  justificationForSecurity,
  justificationForSoftwareRights
}) => {
  function handleCheckChange(section, index, newValue) {
    console.log('BEFORE ALL TIME');
    switch (section) {
      case 'procurement':
        return complyingWithProcurement(index, newValue);
      case 'recordsAccess':
        return complyingWithRecordsAccess(index, newValue);
      case 'security':
        return complyingWithSecurity(index, newValue);
      case 'softwareRights':
        return complyingWithSoftwareRights(index, newValue);
      default:
        return null;
    }
  }

  const handleExplanationChange =
    (section, index) =>
    ({ target: { value } }) => {
      switch (section) {
        case 'procurement':
          return justificationForProcurement(index, value);
        case 'recordsAccess':
          return justificationForRecordsAccess(index, value);
        case 'security':
          return justificationForSecurity(index, value);
        case 'softwareRights':
          return justificationForSoftwareRights(index, value);
        default:
          return null;
      }
    };

  return (
    <React.Fragment>
      <AlertMissingFFY />
      <Section id="assurances-compliance" resource="assurancesAndCompliance">
        <Subsection
          id="assurances-compliance-fed-citations"
          resource="assurancesAndCompliance.citations"
        >
          {Object.entries(regLinks).map(([name, regulations]) => (
            <div key={name} className="ds-u-margin-bottom--3">
              <h4 className="ds-h4">
                {titleCase(t(`assurancesAndCompliance.headings.${name}`))}
              </h4>
              {citations[name].map(({ title, checked, explanation }, index) => (
                <ChoiceList
                  key={title}
                  label={
                    <legend className="ds-c-label">
                      Are you complying with{' '}
                      <strong>
                        <LinkOrText link={regulations[title]} title={title} />
                      </strong>
                      ?
                    </legend>
                  }
                  name={`apd-assurances-${namify(name, title)}`}
                  choices={[
                    {
                      label: 'Yes',
                      value: 'yes',
                      checked: checked === true
                    },
                    {
                      label: 'No',
                      value: 'no',
                      checked: checked === false,
                      checkedChildren: (
                        <div className="ds-c-choice__checkedChild">
                          <TextArea
                            label="Please explain"
                            name={namify(name, title)}
                            value={explanation}
                            onChange={handleExplanationChange(name, index)}
                            rows={5}
                          />
                        </div>
                      )
                    }
                  ]}
                  type="radio"
                  size="small"
                  onChange={e => {
                    e.target.value === 'yes'
                      ? handleCheckChange(name, index, true)
                      : handleCheckChange(name, index, false);
                  }}
                />
              ))}
            </div>
          ))}
        </Subsection>
      </Section>
    </React.Fragment>
  );
};

AssurancesAndCompliance.propTypes = {
  citations: PropTypes.object.isRequired,
  complyingWithProcurement: PropTypes.func.isRequired,
  complyingWithRecordsAccess: PropTypes.func.isRequired,
  complyingWithSecurity: PropTypes.func.isRequired,
  complyingWithSoftwareRights: PropTypes.func.isRequired,
  justificationForProcurement: PropTypes.func.isRequired,
  justificationForRecordsAccess: PropTypes.func.isRequired,
  justificationForSecurity: PropTypes.func.isRequired,
  justificationForSoftwareRights: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ citations: selectFederalCitations(state) });

const mapDispatchToProps = {
  complyingWithProcurement: setComplyingWithProcurement,
  complyingWithRecordsAccess: setComplyingWithRecordsAccess,
  complyingWithSecurity: setComplyingWithSecurity,
  complyingWithSoftwareRights: setComplyingWithSoftwareRights,
  justificationForProcurement: setJustificationForProcurement,
  justificationForRecordsAccess: setJustificationForRecordsAccess,
  justificationForSecurity: setJustificationForSecurity,
  justificationForSoftwareRights: setJustificationForSoftwareRights
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
