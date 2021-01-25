const getHelpDoc = {
  '/docs/help': {
    get: {
      tags: ['Docs'],
      description: 'Get the help documentation',
      responses: {
        200: {
          description: 'The file',
          content: {
            'application/pdf': { schema: { type: 'string', format: 'binary' } }
          }
        }
      }
    }
  }
};

module.exports = {
  ...getHelpDoc
};
