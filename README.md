### Exmaple
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




### Simplified implantation
```js
const identity = (value) => value

const all = (iterable = [], mapper = identity) => {
  return Promise.all(iterable.map(mapper))
}
```
