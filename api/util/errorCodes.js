const ERRORS = {
  BAD_REQUEST: 'BAD_REQUEST', // 400
  UNAUTHORIZED: 'UNAUTHORIZED', // 401
  FORBIDDEN: 'FORBIDDEN', // 403
  NOT_FOUND: 'NOT_FOUND', // 404
  UNSUPPORTED_MEDIA_TYPE: 'UNSUPPORTED_MEDIA_TYPE', // 415
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY', // 422
  NO_CONNECTION: 'NO_CONNECTION' // 500
};

const CODES = {
  '400': 'The server could not process the request',
  '401': 'The user is not logged in',
  '403': 'The user does not have permission to perform the request',
  '404': 'The server could not find the requested resource',
  '415': 'The media type is not supported by the server',
  '422': 'The server could not process the request as submitted',
  '500': 'There was an error on the server'
};

module.exports = {
  ERRORS,
  CODES
};
