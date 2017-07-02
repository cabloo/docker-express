exports = module.exports = templateFactory;
exports['@require'] = ['hogan.js', 'q', 'src/util/fs', 'src/util/template/template'];

/**
 * Promise-based template factory using hogan.js
 * @param  {hogan} hogan
 * @param  {q} Q
 * @param  {fs} fs
 * @param  {Template} Template
 * @return {Object}
 */
function templateFactory(hogan, Q, fs, Template) {
  var cache = {};

  return {
    get: get,
    render: render
  };

  function get(path) {
    cache[path] = cache[path] || new Template(path, hogan, Q, fs);

    return cache[path];
  }

  function render(template, data) {
    return get(template).render(data);
  }
}
