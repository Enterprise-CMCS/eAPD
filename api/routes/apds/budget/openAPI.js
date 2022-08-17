const {
  requiresAuth,
  schema: { jsonResponse }
} = require('../../openAPI/helpers');

const responseObj = jsonResponse({
  type: 'object',
  properties: {
    result: {
      type: 'string',
      description: `template generated description`
    },
  }
});

const patchApdsBudget = {
  '/apds/budget': {
    patch: {
      tags: [],
      summary: `Template generated summary`,
      description: `template generated description`,
      responses: {
        200: {
          description: 'response description',
          content: responseObj
        }
      }
    }
  }
};

module.exports = requiresAuth(patchApdsBudget);
