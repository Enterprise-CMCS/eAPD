const defaultBookshelf = require('bookshelf');

let activitiesModel;
let rolesModel;

module.exports = (bookshelf = defaultBookshelf) => {
  if (!activitiesModel) {
    activitiesModel = bookshelf.Model.extend({
      tableName: 'auth_activities',
      roles() {
        return this.belongsToMany(
          rolesModel,
          'auth_role_activity_mapping',
          'activity_id',
          'role_id'
        );
      }
    });
  }

  if (!rolesModel) {
    rolesModel = bookshelf.Model.extend({
      tableName: 'auth_roles',
      activities() {
        return this.belongsToMany(
          activitiesModel,
          'auth_role_activity_mapping',
          'role_id',
          'activity_id'
        );
      }
    });
  }

  return { activities: activitiesModel, roles: rolesModel };
};
