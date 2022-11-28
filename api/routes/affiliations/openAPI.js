/* eslint-disable camelcase */

import { jsonResponse, arrayOf, responses } from '../openAPI/helpers';

const affiliationSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      description: 'ID of record'
    },
    userId: {
      type: 'string',
      description: 'ID of user'
    },
    displayName: {
      type: 'string',
      description: 'The full name of the user'
    },
    email: {
      type: 'string',
      description: 'The email address of the user'
    },
    stateId: {
      type: 'string',
      description: '2-letter US State or Territory abbreviation, lowercase'
    },
    status: {
      type: 'string',
      description: 'The status of the user role for this US State',
      enum: ['requested', 'approved', 'denied', 'revoked']
    },
    role: {
      type: 'string',
      description: 'The role applied to this user for this US State'
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Timestamp of record creation'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Timestamp of last update'
    }
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

export default affiliationRoutes;
