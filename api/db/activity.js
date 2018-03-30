const logger = require('../logger')('db activity model');

module.exports = () => ({
  apdActivity: {
    tableName: 'activities',

    apd() {
      return this.belongsTo('apd');
    },

    goals() {
      return this.hasMany('apdActivityGoal');
    },

    approaches() {
      return this.hasMany('apdActivityApproach');
    },

    expenses() {
      return this.hasMany('apdActivityExpense');
    },

    async validate() {
      logger.silly('validating');

      if (this.hasChanged('name')) {
        const name = this.attributes.name;

        if (typeof name !== 'string' || name.length < 1) {
          logger.verbose('name is not a string or is empty');
          throw new Error('invalid-name');
        }

        const hasName = await this.where({ name }).fetchAll();
        if (hasName.length) {
          logger.verbose('another activity already has this name');
          throw new Error('name-exists');
        }
      }
    },

    toJSON() {
      return {
        id: this.get('id'),
        name: this.get('name'),
        description: this.get('description'),
        goals: this.related('goals'),
        approaches: this.related('approaches'),
        expenses: this.related('expenses')
      };
    }
  },

  apdActivityGoal: {
    tableName: 'activity_goals',

    activity() {
      return this.belongsTo('apdActivity');
    },

    objectives() {
      return this.hasMany('apdActivityGoalObjective');
    },

    toJSON() {
      return {
        description: this.get('description'),
        objectives: this.related('objectives')
      };
    }
  },

  apdActivityGoalObjective: {
    tableName: 'activity_goal_objectives',

    goal() {
      return this.belongsTo('apdActivityGoal');
    },

    toJSON() {
      return this.get('description');
    }
  },

  apdActivityApproach: {
    tableName: 'activity_approaches',

    activity() {
      return this.belongsTo('apdActivity');
    },

    toJSON() {
      return {
        description: this.get('description'),
        alternatives: this.get('alternatives'),
        explanation: this.get('explanation')
      };
    }
  },

  apdActivityExpense: {
    tableName: 'activity_expenses',

    activity() {
      return this.belongsTo('apdActivity');
    },

    entries() {
      return this.hasMany('apdActivityExpenseEntry', 'expense_id');
    },

    toJSON() {
      return {
        id: this.get('id'),
        name: this.get('name'),
        entries: this.related('entries')
      };
    }
  },

  apdActivityExpenseEntry: {
    tableName: 'activity_expense_entries',

    expense() {
      return this.belongsTo('apdActivityExpense', 'expense_id');
    },

    toJSON() {
      return {
        id: this.get('id'),
        year: this.get('year'),
        amount: this.get('amount'),
        description: this.get('description')
      };
    }
  }
});
