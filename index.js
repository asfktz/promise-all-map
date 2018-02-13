
function defaults (value, defaultValue) {
  return value === undefined ? defaultValue : value;
}

function identity (value) { return value; }

function all(iterable, mapper) {
  iterable = defaults(iterable, []);
  mapper = defaults(mapper, identity);
  return Promise.all(iterable.map(mapper));
}

module.exports = all;