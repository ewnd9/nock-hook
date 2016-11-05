import test from 'ava';
import nockHook from '../';

import got from 'got';

test('test', async t => {
  const startTime = Date.now();
  const closeHook = nockHook('fetch-ya-ru', { dirname: __dirname + '/fixtures/ava.default' });

  const res = await got('https://ya.ru/');

  t.truthy(res.body.toLowerCase().indexOf('<!doctype html>') === 0);
  t.truthy((Date.now() - startTime) < 100);

  closeHook();
});
