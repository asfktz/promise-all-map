### Install
```
npm i map-all
```



### Promise.all + all
```js
const urls = [
  'api/posts/1',
  'api/posts/1/comments'
]

// before
const posts = await Promise.all(urls.map(async (url) => {
  const res = await fetch(url);
  return res.json();
}))

// after
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




### Simplified implementation
```js
const identity = (value) => value

const all = (iterable = [], mapper = identity) => {
  return Promise.all(iterable.map(mapper))
}
```
