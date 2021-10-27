const {
  requiresAuth,
} = require('../../openAPI/helpers');



const postStateCertification = {
  '/auth/certifications': {
    get: {
      tags: ['Certifications'],
      summary: 'retrieve the Add State Certifications and additional details',
      description:
        'get the state admin certifications and potential matches for loading up the state admin certification table',
      responses: {
        200: {
          description: 'State Admin Certification form successfully saved'
        },
        401: {
          description: 'Unauthorized'
        },
        403: {
          description: 'The user does not have sufficient authorization to upload certification letters'
        }
      }
    },
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
  ...requiresAuth(postStateCertification)
};
