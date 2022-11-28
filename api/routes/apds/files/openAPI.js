import { requiresAuth, jsonResponse } from '../../openAPI/helpers';

const openAPI = {
  '/apds/{id}/files': {
    post: {
      tags: ['APDs', 'files'],
      summary: 'Upload a file associated with an APD',
      description:
        'Uploads a file, associates it with a given APD, and stores any provided metadata.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the apd the file is associated with',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
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
            'Invalid request, such as requesting to archive an APD that is not editable'
        },
        403: {
          description: 'The apd ID does not match any known apds for the user'
        },
        404: {
          description: 'The apd ID does not match any known apds'
        },
        415: {
          description: 'The file is not a valid format'
        }
      }
    }
  }
};

const getApdFile = {
  '/apds/{id}/files/{fileID}': {
    get: {
      tags: ['APDs', 'files'],
      summary: 'Get a file associated with an APD',
      description:
        'Returns a file that is associated with a given APD. This method returns a data blob with no information about the contents (such as the content-type); it is the responsibility of the consumer to understand the context of the file.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the apd the file is associated with',
          required: true,
          schema: {
            type: 'number'
          }
        },
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
          description: 'The file does not belong to the APD or does not exist'
        }
      }
    }
  }
};

export default {
  ...requiresAuth(openAPI),
  ...requiresAuth(getApdFile)
};
