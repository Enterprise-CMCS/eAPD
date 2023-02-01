import { requiresAuth, jsonResponse } from '../../../openAPI/helpers.js';

const getStateCertificationFile = {
  '/auth/certifications/files/{fileID}': {
    get: {
      tags: ['files'],
      summary: 'Get a state admin certification letter',
      description: 'Returns a state admin certification letter',
      parameters: [
        {
          name: 'fileID',
          in: 'path',
          description: 'The ID of the file to get',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      responses: {
        200: {
          description: 'The file',
          content: { '*/*': { schema: { type: 'string', format: 'binary' } } }
        },
        400: {
          description: 'The file does not exist'
        }
      }
    }
  }
};

const postStateCertificationFile = {
  '/auth/certifications/files': {
    post: {
      tags: ['files'],
      summary: 'Upload a state admin certification file',
      description: 'Uploads a state admin certification letter.',
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                file: {
                  type: 'string',
                  format: 'binary',
                  description: 'The file body'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description:
            'The URL of the uploaded file, absolute, relative to the API host',
          content: jsonResponse({
            type: 'object',
            properties: {
              url: {
                type: 'string',
                description:
                  'The URL of the uploaded file, absolute, relative to the API host'
              }
            }
          })
        },
        400: {
          description: 'Invalid request'
        },
        403: {
          description:
            'The user does not have sufficient authorization to upload certification letters'
        },
        415: {
          description: 'The file is not a valid format'
        }
      }
    }
  }
};

export default {
  ...requiresAuth(getStateCertificationFile),
  ...requiresAuth(postStateCertificationFile)
};
