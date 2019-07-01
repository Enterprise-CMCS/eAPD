module.exports = () => ({
  apdVersion: {
    tableName: 'apd_versions',

    apd() {
      return this.belongsTo('apd');
    },

    user() {
      return this.belongsTo('user');
    },

    format: attr => {
      const out = { ...attr };
      if (out.content) {
        out.content = JSON.stringify(out.content);
      }
      return out;
    },

    toJSON() {
      return {
        id: this.get('id'),
        apd: this.get('apd_id'),
        user: this.related('user'),
        timestamp: this.get('timestamp'),
        content: this.get('content')
      };
    },

    static: {
      updateableFields: ['content'],
      withRelated: ['user']
    }
  }
});
