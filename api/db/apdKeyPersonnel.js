module.exports = () => ({
  apdKeyPersonnel: {
    tableName: 'apd_key_personnel',

    apd() {
      return this.belongsTo('apd');
    },

    years() {
      return this.hasMany('apdKeyPersonnelYear', 'apd_key_personnel_id');
    },

    toJSON() {
      return {
        id: this.get('id'),
        title: this.get('title'),
        description: this.get('description'),
        years: this.related('years')
      };
    },

    static: {
      updateableFields: ['title', 'description'],
      owns: { years: 'apdKeyPersonnelYear' },
      foreignKey: 'apd_key_personnel_id'
    }
  },

  apdKeyPersonnelYear: {
    tableName: 'apd_key_personnel_years',

    personnel() {
      return this.belongsTo('apdKeyPersonnel', 'apd_key_personnel_id');
    },

    async validate() {
      if (this.attributes.fte < 0 || this.attributes.fte > 1) {
        throw new Error('fte-out-of-range');
      }
      if (this.attributes.year < 2010 || this.attributes.year > 3000) {
        throw new Error('year-out-of-range');
      }
    },

    toJSON() {
      return {
        id: this.get('id'),
        cost: this.get('cost'),
        fte: this.get('fte'),
        year: this.get('year')
      };
    },

    static: {
      updateableFields: ['year', 'cost', 'fte']
    }
  }
});
