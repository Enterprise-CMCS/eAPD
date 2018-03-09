module.exports = () => ({
  apd: {
    tableName: 'apds',

    state() {
      return this.belongsTo('state');
    }
  }
});
