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
};

const updated_at = {
  type: 'string',
  format: 'date-time',
  description: 'Timestamp of last update'
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
    updated_at
  }
};

const tags = ['Affiliations'];

const getMyAffiliations = {
  get: {
    tags,
    description: 'Get the current affiliations for the logged in user',

    responses: {
      200: {
        description: 'A list of affiliations for the logged in user',
        content: jsonResponse(arrayOf(affiliationSchema))
      },
      401: { ...responses.unauthed[401] }
    },
    security: [{ bearerAuth: [] }]
  }
};

const affiliationRoutes = {
  '/affiliations/me': {
    ...getMyAffiliations
  }
};

module.exports = affiliationRoutes;
