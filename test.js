const test = require('tape');
const all = require('./index.js');

function getPostById (id) {
  return Promise.resolve({ title: 'post title ' + id });
}

test('should resolve an object of promises', async (t) => {
  try {
    const results = await all({
      one: Promise.resolve('one!'),
      two: Promise.resolve('two!'),
    })

    results // { one: 'one!', two: 'two!' }

    t.deepEqual(results, { one: 'one!', two: 'two!' });
    t.end();
  } catch (err) {
    console.error(err)
  }
});

test('Should act as an Promise.all + map', async (t) => {
  try {
    const promises = [
      getPostById(1),
      getPostById(2),
      getPostById(3),
    ];

    const titles = await all(promises, (post) => post.title);

    t.deepEqual(titles, ['post title 1', 'post title 2', 'post title 3']);
    t.end();
  } catch (err) {
    console.error(err);
  }
})

test('should map an array to promises', async (t) => {
  try {
    const titles = await all([1,2,3], async (id) => {
      const posts = await getPostById(id)
      return posts.title;
    });

    t.deepEqual(titles, ['post title 1', 'post title 2', 'post title 3']);
    t.end();  
  } catch (err) {
    console.error(err);
  }
})

test('should resolve an object of promises', async (t) => {
  try {
    const promises = {
      one: getPostById(1),
      two: getPostById(2),
      three: getPostById(3),
    };

    const titles = await all(promises, (post) => post.title);

    t.deepEqual(titles, {
      one: 'post title 1',
      two: 'post title 2',
      three: 'post title 3',
    });

    t.end();
  } catch (err) {
    console.error(err);
  }
});


test('Should behave exactly like Promise.all', async (t) => {
  try {
    const promises = [
      getPostById(1),
      getPostById(2),
      getPostById(3),
    ];

    const posts = await all(promises);
    const titles = posts.map((post) => post.title);

    t.deepEqual(titles, ['post title 1', 'post title 2', 'post title 3']);
    t.end();
  } catch (err) {
    console.error(err);
  }
})