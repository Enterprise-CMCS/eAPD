module.exports = {
  apdActivityExpense: {
    tableName: 'activity_expenses',

    activity() {
      return this.belongsTo('apdActivity');
    },

    entries() {
      return this.hasMany('apdActivityExpenseEntry', 'expense_id');
    },

    toJSON() {
      return {
        id: this.get('id'),
        name: this.get('name'),
        entries: this.related('entries')
      };
    },

    static: {
      updateableFields: ['name'],
      owns: { entries: 'apdActivityExpenseEntry' },
      foreignKey: 'expense_id'
    }
  }
};
