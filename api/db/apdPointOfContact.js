module.exports = () => ({
  apdPointOfContact: {
    tableName: 'apd_points_of_contact',

    apd() {
      return this.belongsTo('apd');
    },

    toJSON() {
      return {
        id: this.get('id'),
        name: this.get('name'),
        position: this.get('position'),
        email: this.get('email')
      };
    },

    static: {
      updateableFields: ['name', 'position', 'email']
    }
  }
});
