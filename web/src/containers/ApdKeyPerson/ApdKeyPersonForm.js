import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { forwardRef, useState } from 'react';
import { connect } from 'react-redux';

import { titleCase } from 'title-case';
import { t } from '../../i18n';
import Choice from '../../components/Choice';
import PersonCostForm from '../../components/PersonCostForm';

import {
  setKeyPersonCost,
  setKeyPersonEmail,
  setKeyPersonHasCosts,
  setKeyPersonName,
  setKeyPersonFTE,
  setKeyPersonRole
} from '../../actions/editApd';

const tRoot = 'apd.stateProfile.keyPersonnel';

const PersonForm = forwardRef(
  (
    {
      index,
      item: { costs, email, hasCosts, name, fte, position },
      setCost,
      setEmail,
      setHasCosts,
      setName,
      setRole,
      setTime,
      years
    },
    ref
  ) => {
    const [name2, setName2] = useState('testing');

    const handleSubmit = e => {
      e.preventDefault();
      console.log('test');
      console.log({ name2 });
    };

    const handleChange =
      action =>
      ({ target: { value } }) => {
        action(index, value);
      };

    const setPersonHasCosts = newHasCosts => () => {
      setHasCosts(index, newHasCosts);
    };

    const setCostForYear = (year, value) => {
      setCost(index, year, value);
    };

    const setFTEForYear = (year, value) => {
      setTime(index, year, +value);
    };

    const primary = index === 0;

    return (
      <form ref={ref} onSubmit={handleSubmit}>
        <h4 className="ds-h4">
          {primary
            ? titleCase(t(`${tRoot}.labels.titlePrimary`))
            : titleCase(t(`${tRoot}.labels.titleSecondary`))}
        </h4>
        <p className="ds-u-margin-bottom--0">
          {primary
            ? t(`${tRoot}.labels.notePrimary`)
            : t(`${tRoot}.labels.noteSecondary`)}
        </p>
        <TextField
          autoFocus
          name={`apd-state-profile-pocname${index}`}
          label={t(`${tRoot}.labels.name`)}
          // value={name}
          // onChange={handleChange(setName)}
        />
        <TextField
          name={`apd-state-profile-pocemail${index}`}
          label={t(`${tRoot}.labels.email`)}
          // value={email}
          // onChange={handleChange(setEmail)}
        />
        <TextField
          name={`apd-state-profile-pocposition${index}`}
          label={t(`${tRoot}.labels.position`)}
          // value={position}
          // onChange={handleChange(setRole)}
        />

        <fieldset className="ds-c-fieldset">
          <legend className="ds-c-label">
            {t(`${tRoot}.labels.hasCosts`)}
          </legend>
          <Choice
            // checked={!hasCosts}
            label="No"
            name={`apd-state-profile-hascosts-${index}`}
            // onChange={setPersonHasCosts(false)}
            type="radio"
            value="no"
          />
          <Choice
            // checked={hasCosts}
            label="Yes"
            name={`apd-state-profile-hascosts-${index}`}
            // onChange={setPersonHasCosts(true)}
            type="radio"
            value="yes"
            checkedChildren={
              <PersonCostForm
                items={years.reduce(
                  (o, year) => ({
                    ...o,
                    [year]: {
                      amt: costs[year],
                      perc: fte[year]
                    }
                  }),
                  {}
                )}
                fteLabel="FTE Allocation"
                hint="For example: 0.5 = 0.5 FTE = 50% time"
                setCost={setCostForYear}
                setFTE={setFTEForYear}
              />
            }
          />
        </fieldset>
      </form>
    );
  }
);
PersonForm.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    costs: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    hasCosts: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    fte: PropTypes.object.isRequired,
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
  setTime: setKeyPersonFTE
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  PersonForm
);

export { PersonForm as plain, mapDispatchToProps };
