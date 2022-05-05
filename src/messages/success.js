const { HTTP_STATUS_CODES, DEFAULT_HEADERS } = require('../utils/constansts');


function successfulCreated(res) {
    res.writeHead(HTTP_STATUS_CODES.CREATE, DEFAULT_HEADERS);
  }

  function successfulOperation(res) {
    res.writeHead(HTTP_STATUS_CODES.OK, DEFAULT_HEADERS);
  }

  function successfulDeleted(res) {
    res.writeHead(HTTP_STATUS_CODES.DELETE, DEFAULT_HEADERS);
  }

  module.exports = {
    successfulOperation, successfulCreated, successfulDeleted
  }