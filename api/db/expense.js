module.exports = () => ({
  expense: {
    tableName: 'expenses',

    entries() {
      return this.hasMany('apdActivityExpense');
    }
  }
});
