exports = module.exports = errorFactory;

function errorFactory() {
  return ApiError;

  function ApiError(message, code, data) {
    this.code = code;
    this.data = data || null;
    this.message = message;

    this.setMessage = function (message) {
      this.message = message;

      return this;
    };
  }
}
