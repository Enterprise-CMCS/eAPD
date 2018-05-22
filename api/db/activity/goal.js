module.exports = {
  apdActivityGoal: {
    tableName: 'activity_goals',

    activity() {
      return this.belongsTo('apdActivity');
    },

    async validate() {
      if (!this.attributes.description) {
        throw new Error('invalid-goals');
      }
    },

    toJSON() {
      return {
        id: this.get('id'),
        description: this.get('description'),
        objective: this.get('objective')
      };
    },

    static: {
      updateableFields: ['description', 'objective'],
      foreignKey: 'activity_goal_id'
    }
  }
};
