import { Button } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from './ApdStateKeyPerson';
import {
  addKeyPerson,
  removeKeyPerson,
  updateApd as updateApdAction,
  updateBudget
} from '../actions/apd';

class ApdStateKeyPersonnel extends Component {
  handleChange = index => (field, isExpense = false) => e => {
    const { updateBudget: dispatchBudget, updateApd } = this.props;
    updateApd({
      keyPersonnel: { [index]: { [field]: e.target.value } }
    });
    if (isExpense) {
      dispatchBudget();
    }
  };

  handleYearChange = index => year => e => {
    const { value } = e.target;
    const { updateBudget: dispatchBudget, updateApd } = this.props;

    const updates = {
      keyPersonnel: {
        [index]: { costs: { [year]: +value.replace(/[^\d]/g, '') } }
      }
    };
    updateApd(updates);
    dispatchBudget();
  };

  removePerson = i => () => {
    const { removeKeyPerson: action } = this.props;
    action(i);
  };

  render() {
    const { addKeyPerson: addPerson, poc, years } = this.props;
    return (
      <div className="ds-u-border-top--2">
        {poc.map((person, i) => (
          <Person
            key={person.key}
            handleChange={this.handleChange(i)}
            handleYearChange={this.handleYearChange(i)}
            initialExpanded={person.expanded}
            number={i + 1}
            person={person}
            primary={i === 0}
            remove={this.removePerson(i)}
            years={years}
          />
        ))}
        <Button
          className="ds-u-margin-top--2 visibility--screen"
          onClick={addPerson}
        >
          Add another person
        </Button>
      </div>
    );
  }
}

ApdStateKeyPersonnel.propTypes = {
  addKeyPerson: PropTypes.func.isRequired,
  poc: PropTypes.array.isRequired,
  removeKeyPerson: PropTypes.func.isRequired,
  updateApd: PropTypes.func.isRequired,
  updateBudget: PropTypes.func.isRequired,
  years: PropTypes.array.isRequired
};

const mapStateToProps = ({
  apd: {
    data: { keyPersonnel, years }
  }
}) => ({
  poc: keyPersonnel,
  years
});

const mapDispatchToProps = {
  addKeyPerson,
  removeKeyPerson,
  updateApd: updateApdAction,
  updateBudget
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdStateKeyPersonnel);

export { ApdStateKeyPersonnel as plain, mapStateToProps, mapDispatchToProps };
