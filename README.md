### Install

```
  npm install promise-all-map
```

#### It acts as Promise.all + map

```js
const promises = [
  fetchPost(1),
  fetchPost(2),
  fetchPost(3),
];

const titles = await all(promises, (post) => post.title);

titles // ['post title 1', 'post title 2', 'post title 3']
```

#### You can pass an async mapper too:

```js
const titles = await all([1,2,3], async (id) => {
  const posts = await fetchPost(id)
  return posts.title;
});

titles // ['post title 1', 'post title 2', 'post title 3']
```

#### It can also resolve an object:
    
```js
const promises = {
  one: fetchPost(1),
  two: fetchPost(2),
  three: fetchPost(3),
};

const titles = await all(promises, (post) => post.title);

titles // { one: 'post title 1', two: 'post title 2', three: 'post title 3' }


