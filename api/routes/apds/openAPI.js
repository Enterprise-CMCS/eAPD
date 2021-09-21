const {
  requiresAuth,
  schema: { arrayOf, jsonResponse }
} = require('../openAPI/helpers');

const openAPI = {
  '/apds': {
    get: {
      tags: ['APDs'],
      summary: 'Get all of the APDs available to the user',
      description: 'Get a list of all apds associated with requesting user',
      responses: {
        200: {
          description: 'The list of a user’s apds',
          content: jsonResponse(
            arrayOf({
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  description: 'APD ID'
                },
                created: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Timestamp of when this APD was created'
                },
                status: {
                  type: 'string',
                  description:
                    'Current status of the APD; e.g., "draft", "archived", etc.'
                },
                updated: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Timestamp of the last save to this APD'
                },
                years: arrayOf({
                  type: 'number'
                })
              }
            })
          )
        }
      }
    },
    post: {
      tags: ['APDs'],
      summary: `Create a new draft APD associated with the user's state`,
      description: `Create a new draft APD for the current user's state`,
      responses: {
        200: {
          description: 'The new APD',
          content: jsonResponse({ $ref: '#/components/schemas/apd' })
        }
      }
    }
  },

  '/apds/{id}': {
    get: {
      tags: ['APDs'],
      summary: 'Get a single, complete APD',
      description:
        'Where the /apds GET method only returns a small portion of all APDs, this method returns all of one',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the apd to get',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      responses: {
        200: {
          description: 'The APD',
          content: jsonResponse({ $ref: '#/components/schemas/apd' })
        },
        403: {
          description: 'The apd ID does not match any known apds for the user'
        },
        404: {
          description: 'The apd does not exist'
        }
      }
    },
    patch: {
      tags: ['APDs'],
      summary: 'Update a specific APD',
      description: `Update an APD in the system using a set of JSON Patch objects. If state profile information is included, the profile information is also updated for the APD's state.`,
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the apd to update',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      requestBody: {
        description:
          'A set of JSON Patch objects to be applied to the APD to change it',
        required: true,
        content: jsonResponse(
          arrayOf({
            type: 'object',
            description: 'A JSON Patch object',
            properties: {
              op: {
                type: 'string',
                enum: ['add', 'remove', 'replace'],
                description:
                  'The JSON Patch operation. This API only supports add, remove, and replace.'
              },
              path: {
                type: 'string',
                description:
                  'The path of the value to be operated on, specified as a JSON Pointer'
              },
              value: {
                description:
                  'For add or replace operations, the new value to be applied'
              }
            }
          })
        )
      },
      responses: {
        200: {
          description: 'The update was successful',
          content: jsonResponse({ $ref: '#/components/schemas/apd' })
        },
        400: {
          description: 'The update failed due to a problem with the input data',
          content: jsonResponse({
            oneOf: [
              {
                ...arrayOf({
                  type: 'object',
                  description:
                    'If the requested patch caused a validation failure, the API will return a list of invalid paths',
                  properties: {
                    path: {
                      type: 'string',
                      description:
                        'A JSON Pointer path whose patched value is invalid'
                    }
                  }
                })
              },
              {
                type: 'null',
                description:
                  'If the requested patch failed for unknown reasons, nothing will be returned'
              }
            ]
          })
        },
        403: {
          description: 'The apd ID does not match any known apds for the user'
        },
        404: {
          description: 'The apd does not exist'
        }
      }
    },
    delete: {
      tags: ['APDs'],
      summary: 'Archive an APD',
      description: `Updates an APD's status to "archive" and prevents it from being edited`,
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the apd to archive',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      responses: {
        204: {
          description: 'The APD was archived'
        },
        400: {
          description: 'The apd is not in draft'
        },
        403: {
          description: 'The apd ID does not match any known apds for the user'
        },
        404: {
          description:
            'Invalid request, such as requesting to archive an APD that is not editable'
        }
      }
    }
  },

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
          description: 'The apd does not exist'
        },
        415: {
          description: 'The file is not a valid format'
        }
      }
    }
  },

  '/apds/{id}/events': {
    post: {
      tags: ['APDs', 'events'],
      summary: 'Log an event performed on an APD',
      description:
        'Posts an event, associates it with a given APD, and stores any provided metadata.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the apd the event is associated with',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                eventType: {
                  type: 'string',
                  description: 'the type of the event performed'
                },
                metadata: {
                  type: 'object',
                  description: 'anny additional metadata to add to the log'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'The status of the event being logged',
          content: jsonResponse({
            type: 'object',
            properties: {
              success: {
                type: 'boolean',
                description: 'whether the event was successfully logged'
              }
            }
          })
        },
        403: {
          description: 'The apd ID does not match any known apds for the user'
        },
        404: {
          description: 'The apd ID does not match any known apds'
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

module.exports = {
  ...requiresAuth(openAPI),
  ...requiresAuth(getApdFile)
};
