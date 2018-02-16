### Install

```
  npm i map-all
```

#### It act as an Promise.all + map

```js
const promises = [
  getPostById(1),
  getPostById(2),
  getPostById(3),
];

const titles = await all(promises, (post) => post.title);

titles // ['post title 1', 'post title 2', 'post title 3']
```

#### You can pass an async mapper too:

```js
const titles = await all([1,2,3], async (id) => {
  const posts = await getPostById(id)
  return posts.title;
});

titles // ['post title 1', 'post title 2', 'post title 3']
```

#### It can also resolve an object:
    
```js
const promises = {
  one: getPostById(1),
  two: getPostById(2),
  three: getPostById(3),
};

const titles = await all(promises, (post) => post.title);

titles // { one: 'post title 1', two: 'post title 2', three: 'post title 3' }


