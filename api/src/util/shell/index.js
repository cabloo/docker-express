exports = module.exports = ExampleService;
exports['@require'] = [
  'child_process',
  'q',
];

function ExampleService(childProcess, Q) {
  var shell = this;

  shell.run = run;
  shell.sendStdIn = sendStdIn;

  function run(command) {
    return sendStdIn("/bin/bash", [], command);
  }

  function sendStdIn(cmd, args, stdin) {
    var deferred = Q.defer();
    var restart = childProcess.spawn(cmd, args);
    var errors = '';
    var output = '';

    restart.stdout.on('data', debug);
    restart.stderr.on('data', error);
    restart.on('exit', handleExit);
    restart.stdin.end(stdin);

    return deferred.promise;

    function handleExit(code) {
      if (code === 0) {
        deferred.resolve(output);

        return;
      }

      deferred.reject({
        code: code,
        error: errors,
        output: output,
      });
    }

    function debug(data) {
      output += data;
    }

    function error(data) {
      errors += data;
    }
  }
}
