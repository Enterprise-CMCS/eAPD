import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  Alert,
  ChoiceList,
  TextField,
  Tooltip,
  TooltipIcon
} from '@cmsgov/design-system';
import { connect } from 'react-redux';
import DeleteModal from '../../../components/DeleteModal';

import { APD_TYPE } from '@cms-eapd/common/utils/constants';

import {
  addYear,
  removeYear,
  setApdName
} from '../../../redux/actions/editApd';
import { Section } from '../../../components/Section';
import { t } from '../../../i18n';

import { selectSummary } from '../../../redux/selectors/apd.selectors';
import { useFlags } from 'launchdarkly-react-client-sdk';

import ApdOverviewHITECHFields from './ApdOverviewHITECHFields';
import ApdOverviewMMISFields from './ApdOverviewMMISFields';

const renderApdTypeSpecificFields = apdType => {
  const apdTypeSpecificFieldsMapping = {
    [APD_TYPE.HITECH]: <ApdOverviewHITECHFields />,
    [APD_TYPE.MMIS]: <ApdOverviewMMISFields />
  };
  return apdTypeSpecificFieldsMapping[apdType];
};

const ApdOverview = ({
  addApdYear,
  apdType,
  name,
  removeApdYear,
  setName,
  years,
  yearOptions
}) => {
  const [elementDeleteFFY, setElementDeleteFFY] = useState(null);
  const { enableMmis } = useFlags();

  const changeName = ({ target: { value } }) => {
    setName(value);
  };

  const onBlur = e => {
    const apdNameInput = e.target.value;

    if (apdNameInput.trim() === '') {
      setName('Untitled APD');
    } else {
      setName(apdNameInput);
    }
  };

  const onRemove = () => {
    removeApdYear(elementDeleteFFY.value);
    setElementDeleteFFY(null);
  };

  const onCancel = () => {
    setElementDeleteFFY(null);
    elementDeleteFFY.checked = true;
  };

  const handleYears = e => {
    const year = e.target.value;

    if (e.target.checked === false) {
      setElementDeleteFFY(e.target);
    } else {
      addApdYear(year);
      e.target.checked = true;
    }
  };

  const yearChoices = yearOptions.map(year => ({
    defaultChecked: years.includes(year),
    label: year,
    value: year
  }));

  const getLabelElement = () => {
    if (years.length > 0) {
      return t('apd.overview.instruction.short');
    }
    return (
      <React.Fragment>
        {t('apd.overview.instruction.short')}
        <Alert variation="error">
          <div style={{ fontWeight: 400 }}>
            At least one FFY must be selected to continue with your APD. Select
            your FFY(s).
          </div>
        </Alert>
      </React.Fragment>
    );
  };

  return (
    <Section resource="apd">
      <hr className="custom-hr" />
      <div className="apd_type_choice-container">
        <ChoiceList
          type="radio"
          className="apd_disabled_choice"
          choices={[
            {
              defaultChecked: !enableMmis || apdType === APD_TYPE.HITECH,
              disabled: true,
              label: 'HITECH IAPD'
            }
          ]}
        />
        <span className="tooltip-container">
          <Tooltip
            className="ds-c-tooltip__trigger-link"
            component="a"
            onClose={function noRefCheck() {}}
            onOpen={function noRefCheck() {}}
            title="Health Information Techology for Economic and Clinical Health"
          >
            <TooltipIcon />
          </Tooltip>
        </span>
      </div>
      {enableMmis == true && (
        <div className="apd_type_choice-container">
          <ChoiceList
            type="radio"
            className="apd_disabled_choice"
            choices={[
              {
                defaultChecked: apdType === APD_TYPE.MMIS,
                disabled: true,
                label: 'MMIS IAPD'
              }
            ]}
          />
          <span className="tooltip-container">
            <Tooltip
              className="ds-c-tooltip__trigger-link"
              component="a"
              onClose={function noRefCheck() {}}
              onOpen={function noRefCheck() {}}
              title="Medicaid Management Information System"
            >
              <TooltipIcon />
            </Tooltip>
          </span>
        </div>
      )}
      <TextField
        className="remove-clearfix"
        label="APD Name"
        name="apd-name"
        onChange={changeName}
        onBlur={onBlur}
        value={name}
      />
      <div className="ds-u-margin-y--3" data-cy="yearList">
        <ChoiceList
          choices={yearChoices}
          label={getLabelElement()}
          labelClassName="ds-u-margin-bottom--1"
          name="apd-years"
          onChange={handleYears}
          type="checkbox"
        />
      </div>
      {renderApdTypeSpecificFields(apdType)}
      {elementDeleteFFY && (
        <DeleteModal objType="FFY" onCancel={onCancel} onDelete={onRemove} />
      )}
    </Section>
  );
};

ApdOverview.propTypes = {
  addApdYear: PropTypes.func.isRequired,
  apdType: PropTypes.string,
  removeApdYear: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  years: PropTypes.arrayOf(PropTypes.string).isRequired,
  yearOptions: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  apdType: state.apd.data.apdType,
  ...selectSummary(state)
});

const mapDispatchToProps = {
  addApdYear: addYear,
  removeApdYear: removeYear,
  setName: setApdName
};

export default connect(mapStateToProps, mapDispatchToProps)(ApdOverview);

export { ApdOverview as plain, mapStateToProps, mapDispatchToProps };
