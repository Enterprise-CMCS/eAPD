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

    toJSON() {
      return {
        id: this.get('id'),
        name: this.get('name'),
        description: this.get('description'),
        goals: this.related('goals'),
        approaches: this.related('approaches')
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

    toJSON() {
      return {
        year: this.get('year'),
        amount: this.get('amount'),
        description: this.get('description'),
        activity: this.related('activity')
      };
    }
  }
});
