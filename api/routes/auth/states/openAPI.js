import { requiresAuth, jsonResponse } from '../../openAPI/helpers';

const jwtObjectSchema = {
  type: 'object',
  properties: {
    jwt: {
      type: 'string',
      description: 'a JWT'
    }
  }
};

const stateId = {
  type: 'string',
  description: '2-letter US State or Territory abbreviation, lowercase'
};

const openAPI = {
  '/auth/state/{stateId}': {
    get: {
      tags: ['Authentication and authorization'],
      parameters: [
        {
          name: 'stateId',
          in: 'path',
          description: stateId.description,
          required: true,
          schema: {
            type: stateId.type
          }
        }
      ],
      summary: "Exchanges a user's token from one state to another.",
      description:
        'Switch from using one state to another, with updated and accurate permissions.',
      responses: {
        200: {
          description: 'A JWT containing the new claims',
          content: jsonResponse(jwtObjectSchema)
        },
        401: {
          description: 'The user is not logged in'
        },
        403: {
          description: 'The user can not switch to this state'
        }
      }
    }
  }
};

export default requiresAuth(openAPI);
