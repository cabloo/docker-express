exports = module.exports = addShims;

function addShims() {
  Function.prototype.extend = function(parent) {
    var child = this;
    var args = Array.prototype.slice.call(arguments, 0);

    child.prototype = parent;
    child.prototype = new (Function.prototype.bind.apply(parent, args))();
    child.prototype.constructor = child;

    var parentProxy = child.prototype.parent = {};

    for (var i in parent) {
      switch(typeof parent[i]) {
      case 'function':
        parentProxy[i] = parent[i].bind(child);
        break;
      default:
        parentProxy[i] = parent[i];
      }
    }

    return this;
  };
}
