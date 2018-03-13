module.exports = () => ({
  apd: {
    tableName: 'apds',

    activities() {
      return this.hasMany('apdActivity');
    },

    state() {
      return this.belongsTo('state');
    }
  }
});
