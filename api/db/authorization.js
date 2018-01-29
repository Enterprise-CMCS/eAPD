module.exports = {
  activity: {
    tableName: 'auth_activities',
    roles() {
      return this.belongsToMany(
        'role',
        'auth_role_activity_mapping',
        'activity_id',
        'role_id'
      );
    }
  },

  role: {
    tableName: 'auth_roles',
    activities() {
      return this.belongsToMany(
        'activity',
        'auth_role_activity_mapping',
        'role_id',
        'activity_id'
      );
    }
  }
};
