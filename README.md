### Install
```
npm i map-all
```



### Promise.all + map
Before

```js
const urls = [
  'api/posts/1',
  'api/posts/1/comments'
]

const posts = await Promise.all(urls.map(async (url) => {
  const res = await fetch(url);
  return res.json();
}))
```

After
```js

const urls = [
  'api/posts/1',
  'api/posts/1/comments'
]

const posts = await all(urls, async (url) => {
  const res = await fetch(url);
  return res.json();
})
```

### can also resolve an object of promises

```js
const results = await all({
  one: Promise.resolve('one!'),
  two: Promise.resolve('two!'),
})

results // { one: 'one!', two: 'two!' }
```

