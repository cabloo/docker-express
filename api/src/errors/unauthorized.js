exports = module.exports = unauthorizedFactory;
exports['@require'] = [__dirname+'/error'];
function unauthorizedFactory(Error) {
  return unauthorized.extend(Error, '', 401);

  function unauthorized(message) {
    this.setMessage(message);
  }
}
