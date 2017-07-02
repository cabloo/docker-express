exports = module.exports = FileSystem;
exports['@require'] = ['fs', 'q', 'readline'];
function FileSystem(fs, Q, LineReader) {
  return {
    get: get
  };

  function get(path) {
    return new File(path, fs, Q, LineReader);
  }
}

function File(path, fs, Q, LineReader) {
  var me = this;

  this.append = append;
  this.unlink = unlink;
  this.truncate = truncate;
  this.eachLine = eachLine;
  this.contents = contents;

  return this;

  function unlink() {
    var deferred = Q.defer();

    fs.unlink(path, function (error) {
      if (error) {
        deferred.reject(error);
      }

      deferred.resolve(me);
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

      deferred.resolve(me);
    }
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

      deferred.resolve(me);
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
      deferred.resolve(me);
    }
  }
}
