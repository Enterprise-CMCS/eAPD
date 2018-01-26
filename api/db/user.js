const defaultBookshelf = require('bookshelf');
const defaultRoleModel = require('./authorization').roles;

let model;

module.exports = (
  bookshelf = defaultBookshelf,
  RoleModel = defaultRoleModel
) => {
  if (!model) {
    model = bookshelf.Model.extend({
      tableName: 'users',

      role() {
        return this.hasOne(RoleModel(), 'name', 'auth_role');
      },

      async activities() {
        if (!this.relations.role) {
          await this.load('role.activities');
        }

        return this.related('role')
          .related('activities')
          .pluck('name');
      }
    });
  }

  return model;
};
