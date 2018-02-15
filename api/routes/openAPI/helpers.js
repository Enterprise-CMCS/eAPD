module.exports.responses = {
  unauthed: {
    401: {
      description: 'Not logged in'
    },
    403: {
      description: 'Does not have permission to this activity'
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

module.exports.requiresAuth = openAPI => {
  const authed = { ...openAPI };
  Object.keys(authed).forEach(route => {
    Object.keys(authed[route]).forEach(verb => {
      authed[route][verb].security = ['sessionCookie'];

      const responses = authed[route][verb].responses;
      authed[route][verb].responses = {
        ...responses,
        ...module.exports.responses.unauthed
      };
    });
  });

  return authed;
};
