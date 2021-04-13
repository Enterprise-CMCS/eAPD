const getAccountRegistrationDoc = {
  '/docs/account-registration': {
    get: {
      tags: ['Docs'],
      description: 'Get the account registration documentation',
      responses: {
        200: {
          description: 'The file',
          content: {
            'application/pdf': { schema: { type: 'string', format: 'pdf' } }
          }
        }
      }
    }
  }
};

const getSystemAccessDoc = {
  '/docs/system-access': {
    get: {
      tags: ['Docs'],
      description: 'Get the eAPD system access documentation',
      responses: {
        200: {
          description: 'The file',
          content: {
            'application/pdf': { schema: { type: 'string', format: 'pdf' } }
          }
        }
      }
    }
  }
};

module.exports = {
  ...getAccountRegistrationDoc,
  ...getSystemAccessDoc
};
