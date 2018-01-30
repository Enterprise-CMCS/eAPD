module.exports = {
  user: {
    tableName: 'users',

    role() {
      return this.hasOne('role', 'name', 'auth_role');
    },

    async activities() {
      if (!this.relations.role) {
        await this.load('role.activities');
      }

      return this.related('role')
        .related('activities')
        .pluck('name');
    }
  }
};
