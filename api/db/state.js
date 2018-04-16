module.exports = () => ({
  state: {
    tableName: 'states',

    apds() {
      return this.hasMany('apd');
    }
  }
});
