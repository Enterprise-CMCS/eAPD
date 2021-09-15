const {
  requiresAuth,
  schema: { jsonResponse }
} = require('../../openAPI/helpers');

const getStateCertificationFile = {
  '/auth/certifications/files/{fileID}': {
    get: {
      tags: ['files'],
      summary: 'Get a state admin certification letter',
      description:
        'Returns a state admin certification letter',
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
      description:
        'Uploads a state admin certification letter.',
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
          description:
            'Invalid request'
        },
        403: {
          description: 'The user does not have sufficient authorization to upload certification letters'
        },
        415: {
          description: 'The file is not a valid format'
        }
      }
    }
  }
};

const postStateCertification = {
  '/auth/certifications': {
    post: {
      tags: ['Certifications'],
      summary: 'Submit the Add State Certification and additional details',
      description:
        'Handle the submission of the state admin certification form which includes the URL of the file from the related /files endpoint as well as additional details that are added manually.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                ffy: {
                  type: 'integer',
                  description: 'Federal Fiscal Year (FFY) that the certification is valid for'
                },
                name: {
                  type: 'string',
                  description: 'Name of individual being certified'
                },
                email: {
                  type: 'string',
                  description: 'Email of individual being certified'
                },
                phone: {
                  type: 'string',
                  description: 'Phone Number of individual being certified'
                },
                state: {
                  type: 'string',
                  description: 'State of individual being certified'
                },
                fileUrl: {
                  type: 'string',
                  description: 'URL provided from the /certifications/files endpoint'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'State Admin Certification form successfully saved'
        },
        400: {
          description: 'Invalid request'
        },
        403: {
          description: 'The user does not have sufficient authorization to upload certification letters'
        }
      }
    }
  }
};

module.exports = {
  ...requiresAuth(getStateCertificationFile),
  ...requiresAuth(postStateCertificationFile),
  ...requiresAuth(postStateCertification)
};
