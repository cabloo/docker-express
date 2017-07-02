exports = module.exports = Template;
exports['@literal'] = true;
function Template(template, hogan, Q, fs) {
  var compiled;

  this.path = path;
  this.compile = compile;
  this.render = render;

  ///////////

  /**
   * @param  {Object} data
   *
   * @return {q}
   */
  function render(data) {
    return compile().then(doRender);

    function doRender(compiled) {
      return compiled.render(data);
    }
  }

  function compile() {
    if (compiled) {
      return Q.when(compiled);
    }

    return fs
      .get(path())
      .contents()
      .then(compileTemplate)
      .then(storeCompiledTemplate);

    function compileTemplate(contents) {
      return hogan.compile(contents);
    }

    function storeCompiledTemplate(storeCompiled) {
      compiled = storeCompiled;

      return compiled;
    }
  }

  function path() {
    return template;
  }
}
