const { requiresAuth } = require('../openAPI/helpers');
const { jsonResponse } = require('../openAPI/helpers').schema;

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
  },
  '/files/contractor/{id}': {
    post: {
      tags: ['Files'],
      summary: 'Upload a file',
      description:
        'Uploads a file and attaches it to a contractor resource, if the user has permission to modify the APD the contractor is attached to',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description:
            'The ID of the contractor resource to attach this file to',
          required: true,
          schema: {
            type: 'integer'
          }
        }
      ],
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              properties: {
                file: {
                  type: 'string',
                  format: 'binary',
                  description: 'The file being uploaded'
                },
                metadata: {
                  type: 'string',
                  description:
                    'The metadata to attach to this file. Must be stringified-JSON.'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'The file metadata stored in the database',
          content: jsonResponse({ $ref: '#/components/schemas/file' })
        }
      }
    }
  },
  '/files/contractor/{id}/{fileID}': {
    delete: {
      tags: ['Files'],
      summary: 'Delete a file',
      description:
        'Deletes a file associated with a contractor resource, if the user has permission to modify the APD the contractor is attached to',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description:
            'The ID of the contractor resource to delete this file from',
          required: true,
          schema: {
            type: 'integer'
          }
        },
        {
          name: 'fileID',
          in: 'path',
          description: 'The ID of the file to delete',
          required: true,
          schema: {
            type: 'integer'
          }
        }
      ],
      responses: {
        204: {
          description: 'The file is deleted successfully'
        },
        404: {
          description: 'The contractor ID is not found'
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI, { has401: false });
