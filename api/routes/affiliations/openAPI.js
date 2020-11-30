/* eslint-disable camelcase */

const {
  schema: { arrayOf, jsonResponse },
  responses
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
    id,
    user_id,
    state_id,
    role_id,
    status,
    created_at,
    updated_at,
    updated_by
  }
};

const tags = ['Affiliations'];

const getAffiliations = {
  get: {
    tags,
    description: 'Get a list of all user affiliations for a US State',
    parameters: [stateIdParameter],
    responses: {
      200: {
        description: 'List of all user affiliations for a US State',
        content: jsonResponse(arrayOf(affiliationSchema))
      },
      ...responses.unauthed
    },
    security: [{ bearerAuth: [] }]
  }
};

const postAffiliations = {
  post: {
    tags,
    description: 'Create a request for the currently logged in user to be affiliated with a US State',
    parameters: [stateIdParameter],
    responses: {
      201: {
        description: 'Record was created',
        content: jsonResponse(id)
      },
      400: {
        description: 'Record exists, or US State ID is invalid'
      },
      401: responses.unauthed[401]
    },
    security: [{ bearerAuth: [] }]
  }
};

const getAffiliation = {
  get: {
    tags,
    description: 'Get a single user affiliation with a US State',
    parameters: [stateIdParameter, idParameter],
    responses: {
      200: {
        description: 'A single user affiliation with a US State',
        content: jsonResponse(affiliationSchema)
      },
      400: {
        description: 'The stateId and affiliation ID do not correspond to a known record'
      },
      ...responses.unauthed
    },
    security: [{ bearerAuth: [] }]
  }
};


const patchAffiliation = {
  patch: {
    tags,
    description: 'Update a user affiliation with a US State',
    parameters: [stateIdParameter, idParameter],
    requestBody: {
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
      400: {
        description: 'US State ID and affiliation ID are invalid, roleId is invalid, or status is invalid',
      },
      ...responses.unauthed
    },
    security: [{ bearerAuth: [] }]
  }
};

const affiliationRoutes = {
  '/states/{stateId}/affiliations': {
    ...getAffiliations,
    ...postAffiliations
  },
  '/states/{stateId}/affiliations/{id}': {
    ...getAffiliation,
    ...patchAffiliation
  },
};

module.exports = affiliationRoutes;
