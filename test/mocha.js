'use strict';

const assert = require('assert');
const nockHook = require('../');

const got = require('got');

describe('nock-hook', function() {

  it('fetch ya.ru', function() {
    const closeNock = nockHook('fetch-ya.ru', { dirname: __dirname + '/fixtures/mocha' });
    const startTime = Date.now();

    return got('https://ya.ru/')
      .then(res => {
        assert(res.body.toLowerCase().indexOf('<!doctype html>') === 0, 'body starts by doctype');
        assert((Date.now() - startTime) < 100, 'less than 100 ms');

        closeNock();
      })
      .catch(err => {
        closeNock();
        return Promise.reject(err);
      });
  });

});
