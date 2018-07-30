const { requiresAuth } = require('../openAPI/helpers');

const openAPI = {
  '/files/{id}': {
    get: {
      tags: ['Files'],
      summary: `Downloads a file`,
      description: `Downloads the specified file if it exists and the user has permission`,
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the file to download',
          required: true,
          schema: {
            type: 'integer'
          }
        }
      ],
      responses: {
        200: {
          description: 'The file',
          content: {
            '*/*': {
              schema: {
                type: 'string',
                format: 'binary'
              }
            }
          }
        },
        400: {
          description: 'The provided file ID was invalid'
        },
        404: {
          description:
            'The file ID does not match any known files, or the file does not exist in storage'
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI, { has401: false });
