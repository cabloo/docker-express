exports = module.exports = FileSystem;
exports['@require'] = ['fs', 'q', 'readline'];
function FileSystem(orig, Q, LineReader) {
  var fs = {};

  fs.get = get;
  fs.makeDirectory = makeDirectory;
  fs.exists = exists;

  return fs;

  function makeDirectory(path) {
    return fs
      .get(path)
      .makeDirectory()
    ;
  }

  function exists(path) {
    return fs
      .get(path)
      .exists()
    ;
  }

  function get(path) {
    return new File(path, orig, Q, LineReader);
  }
}

function File(path, fs, Q, LineReader) {
  var file = this;

  file.write = write;
  file.exists = exists;
  file.append = append;
  file.unlink = unlink;
  file.replace = replace;
  file.truncate = truncate;
  file.eachLine = eachLine;
  file.contents = contents;
  file.makeDirectory = makeDirectory;

  return file;

  function makeDirectory() {
    return file
      .exists()
      .then(function (exists) {
        if (exists) {
          return file;
        }

        var deferred = Q.defer();

        fs.mkdir(path, callback);

        return deferred.promise;

        function callback(error) {
          if (error) {
            return deferred.reject(error);
          }

          deferred.resolve(file);
        }
      })
      ;
  }

  function exists() {
    var deferred = Q.defer();

    fs.access(path, fs.constants.F_OK, callback);

    return deferred.promise;

    function callback(error) {
      deferred.resolve(!error);
    }
  }

  function write(contents) {
    var deferred = Q.defer();

    fs.writeFile(path, contents, callback);

    return deferred.promise;

    function callback(error) {
      if (error) {
        return deferred.reject(error);
      }

      deferred.resolve(file);
    }
  }

  function unlink() {
    var deferred = Q.defer();

    fs.unlink(path, function (error) {
      if (error) {
        deferred.reject(error);
      }

      deferred.resolve(file);
    });

    return deferred.promise;
  }

  function append(contents) {
    var deferred = Q.defer();

    fs.appendFile(path, contents, callback);

    return deferred.promise;

    function callback(error) {
      if (error) {
        return deferred.reject(error);
      }

      deferred.resolve(file);
    }
  }

  function replace(search, replace) {
    return file
      .contents()
      .then(function (contents) {
        return file.write(contents.replace(search, replace));
      })
    ;
  }
  function contents() {
    var deferred = Q.defer();

    fs.readFile(path, 'utf8', function (error, data) {
      if (error) {
        return deferred.reject(error);
      }

      deferred.resolve(data);
    });

    return deferred.promise;
  }

  function truncate(length) {
    var deferred = Q.defer();

    fs.truncate(path, length, callback);

    return deferred.promise;

    function callback(error) {
      if (error) {
        return deferred.reject(error);
      }

      deferred.resolve(file);
    }
  }

  function eachLine(handleLine) {
    var deferred = Q.defer();
    var interface = {
      input: fs.createReadStream(path),
      terminal: false
    };

    LineReader
      .createInterface(interface)
      .on('line', handleLine)
      .on('close', handleEnd);

    return deferred.promise;

    function handleEnd() {
      deferred.resolve(file);
    }
  }
}
