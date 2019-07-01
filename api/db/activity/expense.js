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
        description: this.get('description'),
        category: this.get('category'),
        entries: this.related('entries')
      };
    },

    static: {
      updateableFields: ['category', 'description'],
      owns: { entries: 'apdActivityExpenseEntry' },
      foreignKey: 'expense_id'
    }
  }
};
