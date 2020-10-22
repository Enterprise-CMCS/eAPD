const {
  requiresAuth,
  schema: { arrayOf, jsonResponse, errorToken }
} = require('../openAPI/helpers');

const id = {
  type: 'integer',
  description: 'ID of record'
};

const user_id = {
  type: 'string',
  description: 'ID of user'
};

const state_id = {
  type: 'string',
  description: '2-letter US State or Territory abbreviation, lowercase'
};

const role_id = {
  type: 'integer',
  description: 'ID of the role applied to this user for this US State'
};

const status = {
  type: 'string',
  description: 'The status of the user role for this US State',
  enum: ['requested', 'approved', 'denied', 'revoked']
};

const created_at = {
  type: 'string',
  format: 'date-time',
  description: 'Timestamp of record creation'
}

const updated_at = {
  type: 'string',
  format: 'date-time',
  description: 'Timestamp of last update'
}

const updated_by = {
  type: 'string',
  description: 'ID of the user who last updated this record',
};

const stateIdParameter = {
  name: 'stateId',
  in: 'path',
  description: state_id.description,
  required: true,
  schema: {
    type: state_id.type
  }
};

const idParameter = {
  name: 'id',
  in: 'path',
  description: id.description,
  required: true,
  schema: {
    type: id.type
  }
};

const affiliationSchema = {
  type: 'object',
  properties: {
    propertyName: {
      id,
      user_id,
      state_id,
      role_id,
      status,
      created_at,
      updated_at,
      updated_by
    },
  }
};

const tags = ['Affiliations'];

const getAffiliationsRoute = {
  '/states/{stateId}/affiliations': {
    get: {
      tags,
      description: 'Get a list of all user affiliations for a US State',
      responses: {
        200: {
          description: 'List of all user affiliations for a US State',
          content: jsonResponse(arrayOf(affiliationSchema))
        },
        404: {
          description: 'The stateId does not correspond to a known record'
        }
      }
    }
  }
};

const getAffiliation = {
  get: {
    tags,
    description: 'Get a single user affiliation with a US State',
    responses: {
      200: {
        description: 'A single user affiliation with a US State',
        content: jsonResponse(affiliationSchema)
      },
      404: {
        description: 'The stateId and affiliation ID do not correspond to a known record'
      }
    }
  }
};

const postAffiliation = {
  post: {
    tags,
    description: 'Create a request for the currently logged in user to be affiliated with a US State',
    parameters: [stateIdParameter],
    responses: {
      200: {
        description: 'Record was created',
        content: jsonResponse(id)
      },
      404: {
        description: 'Record exists, or US State ID is invalid'
      }
    }
  }
}

const patchAffiliation = {
  patch: {
    tags,
    description: 'Update a user affiliation with a US State',
    parameters: [stateIdParameter, idParameter],
    requestBody: {
      description: '',
      required: true,
      content: jsonResponse({
        type: 'object',
        properties: {
          roleId: role_id,
          status
        }
      })
    },
    responses: {
      200: {
        description: 'Record was updated',
      },
      404: {
        description: 'US State ID and affiliation ID are invalid, role_id is invalid, or status is invalid',
      }
    }
  }
}

const affiliationRoutes = {
  '/states/{stateId}/affiliations/{id}': {
    ...getAffiliation,
    ...postAffiliation,
    ...patchAffiliation
  }
}

module.exports = {
  ...requiresAuth(getAffiliationsRoute),
  ...requiresAuth(affiliationRoutes)
}
