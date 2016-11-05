import test from 'ava';
import nockHook from '../ava';

import got from 'got';

test.beforeEach(t => {
  t.context.closeNock = nockHook(t, __filename, { dirname: __dirname + '/fixtures/ava.helper' });
});

test.afterEach.always(t => {
  t.context.closeNock();
});

test('fetch ya.ru', async t => {
  const startTime = Date.now();
  const res = await got('https://ya.ru/');

  t.truthy(res.body.toLowerCase().indexOf('<!doctype html>') === 0);
  t.truthy((Date.now() - startTime) < 100);
});
