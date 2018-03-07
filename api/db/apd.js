module.exports = () => ({
  apd: {
    tableName: 'apds',

    state() {
      return this.hasOne('state', 'id', 'state_id');
    }
  }
});
