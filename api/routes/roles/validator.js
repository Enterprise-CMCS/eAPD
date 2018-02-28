const validateRole = async (role, RoleModel, ActivityModel) => {
  if (RoleModel) {
    if (!role.name) {
      throw new Error('Role must have a name');
    }
    if (await RoleModel.where({ name: role.name }).fetch()) {
      throw new Error(`Role name "${role.name}" already exists`);
    }
  }
  if (ActivityModel) {
    if (!Array.isArray(role.activities)) {
      throw new Error('Role must have a list of activities');
    }
    if (role.activities.filter(id => typeof id !== 'number').length > 0) {
      throw new Error('Role activites must be numbers');
    }

    const validActivities = await ActivityModel.where(
      'id',
      'in',
      role.activities
    ).fetchAll({ columns: ['id'] });
    const validIDs = validActivities.map(activity => activity.get('id'));
    const invalidIDs = role.activities.filter(
      roleID => !validIDs.includes(roleID)
    );

    if (invalidIDs.length) {
      throw new Error(
        `Activity IDs ${JSON.stringify(invalidIDs).replace(
          /\[(.+)\]/,
          '$1'
        )} are invalid`
      );
    }
  }

  return {
    name: role.name,
    activities: role.activities.filter(id => !Number.isNaN(Number(id)))
  };
};

module.exports = validateRole;
