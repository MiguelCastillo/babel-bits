/**
 * bable bit imports transform, which includes ONLY babel core.
 */
(function() {
  'use strict';

  var _babel = require('babel-core');

  module.exports = function _babelTransform(moduleMeta) {
    moduleMeta.source = _babel.transform(moduleMeta.source, this.options).code;
  };
})();
