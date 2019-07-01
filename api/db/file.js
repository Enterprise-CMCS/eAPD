const o = v => (typeof v === 'object' ? v : JSON.parse(v));

module.exports = () => ({
  file: {
    tableName: 'files',

    activities() {
      return this.belongsToMany(
        'apdActivity',
        'activity_files',
        'file_id',
        'activity_id'
      );
    },

    contractors() {
      return this.belongsToMany(
        'apdActivityContractorResource',
        'activity_contractor_files',
        'file_id',
        'activity_contractor_resource_id'
      );
    },

    toJSON() {
      return {
        ...o(this.get('metadata')),
        id: this.get('id'),
        size: this.get('size')
      };
    }
  }
});
