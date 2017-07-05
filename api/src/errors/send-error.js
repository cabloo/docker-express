exports = module.exports = sendErrorFactory;
exports['@require'] = ['app', __dirname+'/error'];

function sendErrorFactory(app, Error) {
  app.use(sendError);

  function sendError(error, req, res, next) {
    // TODO: error instanceof Error
    if (!error.message || !error.code) {
      return res.error(''+error, null, 400, error.stack);
    }

    res.error(error.message, error.data, error.code, error.stack);
  }
}
