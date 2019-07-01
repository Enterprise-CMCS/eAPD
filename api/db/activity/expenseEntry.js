module.exports = {
  apdActivityExpenseEntry: {
    tableName: 'activity_expense_entries',

    expense() {
      return this.belongsTo('apdActivityExpense', 'expense_id');
    },

    toJSON() {
      return {
        id: this.get('id'),
        year: this.get('year'),
        amount: this.get('amount')
      };
    },

    static: {
      updateableFields: ['year', 'amount']
    }
  }
};
