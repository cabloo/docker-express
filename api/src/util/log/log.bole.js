exports = module.exports = boleLogFactory;
exports['@require'] = ['bole'];

function boleLogFactory(bole) {
  var mod = bole('API');

  return new BoleLogger(mod);
}

function BoleLogger(logger) {
  var me = this;

  this.debug = debug;
  this.info = log;
  this.error = error;
  this.warning = warn;

  function log(message) {
    logger.info(message);
  }

  function debug(message) {
    logger.debug(message);
  }

  function warn(message) {
    logger.warn(message);
  }

  function error(message) {
    logger.error(message);
  }
}
