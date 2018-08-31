module.exports = () => ({
  apdKeyPersonnel: {
    tableName: 'apd_key_personnel',

    apd() {
      return this.belongsTo('apd');
    },

    years() {
      return this.hasMany('apdKeyPersonnelYearly');
    },

    format(attrs) {
      const out = {
        id: attrs.id,
        name: attrs.name,
        position: attrs.position,
        email: attrs.email,
        is_primary: attrs.isPrimary,
        percent_time: attrs.percentTime,
        apd_id: attrs.apd_id
      };
      return out;
    },

    toJSON() {
      return {
        id: this.get('id'),
        name: this.get('name'),
        position: this.get('position'),
        email: this.get('email'),
        isPrimary: this.get('is_primary'),
        percentTime: this.get('percent_time'),
        hasCosts: this.related('years').length > 0,
        costs: this.related('years').toJSON()
      };
    },

    static: {
      updateableFields: [
        'email',
        'isPrimary',
        'name',
        'percentTime',
        'position'
      ],
      foreignKey: 'apd_key_personnel_id',
      owns: { costs: 'apdKeyPersonnelYearly' }
    }
  },
  apdKeyPersonnelYearly: {
    tableName: 'apd_key_personnel_yearly',

    personnel() {
      return this.belongsTo('apdKeyPersonnel');
    },

    toJSON() {
      return {
        cost: this.get('cost'),
        year: this.get('year')
      };
    },

    static: {
      updateableFields: ['year', 'cost']
    }
  }
});
