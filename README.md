# primise-all-map

A tiny helper that makes Promise.all a bit more powerful by:
- Accepting a mapper function as a second argument
- Resolving object of promises too

### Install

```
  npm install promise-all-map
```

### Usage

```js
  import all from 'promise-all-map';
```

#### Works as Promise.all + map
`all(promises, [mapper])`

```js
const promises = [
  fetchPost(1),
  fetchPost(2),
  fetchPost(3),
];

const titles = await all(promises, (post) => post.title);

titles // ['post title 1', 'post title 2', 'post title 3']
```

#### An array with async mapper:
`all(array, [mapper])`

```js
const titles = await all([1,2,3], async (id) => {
  const posts = await fetchPost(id)
  return posts.title;
});

titles // ['post title 1', 'post title 2', 'post title 3']
```

#### Resolving an object of promises:
`all(object, [mapper])`

```js
const titles = await all({
  one: fetchPost(1),
  two: fetchPost(2),
  three: fetchPost(3),
});

titles // { one: 'post title 1', two: 'post title 2', three: 'post title 3' }


