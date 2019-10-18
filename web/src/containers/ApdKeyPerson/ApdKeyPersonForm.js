import { FormLabel, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { t } from '../../i18n';
import Choice from '../../components/Choice';
import DollarField from '../../components/DollarField';
import PercentField from '../../components/PercentField';
import Dollars from '../../components/Dollars';

import {
  setKeyPersonCost,
  setKeyPersonEmail,
  setKeyPersonHasCosts,
  setKeyPersonName,
  setKeyPersonPercentTime,
  setKeyPersonRole
} from '../../actions/editApd';

const tRoot = 'apd.stateProfile.keyPersonnel';

const PersonForm = ({
  index,
  item: { costs, email, hasCosts, name, percentTime, position },
  setCost,
  setEmail,
  setHasCosts,
  setName,
  setRole,
  setTime,
  years
}) => {
  const handleChange = action => ({ target: { value } }) => {
    action(index, value);
  };

  const setPersonHasCosts = newHasCosts => () => {
    setHasCosts(index, newHasCosts);
  };

  const setCostForYear = year => ({ target: { value } }) => {
    setCost(index, year, value);
  };

  const primary = index === 0;

  console.log(Object.values(costs));
  const totalCost = Object.values(costs).reduce(
    (sum, value) => sum + +value,
    0
  );

  return (
    <Fragment>
      <h4 className="ds-h4">
        {primary ? 'Primary' : 'Additional'} APD Point of Contact
      </h4>
      <TextField
        autoFocus="true"
        name={`apd-state-profile-pocname${index}`}
        label={t(`${tRoot}.labels.name`)}
        value={name}
        onChange={handleChange(setName)}
      />
      <TextField
        name={`apd-state-profile-pocemail${index}`}
        label={t(`${tRoot}.labels.email`)}
        value={email}
        onChange={handleChange(setEmail)}
      />
      <TextField
        name={`apd-state-profile-pocposition${index}`}
        label={t(`${tRoot}.labels.position`)}
        value={position}
        onChange={handleChange(setRole)}
      />
      <PercentField
        name={`apd-state-profile-pocpercentTime${index}`}
        label={t(`${tRoot}.labels.percentTime`)}
        value={percentTime || 0}
        size="small"
        onChange={handleChange(setTime)}
      />

      <fieldset className="ds-c-fieldset">
        <legend className="ds-c-label">{t(`${tRoot}.labels.hasCosts`)}</legend>
        <Choice
          type="radio"
          name={`apd-state-profile-hascosts-no${index}`}
          value="no"
          checked={!hasCosts}
          onChange={setPersonHasCosts(false)}
        >
          No
        </Choice>
        <Choice
          type="radio"
          name={`apd-state-profile-hascosts-yes${index}`}
          value="yes"
          checked={hasCosts}
          onChange={setPersonHasCosts(true)}
          checkedChildren={
            <div className="ds-c-choice__checkedChild ds-l-form-row">
              {years.map(ffy => (
                <div key={ffy} className="ds-l-col--auto">
                  <DollarField
                    name={`apd-state-profile-costs${index}-fy${ffy}`}
                    label={`FFY ${ffy}`}
                    size="small"
                    value={costs[ffy]}
                    onChange={setCostForYear(ffy)}
                  />
                </div>
              ))}
              <div className="ds-l-col--auto">
                <FormLabel>Total</FormLabel>
                <div className="form--computed-value__input-aligned">
                  <Dollars>{totalCost}</Dollars>
                </div>
              </div>
            </div>
          }
        >
          Yes
        </Choice>
      </fieldset>
    </Fragment>
  );
};
PersonForm.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    costs: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    hasCosts: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    percentTime: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    position: PropTypes.string.isRequired
  }).isRequired,
  setCost: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setHasCosts: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
  years: PropTypes.array.isRequired
};

const mapDispatchToProps = {
  setCost: setKeyPersonCost,
  setEmail: setKeyPersonEmail,
  setHasCosts: setKeyPersonHasCosts,
  setName: setKeyPersonName,
  setRole: setKeyPersonRole,
  setTime: setKeyPersonPercentTime
};

export default connect(
  null,
  mapDispatchToProps
)(PersonForm);

export { PersonForm as plain, mapDispatchToProps };
