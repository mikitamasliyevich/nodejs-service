const HTTP_STATUS_CODES = {
    OK: 200,
    CREATE: 201,
    NOT_FOUND: 404,
    NOT_VALID: 401,
    BAD_REQUEST: 400,
    DELETE: 204,
  };

  const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };


  module.exports = {
    HTTP_STATUS_CODES,
    DEFAULT_HEADERS,
  };