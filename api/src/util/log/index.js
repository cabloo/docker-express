exports = module.exports = logFactory;
exports['@require'] = ['src/util/log/log.bole'];
function logFactory(logger) {
  return {
    info: info,
    debug: debug,
    warning: warning,
    error: error
  };

  function info(message) {
    return logger.info(message);
  }

  function debug(message) {
    return logger.debug(message);
  }

  function warning(message) {
    return logger.warning(message);
  }

  function error(message) {
    return logger.error(message);
  }
}
