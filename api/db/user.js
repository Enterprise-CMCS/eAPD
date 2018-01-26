const defaultBookshelf = require('bookshelf');
const defaultAuthModels = require('./authorization');

let model;

module.exports = (
  bookshelf = defaultBookshelf,
  AuthModels = defaultAuthModels
) => {
  if (!model) {
    model = bookshelf.Model.extend({
      tableName: 'users',

      role() {
        return this.hasOne(AuthModels().roles, 'name', 'auth_role');
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
