module.exports = () => ({
  apdActivity: {
    tableName: 'activities',

    apd() {
      return this.belongsTo('apd');
    },

    goals() {
      return this.hasMany('apdActivityGoal');
    }
  },

  apdActivityGoal: {
    tableName: 'activity_goals',

    activity() {
      return this.belongsTo('apdActivity');
    },

    objectives() {
      return this.hasMany('apdActivityGoalObjective');
    }
  },

  apdActivityGoalObjective: {
    tableName: 'activity_goal_objectives',

    goal() {
      return this.belongsTo('apdActivityGoal');
    }
  }
});
