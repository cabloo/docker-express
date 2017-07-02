exports = module.exports = loadMiddleware;
exports['@require'] = [
  'app',
  'src/core/middleware/body-parser',
  'src/core/middleware/log-requests',
  'src/core/middleware/response-macros',
];

function loadMiddleware (app) {
  for (var i = 1; i < arguments.length; i++) {
    app.use(arguments[i]);
  }
}
