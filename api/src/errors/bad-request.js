exports = module.exports = BadRequestFactory;
exports['@require'] = [__dirname+'/error'];
function BadRequestFactory(Error) {
  return BadRequest.extend(Error, '', 400);

  function BadRequest(what) {
    this.setMessage(what);
  }
}
