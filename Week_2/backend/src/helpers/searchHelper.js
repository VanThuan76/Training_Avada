/**
 * Searhc By Name
 * @param {any[]} data
 * @param {string} value
 * @return {string[]}
 */ function searchByName(data, value) {
  return data.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
}
module.exports = {
  searchByName,
};
