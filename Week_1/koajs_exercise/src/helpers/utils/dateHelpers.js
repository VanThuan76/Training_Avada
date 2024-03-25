/**
 * Convert Date As TimeStamp To Compare
 * @param {value: string} value
 * @return {string}
 */
function convertToTimestamp(value) {
  const timestampDate = new Date(Date.parse(value));
  return timestampDate;
}
/**
 * Sort By Date
 * @param {{data, orderBy}} args
 * @return {string[]}
 */
function sortByDate(args) {
  return args.orderBy === "asc" && args.data
    ? args.data.sort(
        (a, b) =>
          convertToTimestamp(a.createdAt) - convertToTimestamp(b.createdAt)
      )
    : args.data.sort(
        (a, b) =>
          convertToTimestamp(b.createdAt) - convertToTimestamp(a.createdAt)
      );
}

module.exports = {
  sortByDate,
  convertToTimestamp,
};
