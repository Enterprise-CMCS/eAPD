import {
  Button,
  Choice,
  FormLabel,
  Review,
  TextField
} from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { t } from '../i18n';
import Dollars from '../components/Dollars';

const tRoot = 'apd.stateProfile.keyPersonnel';

const personTotalCost = person =>
  Object.values(person.costs).reduce((sum, value) => sum + +value, 0);

const PersonForm = ({
  collapse,
  number,
  handleChange,
  handleYearChange,
  person,
  primary,
  years
}) => {
  const changeHasCosts = handleChange('hasCosts', true);

  const toggleHasCosts = value => () => changeHasCosts({ target: { value } });

  return (
    <div className="form--with-reviews">
      <h3 className="ds-h3">
        {primary ? 'Primary' : 'Additional'} APD Point of Contact
      </h3>
      <TextField
        name={`apd-state-profile-pocname${number}`}
        label={t(`${tRoot}.labels.name`)}
        value={person.name}
        onChange={handleChange('name')}
      />
      <TextField
        name={`apd-state-profile-pocemail${number}`}
        label={t(`${tRoot}.labels.email`)}
        value={person.email}
        onChange={handleChange('email')}
      />
      <TextField
        name={`apd-state-profile-pocposition${number}`}
        label={t(`${tRoot}.labels.position`)}
        value={person.position}
        onChange={handleChange('position')}
      />
      <TextField
        name={`apd-state-profile-pocpercentTime${number}`}
        label={t(`${tRoot}.labels.percentTime`)}
        value={person.percentTime || 0}
        size="small"
        onChange={handleChange('percentTime')}
      />

      <fieldset className="ds-c-fieldset">
        <legend className="ds-c-label">{t(`${tRoot}.labels.hasCosts`)}</legend>
        <Choice
          type="radio"
          name={`apd-state-profile-hascosts-no${number}`}
          value="no"
          checked={!person.hasCosts}
          onChange={toggleHasCosts(false)}
        >
          No
        </Choice>
        <Choice
          type="radio"
          name={`apd-state-profile-hascosts-yes${number}`}
          value="yes"
          checked={person.hasCosts}
          onChange={toggleHasCosts(true)}
          checkedChildren={
            <div className="ds-c-choice__checkedChild ds-l-form-row">
              {years.map(ffy => (
                <div key={ffy} className="ds-l-col--auto">
                  <TextField
                    name={`apd-state-profile-costs${number}-fy${ffy}`}
                    label={`FFY ${ffy}`}
                    size="small"
                    mask="currency"
                    value={person.costs[ffy]}
                    onChange={handleYearChange(ffy)}
                  />
                </div>
              ))}
              <div className="ds-l-col--auto">
                <FormLabel>Total</FormLabel>
                <div className="form--computed-value__input-aligned">
                  <Dollars>{personTotalCost(person)}</Dollars>
                </div>
              </div>
            </div>
          }
        >
          Yes
        </Choice>
      </fieldset>
      <Button
        variation="primary"
        className="ds-u-margin-top--4"
        onClick={collapse}
      >
        Done
      </Button>
    </div>
  );
};
PersonForm.propTypes = {
  collapse: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleYearChange: PropTypes.func.isRequired,
  person: PropTypes.object.isRequired,
  primary: PropTypes.bool.isRequired,
  years: PropTypes.array.isRequired
};

class ApdStateKeyPerson extends Component {
  constructor(props) {
    super(props);

    this.state = { expanded: props.initialExpanded };
  }

  toggleExpanded = () => {
    this.setState(prev => ({ expanded: !prev.expanded }));
  };

  render() {
    const {
      handleChange,
      handleYearChange,
      number,
      person,
      primary,
      remove,
      years
    } = this.props;
    const { expanded } = this.state;

    return (
      <Fragment>
        <div className="visibility--screen">
          {expanded ? (
            <PersonForm
              collapse={this.toggleExpanded}
              handleChange={handleChange}
              handleYearChange={handleYearChange}
              number={number}
              person={person}
              primary={primary}
              years={years}
            />
          ) : (
            <Review
              heading={`${number}. ${person.name}`}
              editHref="#"
              onEditClick={this.toggleExpanded}
              editContent={
                <div>
                  <Button
                    size="small"
                    variation="transparent"
                    onClick={this.toggleExpanded}
                  >
                    Edit
                  </Button>
                  {!primary && (
                    <Fragment>
                      |
                      <Button
                        size="small"
                        variation="transparent"
                        onClick={remove}
                      >
                        Remove
                      </Button>
                    </Fragment>
                  )}
                </div>
              }
            >
              <ul className="ds-c-list--bare">
                <li>{person.position}</li>
                <li>
                  Total cost:{' '}
                  <Dollars>
                    {person.hasCosts ? personTotalCost(person) : 0}
                  </Dollars>
                </li>
                {primary ? <li>Primary APD Point of Contact</li> : null}
              </ul>
            </Review>
          )}
        </div>
        <div className="visibility--print">
          <Review heading={`${number}. ${person.name}`}>
            <ul className="ds-c-list--bare">
              <li>{person.email}</li>
              <li>{person.position}</li>
              <li>Time commitment to project: {person.percentTime}%</li>
              <li>
                Total cost:{' '}
                <Dollars>
                  {person.hasCosts ? personTotalCost(person) : 0}
                </Dollars>
              </li>
              {primary ? <li>Primary APD Point of Contact</li> : null}
            </ul>
          </Review>
        </div>
      </Fragment>
    );
  }
}
ApdStateKeyPerson.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleYearChange: PropTypes.func.isRequired,
  initialExpanded: PropTypes.bool,
  number: PropTypes.number.isRequired,
  person: PropTypes.shape({
    costs: PropTypes.object,
    email: PropTypes.string,
    hasCosts: PropTypes.bool,
    name: PropTypes.string,
    percentTime: PropTypes.number,
    position: PropTypes.string
  }).isRequired,
  primary: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.string).isRequired
};

ApdStateKeyPerson.defaultProps = {
  initialExpanded: false
};

export default ApdStateKeyPerson;
