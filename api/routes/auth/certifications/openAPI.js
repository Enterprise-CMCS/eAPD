const {
  requiresAuth,
  schema: { arrayOf, jsonResponse }
} = require('../../openAPI/helpers');

const openAPI = {
  '/auth/certificates': {
    post: {
      tags: ['Certificates', 'State Admins', 'files'],
      summary: 'Upload a state admin certification file',
      description:
        'Uploads a certification file that authorizes a user to be granted the state admin role.',
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                metadata: {
                  type: 'object',
                  description: 'arbitrary metadata to attach to the file'
                },
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
          description:
            'Invalid request'
        },
        403: {
          description: 'The user does not have sufficient authorization to upload data'
        },
        415: {
          description: 'The file is not a valid format'
        }
      }
    }
  }
};

module.exports = {
  ...requiresAuth(openAPI)
};
