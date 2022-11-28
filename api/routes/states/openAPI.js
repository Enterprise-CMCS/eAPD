import { requiresAuth, jsonResponse, arrayOf } from '../openAPI/helpers';

const id = {
  type: 'string',
  description: '2-letter US State or Territory abbreviation, lowercase'
};

const name = {
  type: 'string',
  description: 'Full name of US State or Territory'
};

// eslint-disable-next-line camelcase
const medicaid_office = {
  type: 'object',
  description: 'Contact information for this US State/Territory Medicaid office'
};

const stateSchema = {
  type: 'object',
  properties: {
    id,
    name
  }
};

const fullStateSchema = {
  type: 'object',
  properties: {
    id,
    name,
    // eslint-disable-next-line camelcase
    medicaid_office
  }
};

const getStates = {
  '/states': {
    get: {
      tags: ['States'],
      description: 'Get a list of all US States and Territories',
      responses: {
        200: {
          description: 'List of US States and Territories',
          content: jsonResponse(arrayOf(stateSchema))
        }
      }
    }
  }
};

const getState = {
  '/states/{id}': {
    get: {
      tags: ['States'],
      description: 'Get a single US State or Territiory',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: id.description,
          required: true,
          schema: {
            type: id.type
          }
        }
      ],
      responses: {
        200: {
          description: 'US State or Territory',
          content: jsonResponse(fullStateSchema)
        },
        403: {
          description:
            'Unauthorized, the user does not have permission to access this state.  ' +
            'Switching states may resolve the issue.'
        },
        404: {
          description:
            'The 2-letter, lowercase US State or Territory ID does not match any records'
        }
      }
    }
  }
};

export default {
  ...getStates,
  ...requiresAuth(getState, { has403: false })
};
