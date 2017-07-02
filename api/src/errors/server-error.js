exports = module.exports = ServerErrorFactory;
exports['@require'] = [__dirname+'/error'];
function ServerErrorFactory(Error) {
  return ServerError.extend(Error, '', 500);

  function ServerError(what) {
    this.setMessage(what);
  }
}
