exports = module.exports = throwNotFoundFactory;
exports['@require'] = ['app', __dirname+'/not-found'];
function throwNotFoundFactory(app, NotFound) {
  app.use(throwNotFound);

  function throwNotFound (req, res, next) {
    next(new NotFound('Page'));
  }
}
