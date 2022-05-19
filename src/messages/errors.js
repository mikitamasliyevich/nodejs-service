const { HTTP_STATUS_CODES, DEFAULT_HEADERS } = require('../utils/constansts');


function invalidToken(res) {
    res.writeHead(HTTP_STATUS_CODES.NOT_VALID, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: 'Access token is missing or invalid' }));
  }

  function notFound(res) {
    res.writeHead(HTTP_STATUS_CODES.NOT_FOUND, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: 'Not found' }));
  }

  function badRequest(res){
    res.writeHead(HTTP_STATUS_CODES.BAD_REQUEST, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: 'Bad request' }));
  }

  module.exports = {
    invalidToken, notFound, badRequest
  }