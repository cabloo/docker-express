var methods = require('methods');
var request = require('supertest');

module.exports = freshAgent;

function freshAgent() {
  emptyRequireCache();

  return generateAgent();
}

function emptyRequireCache() {
  for (var i in require.cache) {
    delete require.cache[i];
  }
}

function generateAgent() {
  var app = require('./app');
  var agent = request.agent(app);

  return new AgentProxy(agent);
}

function AgentProxy(agent) {
  var me = this;

  methods.forEach(bindMethod);

  function bindMethod(method) {
    me[method] = function (url, fn) {
      var req = agent[method](url, fn);

      // Example: add API Key to every request
      //req.query({ key: 'dev' });

      return req;
    };
  }
}
