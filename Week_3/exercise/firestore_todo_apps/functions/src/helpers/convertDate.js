/**
 * Convert Date As TimeStamp To Compare
 * @param {value: string} value
 * @return {string}
 */
function convertToTimestamp(value) {
  const timestampDate = new Date(Date.parse(value));
  return timestampDate;
}
function convertTimestampToDate({ _seconds, _nanoseconds }) {
  const date = new Date(_seconds * 1000 + _nanoseconds / 1000000).toISOString();
  return date;
}
module.exports = {
  convertToTimestamp,
  convertTimestampToDate,
};
