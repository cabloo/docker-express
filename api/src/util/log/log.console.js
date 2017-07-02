exports = module.exports = consoleLogFactory;

function consoleLogFactory() {
  return new ConsoleLogger(console);
}

function ConsoleLogger(console) {
  var me = this;

  this.debug = debug;
  this.info = log;
  this.error = error;
  this.warning = error;

  function log(message) {
    console.log(message);
  }

  function debug(message) {
    // TODO: if !production
    log(message);
  }

  function error(message) {
    console.error(message);
  }
}
