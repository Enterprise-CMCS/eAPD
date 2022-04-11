import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Alert, ChoiceList, TextField } from '@cmsgov/design-system';
import { connect } from 'react-redux';
import DeleteModal from '../../../components/DeleteModal';

import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import apdOverviewSchema from '../../../static/schemas/apdOverview';

import {
  addYear,
  removeYear,
  setApdName,
  setNarrativeForHIE,
  setNarrativeForHIT,
  setNarrativeForMMIS,
  setProgramOverview
} from '../../../actions/editApd';
import RichText from '../../../components/RichText';
import Instruction from '../../../components/Instruction';
import { Section } from '../../../components/Section';
import { t } from '../../../i18n';
import { selectSummary } from '../../../reducers/apd.selectors';

const ApdOverview = ({
  addApdYear,
  name,
  narrativeHIE,
  narrativeHIT,
  narrativeMMIS,
  programOverview,
  removeApdYear,
  setHIE,
  setHIT,
  setMMIS,
  setName,
  setOverview,
  years,
  yearOptions
}) => {
  const [elementDeleteFFY, setElementDeleteFFY] = useState(null);

  const {
    control,
    formState: { errors, isValid },
    setValue,
    getValue
  } = useForm({
    defaultValues: {
      programOverview
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: joiResolver(apdOverviewSchema)
  });
  
  useEffect(() => {
    console.log("errors", errors)
    console.log("isValid", isValid)
    console.log("ok", programOverview)
  }, [isValid, errors])
  
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

  const syncRichText = action => html => {
    action(html);
  };
  
  const handleProgramOverview = html => {
    setOverview(html);
    setValue('programOverview', html);
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
      <TextField
        className="remove-clearfix"
        label="APD Name"
        name="apd-name"
        onChange={changeName}
        onBlur={onBlur}
        value={name}
      />
      <ChoiceList
        choices={yearChoices}
        label={getLabelElement()}
        labelClassName="ds-u-margin-bottom--1"
        name="apd-years"
        onChange={handleYears}
        type="checkbox"
      />
      <div className="ds-u-margin-y--3">
        <Instruction
          labelFor="program-introduction-field"
          source="apd.introduction.instruction"
        />
        <Controller
          name="programOverview"
          control={control}
          render={({ field: { ...props } }) => (
            <RichText
              {...props}
              id="program-introduction-field"
              content={programOverview}
              onSync={handleProgramOverview}
              editorClassName="rte-textarea-l"
              error={errors?.programOverview?.message}
            />
          )}
        />
      </div>
      <div className="ds-u-margin-bottom--3">
        <Instruction
          labelFor="hit-overview-field"
          source="apd.hit.instruction"
        />
        <RichText
          id="hit-overview-field"
          content={narrativeHIT}
          onSync={syncRichText(setHIT)}
          editorClassName="rte-textarea-l"
        />
      </div>
      <div className="ds-u-margin-bottom--3">
        <Instruction
          labelFor="hie-overview-field"
          source="apd.hie.instruction"
        />
        <RichText
          id="hie-overview-field"
          content={narrativeHIE}
          onSync={syncRichText(setHIE)}
          editorClassName="rte-textarea-l"
        />
      </div>
      <div>
        <Instruction
          labelFor="mmis-overview-field"
          source="apd.mmis.instruction"
        />
        <RichText
          id="mmis-overview-field"
          content={narrativeMMIS}
          onSync={syncRichText(setMMIS)}
          editorClassName="rte-textarea-l"
        />
      </div>
      {elementDeleteFFY && (
        <DeleteModal objType="FFY" onCancel={onCancel} onDelete={onRemove} />
      )}
    </Section>
  );
};

ApdOverview.propTypes = {
  addApdYear: PropTypes.func.isRequired,
  removeApdYear: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  narrativeHIE: PropTypes.string.isRequired,
  narrativeHIT: PropTypes.string.isRequired,
  narrativeMMIS: PropTypes.string.isRequired,
  programOverview: PropTypes.string.isRequired,
  setHIE: PropTypes.func.isRequired,
  setHIT: PropTypes.func.isRequired,
  setMMIS: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
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
  setName: setApdName,
  setOverview: setProgramOverview
};

export default connect(mapStateToProps, mapDispatchToProps)(ApdOverview);

export { ApdOverview as plain, mapStateToProps, mapDispatchToProps };
