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
        id: this.get('id'),
        key: this.get('key'),
        size: this.get('size'),
        metadata: this.get('metadata')
      };
    }
  }
});
