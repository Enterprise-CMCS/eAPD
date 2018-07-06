// Federal and state shares of expenses.  In each
// child array, the first element is the federal
// share and the second element is the state share.
const shareDistributions = [[90, 10], [75, 25], [50, 50]];

const getDBValues = (model, attr, shares = [['', '']]) =>
  shares.reduce(
    (acc, [fed, state]) => ({
      ...acc,
      [`federal${fed}Actual`]: +model.get(`${attr}_federal${fed}_actual`),
      [`federal${fed}Approved`]: +model.get(`${attr}_federal${fed}_approved`),
      [`state${state}Actual`]: +model.get(`${attr}_state${state}_actual`),
      [`state${state}Approved`]: +model.get(`${attr}_state${state}_approved`)
    }),
    {}
  );

const getAttrValues = (attributes, attr, shares = [['', '']]) =>
  attributes[attr]
    ? shares.reduce(
        (acc, [fed, state]) => ({
          ...acc,
          [`${attr}_federal${fed}_actual`]:
            attributes[attr][`federal${fed}Actual`] || 0,
          [`${attr}_federal${fed}_approved`]:
            attributes[attr][`federal${fed}Approved`] || 0,
          [`${attr}_state${state}_actual`]:
            attributes[attr][`state${state}Actual`] || 0,
          [`${attr}_state${state}_approved`]:
            attributes[attr][`state${state}Approved`] || 0
        }),
        {}
      )
    : null;

module.exports = () => ({
  apdPreviousActivityExpense: {
    tableName: 'apd_previous_activity_expenses',

    apd() {
      return this.belongsTo('apd');
    },

    format(attributes) {
      const out = {
        ...getAttrValues(attributes, 'hie'),
        ...getAttrValues(attributes, 'hit'),
        ...getAttrValues(attributes, 'mmis', shareDistributions),
        year: attributes.year,
        apd_id: attributes.apd_id
      };

      return out;
    },

    toJSON() {
      return {
        hie: getDBValues(this, 'hie'),
        hit: getDBValues(this, 'hit'),
        mmis: getDBValues(this, 'mmis', shareDistributions),
        year: `${this.get('year')}`
      };
    },

    static: {
      updateableFields: ['hie', 'hit', 'mmis', 'year']
    }
  }
});
