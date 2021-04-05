module.exports.ERROR_MESSAGES = {
  400: {
    error: 'The server could not process the request'
  },
  401: {
    error: 'The user is not logged in'
  },
  403: {
    error: 'The user does not have permission to perform this activity'
  },
  404: {
    error: 'The server could not find the requested resource'
  },
  415: {
    error: 'The media type is not supported by the server'
  },
  422: {
    error: 'The server could not process the request as submitted'
  },
  500: {
    error: 'There was an error on the server'
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

const errorToken = jsonResponse({
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description:
        'An string token indicating the error, which could be translated into a user-readable string for display by the client'
    }
  }
});

module.exports.schema = {
  jsonResponse,
  arrayOf,
  errorToken
};

module.exports.responses = {
  unauthed: {
    401: {
      description: 'The user is not logged in'
    },
    403: {
      description: 'The user does not have permission to perform this activity'
    }
  }
};

module.exports.requiresAuth = (
  openAPI,
  { has401 = true, has403 = true } = {}
) => {
  const authed = { ...openAPI };
  Object.keys(authed).forEach(route => {
    Object.keys(authed[route]).forEach(verb => {
      if (has401) {
        authed[route][verb].security = [{ bearerAuth: [] }];
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
