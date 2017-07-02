module.exports = loadIoC;

function loadIoC(IoC, app) {
  bindIoCDirs();
  bindInstancesToIoC();
  addIoCHelpers();

  return IoC;

  function bindIoCDirs() {
    IoC.use(IoC.node_modules());
    IoC.use(IoC.dir('./'));
  }

  function bindInstancesToIoC() {
    app['@literal'] = true;
    IoC._registerSpec('app', app, null);
  }

  function addIoCHelpers() {
    IoC.route = IoCRoute;
  }

  function IoCRoute(name) {
    return IoC.create(name);
    /*var t = function (req, res, next) {
      process(IoC.create(name), req, res, next);
    };*/
  }

  function process() {

  }
}
