module.exports = {
  apdActivityGoalObjective: {
    tableName: 'activity_goal_objectives',

    goal() {
      return this.belongsTo('apdActivityGoal');
    },

    toJSON() {
      return this.get('description');
    },

    static: {
      updateableFields: ['description']
    }
  }
};
