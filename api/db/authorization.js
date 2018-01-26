const defaultBookshelf = require('bookshelf');

let activitiesModel;
let rolesModel;

const activitiesModelDefinition = {
  tableName: 'auth_activities',
  roles() {
    return this.belongsToMany(
      rolesModel,
      'auth_role_activity_mapping',
      'activity_id',
      'role_id'
    );
  }
};

const rolesModelDefinition = {
  tableName: 'auth_roles',
  activities() {
    return this.belongsToMany(
      activitiesModel,
      'auth_role_activity_mapping',
      'role_id',
      'activity_id'
    );
  }
};

module.exports = (bookshelf = defaultBookshelf) => {
  if (!activitiesModel) {
    activitiesModel = bookshelf.Model.extend(activitiesModelDefinition);
  }

  if (!rolesModel) {
    rolesModel = bookshelf.Model.extend(rolesModelDefinition);
  }

  return { activities: activitiesModel, roles: rolesModel };
};
