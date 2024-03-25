const { convertToTimestamp } = require("./dateHelper");

/**
 * Sort By Date
 * @param {any[]} data
 * @param {string} value
 * @return {string[]}
 */
function sortByDate(data, value) {
  return value === "asc"
    ? data.sort(
        (a, b) =>
          convertToTimestamp(a.updated_at) - convertToTimestamp(b.updated_at)
      )
    : data.sort(
        (a, b) =>
          convertToTimestamp(b.updated_at) - convertToTimestamp(a.updated_at)
      );
}
module.exports = {
  sortByDate,
};
