/**
 * 6to5 bit loader transform, which includes ONLY 6to5 core.
 */
(function() {
  'use strict';

  var _6to5 = require('6to5-core');

  module.exports = function _6to5Transform(moduleMeta) {
    moduleMeta.source = _6to5.transform(moduleMeta.source, this.options).code;
  };
})();
