module.exports = () => ({
  activity: {
    tableName: 'activities',

    apd() {
      return this.hasOne('apd', 'id', 'apd_id');
    }
  }
});
