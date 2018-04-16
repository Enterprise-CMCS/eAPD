module.exports = {
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
        id: this.get('id'),
        description: this.get('description'),
        objectives: this.related('objectives')
      };
    },

    static: {
      updateableFields: ['description'],
      owns: { objectives: 'apdActivityGoalObjective' },
      foreignKey: 'activity_goal_id'
    }
  }
};
