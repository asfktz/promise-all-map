function defaults(value, defaultValue) {
  return value === undefined ? defaultValue : value;
}

function identity(value) {
  return value;
}

function map(iterable, mapper) {
  if (Array.isArray(iterable)) {
    return iterable.map(mapper);
  }

  return Object.keys(iterable).reduce(function(obj, key, arr) {
    obj[key] = mapper(iterable[key], key, arr);
    return obj;
  }, {});
}

function resolve(iterable) {
  if (Array.isArray(iterable)) {
    return Promise.all(iterable);
  }

  var keys = Object.keys(iterable);
  var values = Object.values(iterable);

  return Promise.all(values).then(function(resolvedVals) {
    return resolvedVals.reduce(function(obj, val, i) {
      obj[keys[i]] = val;
      return obj;
    }, {});
  });
}

function all(iterable, mapper) {
  iterable = defaults(iterable, []);
  mapper = defaults(mapper, identity);

  return resolve(iterable).then(function(iterable) {
    return resolve(map(iterable, mapper));
  });
}

module.exports = all;
