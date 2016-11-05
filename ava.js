'use strict';

const nockHook = require('./');

module.exports = function hook(t, filename, options) {
  const name = t._test.title
    .replace(/^beforeEach for /, '');

  return nockHook(name, options);
};
