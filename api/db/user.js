const defaultBookshelf = require('bookshelf');
const AuthRole = require('./authorization').roles;

let model;

module.exports = (bookshelf = defaultBookshelf) => {
  if (!model) {
    model = bookshelf.Model.extend({
      tableName: 'users',

      role() {
        return this.hasOne(AuthRole(), 'name', 'auth_role');
      },

      activities() {
        if (this.relations.role) {
          return Promise.resolve(
            this.related('role')
              .related('activities')
              .pluck('name')
          );
        }
        return this.load('role.activities').then(() =>
          this.related('role')
            .related('activities')
            .pluck('name')
        );
      }
    });
  }

  return model;
};
