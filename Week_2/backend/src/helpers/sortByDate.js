const { convertToTimestamp } = require("./convertDate.js");

/**
 * Sort By Date
 * @param {{data, orderBy}} args
 * @return {string[]}
 */
function sortByDate(args) {
  const dataSort =
    args.orderBy === "asc" && args.data
      ? args.data.sort(
          (a, b) =>
            convertToTimestamp(a.createdAt) - convertToTimestamp(b.createdAt)
        )
      : args.data.sort(
          (a, b) =>
            convertToTimestamp(b.createdAt) - convertToTimestamp(a.createdAt)
        );
  return dataSort;
}

module.exports = {
  sortByDate,
};
