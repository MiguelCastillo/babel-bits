var babel = require('babel-standalone');
var result = require('belty/src/result');
var extend = require('belty/src/extend');

var defaults = {
  presets: ['es2015', 'react']
};

function babelize(data, config) {
  return run(data, config.options);
}

babelize.config = function(config) {
  return function babelize(data) {
    return run(data, config.options);
  };
};

function run(data, options) {
  var settings = extend({}, defaults, options);
  settings.filename = result(settings, 'filename', data) || data.path;

  return {
    source: babel.transform(data.source, settings).code
  };
}

module.exports = babelize;
