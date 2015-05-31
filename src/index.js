/**
 * babel bits module to convert ESnext feature to ES5 equivalents
 */
var babelCore = require('babel-core');
var extend = require('xtend');

function babelize(data) {
  _run(data, this.options);
}

babelize.config = function(options) {
  return function babelize(data) {
    _run(data, options);
  };
};

function _run(data, options) {
  options = options || {};
  var settings = extend({}, options);
  settings.filename = (options.filename && options.filename(data)) || data.path;
  data.source = babelCore.transform(data.source, settings).code;
}

module.exports = babelize;
