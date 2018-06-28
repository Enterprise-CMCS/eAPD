module.exports = () => ({
  state: {
    tableName: 'states',

    format(attributes) {
      const out = { ...attributes };

      // Stringify.  If undefined, set that instead.  These
      // must be set to something or else bookshelf will throw
      out.medicaid_office = JSON.stringify(out.medicaid_office);
      out.state_pocs = JSON.stringify(out.state_pocs);

      return out;
    },

    apds() {
      return this.hasMany('apd');
    }
  }
});
