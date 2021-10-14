---
to: api/routes/<%= httpPath %>/<%= httpVerb %>OpenApi.js
---
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

const <%= httpVerb %><%= h.changeCase.pascalCase(httpPath.replace('/', ' ')) %> = {
  '/<%= httpPath %>': {
    <%= httpVerb%>: {
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

module.exports = requiresAuth(<%= httpVerb %><%= h.changeCase.pascalCase(httpPath.replace('/', ' ')) %>);
