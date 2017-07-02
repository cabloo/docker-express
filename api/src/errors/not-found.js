exports = module.exports = notFoundFactory;
exports['@require'] = [__dirname+'/error'];
function notFoundFactory(Error) {
  return notFound.extend(Error, '', 404);

  function notFound(what) {
    this.setMessage(what + ' Not Found');
  }
}
