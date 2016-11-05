'use strict';

const nock = require('nock');
const nockBack = nock.back;

module.exports = setupNock;

function setupNock(name, options = {}) {
  nockBack.fixtures = options.dirname;

  const fixtureName = name.replace(/[\W\-]+/g, '-') + '.json';
  const opts = Object.assign(
    {},
    {
      // https://github.com/node-nock/nock/issues/484#issuecomment-191822034
      after: () => nock.enableNetConnect(/(127.0.0.1|localhost)/),
      afterRecord: outputs => outputs.filter(o => !o.scope.match(/(127.0.0.1|localhost)/))
    },
    options
  );

  let nockDone = null;

  nockBack.setMode('record');
  nockBack(fixtureName, opts, callback => nockDone = callback);

  return () => nockDone();
}
