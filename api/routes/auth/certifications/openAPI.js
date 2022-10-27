const { requiresAuth } = require('../../openAPI/helpers');

const stateCertifications = {
  '/auth/certifications': {
    get: {
      tags: ['Certifications'],
      summary: 'Retrieve the Add State Certifications and additional details',
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
          description:
            'The user does not have sufficient authorization to upload certification letters'
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
                  description:
                    'Federal Fiscal Year (FFY) that the certification is valid for'
                },
                name: {
                  type: 'string',
                  description: 'Name of individual being certified'
                },
                email: {
                  type: 'string',
                  description: 'Email of individual being certified'
                },
                state: {
                  type: 'string',
                  description: 'State of individual being certified'
                },
                fileUrl: {
                  type: 'string',
                  description:
                    'URL provided from the /certifications/files endpoint'
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
          description:
            'The user does not have sufficient authorization to upload certification letters'
        }
      }
    },
    put: {
      tags: ['Certifications'],
      summary: 'Match a state admin certification letter to an affiliation',
      description:
        'update a state admin certification to associate it with an affiliation and approve that affiliation as a state admin',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                certificationId: {
                  type: 'string',
                  description: 'ID of the certification letter'
                },
                certificationFfy: {
                  type: 'string',
                  description:
                    'Federal Fiscal Year (FFY) from the certification upload form'
                },
                affiliationId: {
                  type: 'string',
                  description: 'ID of the affiliation to be matched'
                },
                stateId: {
                  type: 'string',
                  description: 'ID of the state associated with the affiliation'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'State Admin Certification match successful'
        },
        400: {
          description: 'Invalid request'
        },
        401: {
          description: 'Unauthorized'
        },
        403: {
          description:
            'The user does not have sufficient authorization to match certification letters'
        }
      }
    },
    delete: {
      tags: ['Certifications'],
      summary:
        'Archives a previously uploaded state admin certification letter.',
      description:
        'Archives a previously uploaded state admin certification letter. Only non-matched letters can be archived/deleted.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                certificationId: {
                  type: 'string',
                  description: 'ID of the certification letter'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'State Admin Certification archived successfully'
        },
        400: {
          description: 'Invalid request'
        },
        401: {
          description: 'Unauthorized'
        },
        403: {
          description:
            'The user does not have sufficient authorization to archive certification letters'
        }
      }
    }
  }
};

module.exports = {
  ...requiresAuth(stateCertifications)
};
