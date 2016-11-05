# nock-hook

[![Build Status](https://travis-ci.org/ewnd9/nock-hook.svg?branch=master)](https://travis-ci.org/ewnd9/nock-hook)

Convinient wrapper around [Nock](https://github.com/node-nock/nock) for HTTP testing

## Install

```
$ npm install nock-hook --save-dev
```

## Examples

### `mocha`

```js
const assert = require('assert');
const nockHook = require('nock-helper');

const got = require('got');

describe('nock-hook', function() {

  it('fetch ya.ru', function() {
    const closeNock = nockHook('fetch-ya.ru', { dirname: __dirname + '/fixtures/mocha' });
    const startTime = Date.now();

    return got('https://ya.ru/')
      .then(res => {
        assert(res.body.toLowerCase().indexOf('<!doctype html>') === 0, 'body starts by doctype');
        assert((Date.now() - startTime) < 20, 'less than 50 ms');

        closeNock();
      })
      .catch(err => {
        closeNock();
        return Promise.reject(err);
      });
  });

});
```

### `ava`

- All tests should be serial

```js
import test from 'ava';
import nockHook from 'nock-helper';

import got from 'got';

test.serial('test', async t => {
  const startTime = Date.now();
  const closeHook = nockHook('fetch-ya-ru', { dirname: __dirname + '/fixtures/ava.default' });

  const res = await got('https://ya.ru/');

  t.truthy(res.body.toLowerCase().indexOf('<!doctype html>') === 0);
  t.truthy((Date.now() - startTime) < 50);

  closeHook();
});
```

### `ava` with helper

- All tests should be serial
- Automatically setup function name

```js
import test from 'ava';
import nockHook from 'nock-helper/ava';

import got from 'got';

test.beforeEach(t => {
  t.context.closeNock = nockHook(t, __filename, { dirname: __dirname + '/fixtures/ava.helper' });
});

test.afterEach.always(t => {
  t.context.closeNock();
});

test.serial('fetch ya.ru', async t => {
  const startTime = Date.now();
  const res = await got('https://ya.ru/');

  t.truthy(res.body.toLowerCase().indexOf('<!doctype html>') === 0);
  t.truthy((Date.now() - startTime) < 50);
});
```

## License

MIT © [ewnd9](http://ewnd9.com)
