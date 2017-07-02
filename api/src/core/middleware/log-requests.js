exports = module.exports = logRequestsFactory;
exports['@require'] = ['src/util/log'];

function logRequestsFactory(log) {
  return logRequestsMiddleware;

  function logRequestsMiddleware(req, res, next) {
    // req.path changes during request.
    var basePath = req.path;

    res.on('finish', function () {
      logType = res.statusCode >= 400 ? log.warning : log.debug;
      logType(logMessage(req, res, basePath));
    });

    next();
  }

  function logMessage(req, res, basePath) {
    return [
      '<'+req.ip+'>',
      res.statusCode + ':',
      req.protocol.toUpperCase(),
      req.method,
      basePath,
    ].join(' ');
  }
}
