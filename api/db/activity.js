module.exports = () => ({
  apdActivity: {
    tableName: 'activities',

    apd() {
      return this.belongsTo('apd');
    },

    goals() {
      return this.hasMany('apdActivityGoal');
    },

    expenses() {
      return this.hasMany('apdActivityExpense');
    },

    toJSON() {
      return {
        id: this.get('id'),
        name: this.get('name'),
        description: this.get('description'),
        goals: this.related('goals'),
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

  apdActivityExpense: {
    tableName: 'activity_expenses',
    idAttribute: null,

    activity() {
      return this.belongsTo('apdActivity');
    },

    expense() {
      return this.belongsTo('expense');
    },

    toJSON() {
      return {
        year: this.get('year'),
        amount: this.get('amount'),
        description: this.get('description')
      };
    }
  }
});
