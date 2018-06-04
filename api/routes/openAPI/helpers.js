module.exports.responses = {
  unauthed: {
    401: {
      description: 'Does not have permission to this activity'
    },
    403: {
      description: 'Not logged in'
    }
  }
};

const jsonResponse = schema => ({
  'application/json': {
    schema
  }
});

const arrayOf = schema => ({
  type: 'array',
  items: schema
});

module.exports.schema = {
  jsonResponse,
  arrayOf,

  errorToken: jsonResponse({
    type: 'object',
    properties: {
      error: {
        type: 'string',
        description:
          'An string token indicating the error, which could be translated into a user-readable string for display by the client'
      }
    }
  })
};

module.exports.requiresAuth = (
  openAPI,
  { has401 = true, has403 = true } = {}
) => {
  const authed = { ...openAPI };
  Object.keys(authed).forEach(route => {
    Object.keys(authed[route]).forEach(verb => {
      if (has403) {
        authed[route][verb].security = [{ sessionCookie: [] }];
      }

      const authResponses = { ...module.exports.responses.unauthed };
      if (!has401) {
        authResponses[401] = undefined;
      }
      if (!has403) {
        authResponses[403] = undefined;
      }

      const responses = authed[route][verb].responses;
      authed[route][verb].responses = {
        ...authResponses,
        ...responses
      };
    });
  });

  return authed;
};
