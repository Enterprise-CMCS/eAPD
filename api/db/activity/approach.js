module.exports = {
  apdActivityApproach: {
    tableName: 'activity_approaches',

    activity() {
      return this.belongsTo('apdActivity');
    },

    async validate() {
      if (
        !this.attributes.description &&
        !this.attributes.alternatives &&
        !this.attributes.explanation
      ) {
        throw new Error('invalid-approaches');
      }
    },

    toJSON() {
      return {
        id: this.get('id'),
        description: this.get('description'),
        alternatives: this.get('alternatives'),
        explanation: this.get('explanation')
      };
    },

    static: {
      updateableFields: ['description', 'alternatives', 'explanation']
    }
  }
};
