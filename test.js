const test = require('tape');
const all = require('./index.js');

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('should wait for all', async (t) => {
  const results = await all(['one','two'], async (val) => {
    await wait(100);
    return val + '!';
  })

  t.deepEqual(results, ['one!', 'two!']);
  t.end();
});

test('should behave like Promise.all, without mapper', async (t) => {
  const results = await all([
    Promise.resolve('one!'),
    wait(100).then(() => 'two!')
  ]);

  t.deepEqual(results, ['one!', 'two!']);
  t.end();
});

test('should resolve an object of promises', async (t) => {
  try {
    const results = await all({
      one: Promise.resolve('one!'),
      two: Promise.resolve('two!'),
    })

    t.deepEqual(results, { one: 'one!', two: 'two!' });
    t.end();

  } catch (err) {
    console.log('xx')
    console.error(err)
  }
});