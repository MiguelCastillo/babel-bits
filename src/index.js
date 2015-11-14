var babelCore = require('babel-core');
var extend = require('xtend');

function result(value, data) {
  return typeof value === 'function' ? value(data) : value;
}

function babelize(data, config) {
  return run(data, config.options);
}

babelize.config = function(config) {
  return function babelize(data) {
    return run(data, config.options);
  };
};

function run(data, options) {
  var settings = extend({}, options);
  settings.filename = result(settings.filename, data) || data.path;

  return {
    source: babelCore.transform(data.source, settings).code
  };
}

module.exports = babelize;
