exports = module.exports = bodyParserFactory;
exports['@require'] = ['body-parser'];

function bodyParserFactory(BodyParser) {
  return BodyParser.json();
}
