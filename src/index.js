var babelCore = require('babel-core');
var extend = require('xtend');

function result(value, data) {
  return typeof value === 'function' ? value(data) : value;
}

function babelize(data, options) {
  return _run(data, options);
}

babelize.config = function(options) {
  return function babelize(data) {
    return _run(data, options);
  };
};

function _run(data, options) {
  var settings = extend({}, options);
  settings.filename = result(settings.filename, data) || data.path;

  return {
    source: babelCore.transform(data.source, settings).code
  };
}

module.exports = babelize;
