exports = module.exports = responseMacrosFactory;
exports['@require'] = [];

function responseMacrosFactory() {
  return responseMacrosMiddleware;

  function responseMacrosMiddleware (req, res, next) {
    res.success = success;
    res.error = error;
    res.api = api;

    next();

    function success(message, data, code) {
      code = parseInt(code) || 200;

      res.api(data, code, [
        new Message('success', message)
      ]);
    }

    function error(message, data, code, stack) {
      code = parseInt(code) || 400;

      res.api(data, code, [
        new Message('error', message)
      ], stack);
    }

    function api(data, code, messages, errorStack) {
      res.status(code).json({
        code: parseInt(code) || 200,
        data: data || null,
        error: !!errorStack,
        messages: messages || [],
        stack: errorStack,
      });
    }
  }

  /**
   * TODO: Inject message factory
   */
  function Message(type, text) {
    this.type = type;
    this.text = text;
  }
}
