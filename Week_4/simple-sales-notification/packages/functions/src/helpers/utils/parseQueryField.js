export function parseQueryField(queryString) {
  const [field, direction] = queryString.split(':');
  return [field, direction];
}
